import { Check, Loader2, RefreshCw } from "lucide-react";
import { OtpInput } from "@/components/ui/otp-input";
import type { AdminSecurity } from "../_hooks/use-admin-security";

interface AdminEmailSetupProps {
  security: AdminSecurity;
}

export function AdminEmailSetup({ security }: AdminEmailSetupProps) {
  const {
    user,
    adminEmailSent,
    adminEmailCooldown,
    isSendingEmailCode,
    adminEmailOtpCode,
    setAdminEmailOtpCode,
    isSaving2Fa,
    handleSendAdminEmailCode,
    handleConfirmEmail2Fa,
    handleEnableEmail2Fa,
    formatTimer,
  } = security;

  return (
    <div className="space-y-3.5 bg-muted p-4 rounded-2xl border border-border">
      <div className="space-y-1">
        <span className="text-xs font-bold text-foreground block">
          Autenticação via Código por E-mail
        </span>
        <p className="text-xs text-foreground/70 leading-relaxed">
          Ao utilizar este método, um código numérico de 6 dígitos será enviado para <strong>{user?.email}</strong> a cada tentativa de login no painel.
        </p>
      </div>

      <div className="pt-2 border-t border-border space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-bold text-foreground/80">
            {adminEmailSent ? "Código de verificação enviado" : "Validar recebimento no seu e-mail:"}
          </span>
          <button
            type="button"
            disabled={adminEmailCooldown > 0 || isSendingEmailCode}
            onClick={handleSendAdminEmailCode}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-2xs ${
              adminEmailCooldown > 0
                ? "bg-border text-muted-foreground cursor-not-allowed"
                : "bg-card hover:bg-muted text-primary border border-border cursor-pointer"
            }`}
          >
            <RefreshCw className={`size-3 ${isSendingEmailCode ? "animate-spin" : ""}`} />
            <span>
              {isSendingEmailCode
                ? "Enviando..."
                : adminEmailCooldown > 0
                ? `Reenviar código (${formatTimer(adminEmailCooldown)})`
                : adminEmailSent
                ? "Reenviar código por e-mail"
                : "Enviar código de teste"}
            </span>
          </button>
        </div>

        {adminEmailCooldown > 0 && (
          <p className="text-[10px] text-muted-foreground">
            Aguarde {adminEmailCooldown}s para poder reenviar um novo código para seu e-mail.
          </p>
        )}

        {adminEmailSent && (
          <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
            <OtpInput
              value={adminEmailOtpCode}
              onChange={setAdminEmailOtpCode}
              className="w-full sm:w-40 text-center font-mono text-base tracking-[0.3em] font-bold py-2 px-3 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-card text-foreground placeholder:text-muted-foreground/60"
            />
            <button
              type="button"
              disabled={adminEmailOtpCode.length !== 6 || isSaving2Fa}
              onClick={handleConfirmEmail2Fa}
              className="w-full sm:w-auto px-5 py-2.5 bg-primary hover:bg-primary-hover text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50 transition"
            >
              {isSaving2Fa ? (
                <>
                  <Loader2 className="size-4 animate-spin text-secondary" />
                  <span>Ativando...</span>
                </>
              ) : (
                <>
                  <Check className="size-4 text-secondary" />
                  <span>Confirmar e Ativar 2FA</span>
                </>
              )}
            </button>
          </div>
        )}

        {!adminEmailSent && (
          <div className="flex justify-end pt-1">
            <button
              type="button"
              disabled={isSaving2Fa || (user?.twoFactorEnabled && user?.twoFactorMethod === "email")}
              onClick={handleEnableEmail2Fa}
              className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-50 transition"
            >
              {isSaving2Fa ? (
                <>
                  <Loader2 className="size-4 animate-spin text-secondary" />
                  <span>Salvando...</span>
                </>
              ) : user?.twoFactorEnabled && user?.twoFactorMethod === "email" ? (
                <>
                  <Check className="size-4 text-secondary" />
                  <span>E-mail já Configurado</span>
                </>
              ) : (
                <>
                  <Check className="size-4 text-secondary" />
                  <span>Ativar 2FA por E-mail</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
