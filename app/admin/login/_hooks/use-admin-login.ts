"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  adminLoginSchema,
  type AdminLoginValues,
} from "@/schemas/admin-login";
import { useAuthStore } from "@/stores/auth-store";
import { syncAdminSession } from "@/lib/admin-session-client";

const resolveDashboardTarget = (): string => {
  const loggedUser = useAuthStore.getState().user;
  const screens = loggedUser?.allowedScreens || loggedUser?.allowed_screens;
  const isGeneral = (loggedUser?.role || "").toLowerCase() === "admin";

  if (!isGeneral && Array.isArray(screens) && screens.length > 0) {
    return `/admin/${screens[0]}`;
  }
  return "/admin/dashboard";
};

export function useAdminLogin() {
  const router = useRouter();
  const {
    login,
    pendingTwoFactor,
    verifyTwoFactor,
    cancelTwoFactor,
    sendTwoFactorEmailCode,
    switchTwoFactorMethod,
    isAuthenticated,
    token,
    logout,
  } = useAuthStore();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !token) return;

    let active = true;
    syncAdminSession(token).then((success) => {
      if (!active) return;
      if (success) {
        router.replace(resolveDashboardTarget());
      } else {
        // Sessão persistida é inválida/expirada no backend: limpa o estado
        // local (token + cookie) para permitir um novo login, em vez de
        // deixar o usuário preso com 401 repetido em /api/auth/session.
        logout();
      }
    });

    return () => {
      active = false;
    };
  }, [isAuthenticated, token, router, logout]);

  const form = useForm<AdminLoginValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setError("");
    setLoading(true);

    try {
      const result = await login(values.email, values.password);

      if (result.success) {
        if (!result.requiresTwoFactor) {
          router.push(resolveDashboardTarget());
          return;
        }
        setLoading(false);
      } else {
        setLoading(false);
        setError(result.message || "Credenciais inválidas.");
      }
    } catch {
      setLoading(false);
      setError("Erro ao autenticar. Tente novamente.");
    }
  });

  const handleVerifyTwoFactor = async (code: string) => {
    const res = await verifyTwoFactor(code);

    if (res.success) {
      setIsVerifyingOtp(true);
      router.push(resolveDashboardTarget());
    }

    return res;
  };

  const handleCancelTwoFactor = () => {
    setIsVerifyingOtp(false);
    cancelTwoFactor();
  };

  return {
    form,
    error,
    loading,
    isVerifyingOtp,
    pendingTwoFactor,
    onSubmit,
    onVerifyTwoFactor: handleVerifyTwoFactor,
    onCancelTwoFactor: handleCancelTwoFactor,
    onResendTwoFactorEmailCode: sendTwoFactorEmailCode,
    onSwitchTwoFactorMethod: switchTwoFactorMethod,
  };
}
