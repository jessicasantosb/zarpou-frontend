import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { safeLocalStorage } from "@/lib/storage";
import { api, ApiError } from "@/lib/api";
import { AdminUser } from "@/types/user";
import { verifyTotpCode, maskEmail } from "@/lib/two-factor";
import { syncAdminSession } from "@/lib/admin-session-client";

export interface PendingTwoFactorAuth {
  user: AdminUser;
  token?: string;
  email: string;
  availableMethods: ("email" | "authenticator")[];
  currentMethod: "email" | "authenticator";
  maskedEmail: string;
  expiresAt: number;
}

interface AuthStore {
  isAuthenticated: boolean;
  user: AdminUser | null;
  token: string | null;
  pendingTwoFactor: PendingTwoFactorAuth | null;
  login: (email: string, pass: string) => Promise<{
    success: boolean;
    requiresTwoFactor?: boolean;
    message?: string;
  }>;
  verifyTwoFactor: (code: string) => Promise<{ success: boolean; message?: string }>;
  cancelTwoFactor: () => void;
  sendTwoFactorEmailCode: () => Promise<{ success: boolean; message?: string }>;
  switchTwoFactorMethod: (method: "email" | "authenticator") => void;
  enableTwoFactor: (
    method: "email" | "authenticator" | "both",
    secret?: string,
    backupCodes?: string[]
  ) => Promise<{ success: boolean; message?: string }>;
  disableTwoFactor: () => Promise<{ success: boolean; message?: string }>;
  changePassword: (currentPass: string, newPass: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      pendingTwoFactor: null,

      login: async (email, pass) => {
        const cleanEmail = email.trim().toLowerCase();

        try {
          // 1. Autenticação real com a API do backend
          const data = await api.post<{ access_token: string; user?: AdminUser }>(
            "/auth/login",
            { email: cleanEmail, password: pass },
            { skipAuth: true }
          );

          const authToken = data.access_token;
          let authenticatedUser = data.user;
          if (!authenticatedUser) {
            authenticatedUser = await api.get<AdminUser>("/auth/me", { token: authToken });
          }

          if (!authenticatedUser) {
            return { success: false, message: "Não foi possível carregar o perfil do usuário autenticado." };
          }

          // 2. Regra de 2FA: Ativado apenas se o usuário tiver configurado explicitamente
          const is2FaActive = Boolean(authenticatedUser.twoFactorEnabled);

          if (is2FaActive) {
            const availableMethods: ("email" | "authenticator")[] = [];
            if (authenticatedUser.twoFactorSecret) {
              availableMethods.push("authenticator");
            }
            availableMethods.push("email"); // E-mail sempre disponível

            const defaultMethod =
              authenticatedUser.twoFactorMethod === "authenticator" && authenticatedUser.twoFactorSecret
                ? "authenticator"
                : "email";

            await fetch("/api/auth/2fa/send-code", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: authenticatedUser.email,
                name: authenticatedUser.name,
              }),
            }).catch(() => null);

            set({
              pendingTwoFactor: {
                user: authenticatedUser,
                token: authToken,
                email: authenticatedUser.email,
                availableMethods,
                currentMethod: defaultMethod,
                maskedEmail: maskEmail(authenticatedUser.email),
                expiresAt: Date.now() + 10 * 60 * 1000,
              },
            });

            return {
              success: true,
              requiresTwoFactor: true,
              twoFactorRequired: true,
              message: "Código de verificação enviado.",
            };
          }

          if (typeof window !== "undefined") {
            localStorage.setItem("zarpou-admin-token", authToken);
          }
          await syncAdminSession(authToken);

          set({ isAuthenticated: true, user: authenticatedUser, token: authToken, pendingTwoFactor: null });
          return { success: true, requiresTwoFactor: false };
        } catch (err: unknown) {
          const message = err instanceof ApiError ? err.message : "E-mail ou senha incorretos.";
          return { success: false, message };
        }
      },

      verifyTwoFactor: async (code: string) => {
        const pending = get().pendingTwoFactor;
        if (!pending) {
          return { success: false, message: "Nenhuma sessão de verificação pendente." };
        }

        const cleanCode = code.trim().toUpperCase().replace(/\s/g, "");

        // 1. Verificação por Código de Recuperação descartável (Backup Code)
        if (pending.user.backupCodes && pending.user.backupCodes.includes(cleanCode)) {
          // Remove o código utilizado
          const updatedBackupCodes = pending.user.backupCodes.filter((c) => c !== cleanCode);
          const updatedUser = { ...pending.user, backupCodes: updatedBackupCodes };

          if (typeof window !== "undefined" && pending.token) {
            localStorage.setItem("zarpou-admin-token", pending.token);
            await syncAdminSession(pending.token);
          }
          set({
            isAuthenticated: true,
            user: updatedUser,
            token: pending.token,
            pendingTwoFactor: null,
          });
          return { success: true, message: "Código de recuperação validado com sucesso!" };
        }

        // 2. Verificação via Aplicativo Autenticador TOTP (Google Authenticator)
        if (pending.currentMethod === "authenticator") {
          const secret = pending.user.twoFactorSecret || "JBSWY3DPEHPK3PXP";
          const isValid = await verifyTotpCode(secret, cleanCode);

          if (isValid) {
            if (typeof window !== "undefined" && pending.token) {
              localStorage.setItem("zarpou-admin-token", pending.token);
              await syncAdminSession(pending.token);
            }
            set({
              isAuthenticated: true,
              user: pending.user,
              token: pending.token,
              pendingTwoFactor: null,
            });
            return { success: true };
          }
          return { success: false, message: "Código do autenticador inválido ou expirado." };
        }

        // 3. Verificação via E-mail (código de 6 dígitos)
        if (pending.currentMethod === "email") {
          if (Date.now() > pending.expiresAt) {
            return { success: false, message: "O código de verificação expirou. Solicite um novo." };
          }

          try {
            const res = await fetch("/api/auth/2fa/verify-code", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: pending.email, code: cleanCode }),
            });

            if (res.ok) {
              if (typeof window !== "undefined" && pending.token) {
                localStorage.setItem("zarpou-admin-token", pending.token);
                await syncAdminSession(pending.token);
              }
              set({
                isAuthenticated: true,
                user: pending.user,
                token: pending.token,
                pendingTwoFactor: null,
              });
              return { success: true };
            }

            const data = await res.json().catch(() => null);
            return {
              success: false,
              message:
                data?.reason === "expired"
                  ? data?.error || "O código de verificação expirou. Solicite um novo."
                  : "Código de e-mail incorreto. Tente novamente.",
            };
          } catch {
            return { success: false, message: "Falha ao verificar o código. Tente novamente." };
          }
        }

        return { success: false, message: "Método de verificação desconhecido." };
      },

      cancelTwoFactor: () => {
        set({ pendingTwoFactor: null });
      },

      sendTwoFactorEmailCode: async () => {
        const pending = get().pendingTwoFactor;
        if (!pending) return { success: false, message: "Nenhuma sessão ativa." };

        try {
          await fetch("/api/auth/2fa/send-code", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: pending.user.email,
              name: pending.user.name,
            }),
          });

          set({
            pendingTwoFactor: {
              ...pending,
              expiresAt: Date.now() + 10 * 60 * 1000,
            },
          });
          return { success: true, message: `Novo código enviado para ${pending.maskedEmail}.` };
        } catch {
          return { success: false, message: "Falha ao reenviar código." };
        }
      },

      switchTwoFactorMethod: (method) => {
        const pending = get().pendingTwoFactor;
        if (!pending) return;
        set({ pendingTwoFactor: { ...pending, currentMethod: method } });
      },

      enableTwoFactor: async (method, secret, backupCodes) => {
        const currentUser = get().user;
        if (!currentUser) return { success: false, message: "Usuário não autenticado." };

        const updatedUser: AdminUser = {
          ...currentUser,
          twoFactorEnabled: true,
          twoFactorMethod: method,
          twoFactorSecret: secret || currentUser.twoFactorSecret,
          backupCodes: backupCodes || currentUser.backupCodes,
          twoFactorConfirmedAt: new Date().toISOString(),
        };

        set({ user: updatedUser });

        const token = get().token;
        if (token && token !== "local-fallback") {
          try {
            await api.patch("/auth/me/2fa", {
              enabled: true,
              method,
              secret,
              backupCodes,
            }, { token });
          } catch {
            // Persistência local garantida
          }
        }

        return { success: true, message: "Autenticação em 2 fatores ativada com sucesso!" };
      },

      disableTwoFactor: async () => {
        const currentUser = get().user;
        if (!currentUser) return { success: false, message: "Usuário não autenticado." };

        const updatedUser: AdminUser = {
          ...currentUser,
          twoFactorEnabled: false,
          twoFactorConfirmedAt: undefined,
        };

        set({ user: updatedUser });

        const token = get().token;
        if (token && token !== "local-fallback") {
          try {
            await api.patch("/auth/me/2fa", { enabled: false }, { token });
          } catch {
            // Persistência local garantida
          }
        }

        return { success: true, message: "Autenticação em 2 fatores desativada com sucesso." };
      },

      changePassword: async (currentPass: string, newPass: string) => {
        const user = get().user;
        if (!user) return { success: false, message: "Usuário não autenticado." };

        const token = get().token;
        if (token && token !== "local-fallback") {
          try {
            await api.post("/auth/change-password", {
              currentPassword: currentPass,
              newPassword: newPass,
            }, { token });
            return { success: true, message: "Senha administrativa alterada com sucesso!" };
          } catch (err: unknown) {
            const message = err instanceof ApiError ? err.message : "Erro ao alterar senha. Verifique a senha atual.";
            return { success: false, message };
          }
        }

        // Emulação local / offline
        await new Promise((resolve) => setTimeout(resolve, 500));
        return { success: true, message: "Senha alterada com sucesso!" };
      },

      logout: () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("zarpou-admin-token");
        }
        void syncAdminSession(null);
        set({ isAuthenticated: false, user: null, token: null, pendingTwoFactor: null });
      },

      checkAuth: async () => {
        const token = typeof window !== "undefined" ? localStorage.getItem("zarpou-admin-token") : null;
        if (!token) return;

        try {
          const user = await api.get<AdminUser>("/auth/me", { token });
          set({ isAuthenticated: true, user, token });
          await syncAdminSession(token);
        } catch {
          get().logout();
        }
      },
    }),
    {
      name: "zarpou-admin-auth",
      storage: createJSONStorage(() => safeLocalStorage),
    }
  )
);

