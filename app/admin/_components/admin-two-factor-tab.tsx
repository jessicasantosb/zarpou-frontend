import { ShieldCheck, Mail, Smartphone } from "lucide-react";
import type { AdminSecurity } from "../_hooks/use-admin-security";
import { AdminBackupCodes } from "./admin-backup-codes";
import { AdminEmailSetup } from "./admin-email-setup";
import { AdminTotpSetup } from "./admin-totp-setup";

interface AdminTwoFactorTabProps {
  security: AdminSecurity;
}

export function AdminTwoFactorTab({ security }: AdminTwoFactorTabProps) {
  const {
    user,
    admin2FaMethod,
    setAdmin2FaMethod,
    adminBackupCodes,
    copiedAdminBackups,
    isSaving2Fa,
    handleDisableAdmin2Fa,
    handleCopyBackupCodes,
  } = security;

  return (
    <div className="space-y-4">
      {user?.twoFactorEnabled ? (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="size-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold block">Autenticação em 2 Etapas Ativa</span>
              <span className="text-[11px] text-emerald-700">
                {user.twoFactorMethod === "authenticator"
                  ? "Protegido via App Autenticador (TOTP)"
                  : "Protegido via E-mail"}
              </span>
            </div>
          </div>
          <button
            type="button"
            disabled={isSaving2Fa}
            onClick={handleDisableAdmin2Fa}
            className="px-3 py-1.5 bg-card border border-destructive/20 text-destructive hover:bg-destructive/20 text-[11px] font-bold rounded-lg transition shrink-0 cursor-pointer disabled:opacity-50"
          >
            {isSaving2Fa ? "Desativando..." : "Desativar 2FA"}
          </button>
        </div>
      ) : (
        <div className="p-3 bg-muted border border-border text-foreground/80 rounded-xl text-xs flex items-center gap-2.5">
          <ShieldCheck className="size-4 text-muted-foreground shrink-0" />
          <span>
            A autenticação em 2 etapas adiciona uma camada extra de proteção ao seu login.
          </span>
        </div>
      )}

      <div className="space-y-2">
        <label className="text-xs font-bold text-foreground/80 block">
          Escolha o Método de Autenticação
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setAdmin2FaMethod("authenticator")}
            className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition cursor-pointer ${
              admin2FaMethod === "authenticator"
                ? "border-primary bg-primary/5 text-primary "
                : "border-border text-foreground/70 hover:border-input"
            }`}
          >
            <Smartphone className="size-4 shrink-0" />
            <div>
              <span className="font-bold text-xs block">App Autenticador</span>
              <span className="text-[10px] text-muted-foreground">Google Auth, Authy</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setAdmin2FaMethod("email")}
            className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition cursor-pointer ${
              admin2FaMethod === "email"
                ? "border-primary bg-primary/5 text-primary "
                : "border-border text-foreground/70 hover:border-input"
            }`}
          >
            <Mail className="size-4 shrink-0" />
            <div>
              <span className="font-bold text-xs block">Por E-mail</span>
              <span className="text-[10px] text-muted-foreground">Código de 6 dígitos</span>
            </div>
          </button>
        </div>
      </div>

      {admin2FaMethod === "authenticator" && <AdminTotpSetup security={security} />}

      {admin2FaMethod === "email" && <AdminEmailSetup security={security} />}

      <AdminBackupCodes
        codes={adminBackupCodes}
        copied={copiedAdminBackups}
        onCopy={handleCopyBackupCodes}
      />
    </div>
  );
}
