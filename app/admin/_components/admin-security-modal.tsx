import { Key, ShieldCheck, X } from "lucide-react";
import type { AdminSecurity } from "../_hooks/use-admin-security";
import { AdminPasswordForm } from "./admin-password-form";
import { AdminTwoFactorTab } from "./admin-two-factor-tab";

interface AdminSecurityModalProps {
  security: AdminSecurity;
}

export function AdminSecurityModal({ security }: AdminSecurityModalProps) {
  const { securityTab, setSecurityTab, handleCloseModal } = security;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-card rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-xl border border-border/60 relative animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-secondary/15 rounded-xl text-secondary">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-base">Segurança da Conta</h3>
              <p className="text-xs text-muted-foreground">Credenciais e autenticação em duas etapas</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleCloseModal}
            className="text-muted-foreground hover:text-foreground/70 p-1 rounded-lg transition"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex bg-muted p-1 rounded-xl text-xs font-bold text-foreground/70 my-4">
          <button
            type="button"
            onClick={() => setSecurityTab("password")}
            className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
              securityTab === "password" ? "bg-card text-primary shadow-xs" : "hover:text-foreground"
            }`}
          >
            <Key className="size-3.5" />
            <span>Alterar Senha</span>
          </button>
          <button
            type="button"
            onClick={() => setSecurityTab("2fa")}
            className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
              securityTab === "2fa" ? "bg-card text-primary shadow-xs" : "hover:text-foreground"
            }`}
          >
            <ShieldCheck className="size-3.5 text-secondary" />
            <span>Autenticação 2FA</span>
          </button>
        </div>

        {securityTab === "password" ? (
          <AdminPasswordForm security={security} />
        ) : (
          <AdminTwoFactorTab security={security} />
        )}
      </div>
    </div>
  );
}
