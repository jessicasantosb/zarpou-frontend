import Image from "next/image";
import { Check, Copy, Loader2 } from "lucide-react";
import { OtpInput } from "@/components/ui/otp-input";
import type { AdminSecurity } from "../_hooks/use-admin-security";

interface AdminTotpSetupProps {
  security: AdminSecurity;
}

export function AdminTotpSetup({ security }: AdminTotpSetupProps) {
  const {
    adminTotpQrUrl,
    adminTotpSecret,
    adminOtpCode,
    setAdminOtpCode,
    isVerifyingTotp,
    copiedAdminSecret,
    handleGenerateNewSecret,
    handleVerifyAndEnableAuthenticator,
    handleCopySecret,
  } = security;

  return (
    <div className="space-y-3.5 bg-muted p-4 rounded-2xl border border-border">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <span className="size-5 rounded-full bg-primary text-white text-[11px] font-bold inline-flex items-center justify-center">1</span>
            Escaneie o QR Code no seu aplicativo
          </span>
          <button
            type="button"
            onClick={handleGenerateNewSecret}
            className="text-[11px] text-primary hover:underline font-semibold cursor-pointer"
          >
            Gerar novo QR
          </button>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3.5 bg-card p-3 rounded-xl border border-border">
          {adminTotpQrUrl ? (
            <div className="size-28 relative bg-card p-1 rounded-lg border border-border shrink-0">
              <Image src={adminTotpQrUrl} alt="QR 2FA" fill className="object-contain p-1" />
            </div>
          ) : (
            <div className="size-28 flex items-center justify-center bg-muted rounded-lg text-muted-foreground text-xs">
              Gerando QR...
            </div>
          )}
          <div className="space-y-2 text-xs flex-1">
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Abra o <strong>Google Authenticator</strong> ou <strong>Authy</strong>, toque em <strong>+</strong> e escaneie a imagem.
            </p>
            <div>
              <span className="text-[10px] text-muted-foreground block mb-0.5">Ou digite a chave manual:</span>
              <div className="flex items-center gap-1.5">
                <code className="bg-muted px-2 py-1 rounded border border-input font-mono text-[11px] font-bold text-primary select-all break-all">
                  {adminTotpSecret}
                </code>
                <button
                  type="button"
                  onClick={handleCopySecret}
                  className="p-1.5 bg-card border border-border rounded text-foreground/70 hover:bg-muted transition cursor-pointer"
                  title="Copiar chave"
                >
                  {copiedAdminSecret ? <Check className="size-3 text-emerald-600" /> : <Copy className="size-3" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2 pt-2 border-t border-border">
        <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
          <span className="size-5 rounded-full bg-primary text-white text-[11px] font-bold inline-flex items-center justify-center">2</span>
          Digite o código de 6 dígitos gerado pelo app
        </span>
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <OtpInput
            value={adminOtpCode}
            onChange={setAdminOtpCode}
            className="w-full sm:w-44 text-center font-mono text-lg tracking-[0.3em] font-bold py-2 px-3 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-card text-foreground placeholder:text-muted-foreground/60"
          />
          <button
            type="button"
            disabled={adminOtpCode.length !== 6 || isVerifyingTotp}
            onClick={handleVerifyAndEnableAuthenticator}
            className="w-full sm:w-auto px-5 py-2.5 bg-primary hover:bg-primary-hover text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50 transition"
          >
            {isVerifyingTotp ? (
              <>
                <Loader2 className="size-4 animate-spin text-secondary" />
                <span>Validando código...</span>
              </>
            ) : (
              <>
                <Check className="size-4 text-secondary" />
                <span>Confirmar e Ativar 2FA</span>
              </>
            )}
          </button>
        </div>
        <p className="text-[10px] text-muted-foreground">
          Insira os 6 números gerados no seu aplicativo para confirmar o pareamento e ativar a proteção.
        </p>
      </div>
    </div>
  );
}
