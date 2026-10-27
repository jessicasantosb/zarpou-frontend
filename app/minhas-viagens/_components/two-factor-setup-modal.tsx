import type React from "react";
import Image from "next/image";
import {
  Check,
  Copy,
  Loader2,
  Mail,
  QrCode,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  X,
} from "lucide-react";
import { maskEmail } from "@/lib/two-factor";
import { OtpInput } from "@/components/ui/otp-input";

interface TwoFactorSetupModalProps {
  modalStep: 1 | 2 | 3;
  selectedMethod: "email" | "authenticator";
  totpQrUrl: string;
  totpSecret: string;
  verificationCode: string;
  generatedBackupCodes: string[];
  isProcessing2Fa: boolean;
  copiedSecret: boolean;
  copiedBackups: boolean;
  customerEmail?: string;
  onSelectedMethodChange: (method: "email" | "authenticator") => void;
  onVerificationCodeChange: (code: string) => void;
  onAdvance: () => void;
  onSendEmailCode: () => void;
  onBackToStep1: () => void;
  onConfirm: React.FormEventHandler<HTMLFormElement>;
  onFinish: () => void;
  onCopySecret: (secret: string) => void;
  onCopyBackups: (codes: string[]) => void;
  onClose: () => void;
}

export function TwoFactorSetupModal({
  modalStep,
  selectedMethod,
  totpQrUrl,
  totpSecret,
  verificationCode,
  generatedBackupCodes,
  isProcessing2Fa,
  copiedSecret,
  copiedBackups,
  customerEmail,
  onSelectedMethodChange,
  onVerificationCodeChange,
  onAdvance,
  onSendEmailCode,
  onBackToStep1,
  onConfirm,
  onFinish,
  onCopySecret,
  onCopyBackups,
  onClose,
}: TwoFactorSetupModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-card rounded-3xl max-w-lg w-full p-6 sm:p-8  border border-border/60 relative animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-4 border-b border-border/60 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-secondary/15 rounded-xl text-secondary">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-base">
                Configurar 2FA (Etapa {modalStep} de 3)
              </h3>
              <p className="text-xs text-muted-foreground">Zarpou Viagens e Turismo</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground/70 p-1 rounded-lg"
          >
            <X className="size-5" />
          </button>
        </div>

        {modalStep === 1 && (
          <div className="space-y-4">
            <p className="text-xs text-foreground/70">
              Escolha como prefere receber ou gerar seus códigos de segurança
              no login:
            </p>

            <div className="space-y-3">
              <div
                onClick={() => onSelectedMethodChange("email")}
                className={`p-4 rounded-2xl border-2 transition cursor-pointer flex items-center justify-between ${
                  selectedMethod === "email"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-input"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-blue-50 text-primary flex items-center justify-center shrink-0">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-foreground text-xs sm:text-sm">
                        Código por E-mail
                      </h4>
                      <span className="text-[10px] bg-secondary/20 text-secondary-ink px-2 py-0.5 rounded-full font-bold">
                        Mais Prático
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Enviado para {maskEmail(customerEmail || "")}
                    </p>
                  </div>
                </div>
                <div
                  className={`size-5 rounded-full border-2 flex items-center justify-center ${
                    selectedMethod === "email"
                      ? "border-primary bg-primary text-white"
                      : "border-input"
                  }`}
                >
                  {selectedMethod === "email" && <Check className="size-3" />}
                </div>
              </div>

              <div
                onClick={() => onSelectedMethodChange("authenticator")}
                className={`p-4 rounded-2xl border-2 transition cursor-pointer flex items-center justify-between ${
                  selectedMethod === "authenticator"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-input"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                    <Smartphone className="size-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-foreground text-xs sm:text-sm">
                        App Autenticador (TOTP)
                      </h4>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                        Mais Seguro
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Google Authenticator, Microsoft Authenticator ou Authy
                    </p>
                  </div>
                </div>
                <div
                  className={`size-5 rounded-full border-2 flex items-center justify-center ${
                    selectedMethod === "authenticator"
                      ? "border-primary bg-primary text-white"
                      : "border-input"
                  }`}
                >
                  {selectedMethod === "authenticator" && (
                    <Check className="size-3" />
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                disabled={isProcessing2Fa}
                onClick={onAdvance}
                className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer transition disabled:opacity-50"
              >
                {isProcessing2Fa ? (
                  <>
                    <Loader2 className="size-4 animate-spin text-secondary" />
                    <span>Preparando...</span>
                  </>
                ) : (
                  <>
                    <span>Avançar</span>
                    <Check className="size-4 text-secondary" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {modalStep === 2 && (
          <form onSubmit={onConfirm} className="space-y-4">
            {selectedMethod === "authenticator" ? (
              <div className="space-y-4">
                <p className="text-xs text-foreground/70">
                  1. Abra seu aplicativo autenticador e escaneie o QR Code
                  abaixo com a câmera do celular:
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 bg-muted p-4 rounded-2xl border border-border">
                  {totpQrUrl ? (
                    <div className="size-36 relative bg-card p-2 rounded-xl  border border-border/60 shrink-0">
                      <Image
                        src={totpQrUrl}
                        alt="QR Code 2FA"
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                  ) : (
                    <div className="size-36 bg-muted rounded-xl flex items-center justify-center">
                      <QrCode className="size-8 text-muted-foreground" />
                    </div>
                  )}

                  <div className="space-y-2 text-xs">
                    <span className="font-bold text-foreground/80 block">
                      Não consegue escanear?
                    </span>
                    <p className="text-[11px] text-muted-foreground">
                      Insira a chave secreta manualmente no aplicativo:
                    </p>
                    <div className="flex items-center gap-2">
                      <code className="bg-card px-2.5 py-1.5 rounded-lg border border-input font-mono text-[11px] font-bold text-primary select-all">
                        {totpSecret}
                      </code>
                      <button
                        type="button"
                        onClick={() => onCopySecret(totpSecret)}
                        className="p-1.5 bg-card border border-border hover:bg-muted rounded-lg text-foreground/70 transition cursor-pointer"
                        title={copiedSecret ? "Copiado!" : "Copiar Chave"}
                      >
                        {copiedSecret ? (
                          <Check className="size-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="size-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground/80 block">
                    2. Digite o código de 6 dígitos gerado no app para
                    confirmar:
                  </label>
                  <OtpInput
                    required
                    autoFocus
                    value={verificationCode}
                    onChange={onVerificationCodeChange}
                    className="w-full h-11 text-center font-mono text-lg font-black tracking-widest rounded-xl border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-hidden"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-foreground/70">
                  Enviamos um código de verificação para o e-mail:{" "}
                  <strong className="text-foreground">
                    {maskEmail(customerEmail || "")}
                  </strong>
                  .
                </p>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground/80 block text-center">
                    Digite o código de 6 dígitos recebido por e-mail:
                  </label>
                  <OtpInput
                    required
                    autoFocus
                    value={verificationCode}
                    onChange={onVerificationCodeChange}
                    className="w-full h-12 text-center font-mono text-xl font-black tracking-widest rounded-xl border-2 border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-hidden"
                  />
                </div>

                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={onSendEmailCode}
                    className="text-xs font-bold text-primary hover:underline"
                  >
                    Reenviar código por e-mail
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-border/60">
              <button
                type="button"
                onClick={onBackToStep1}
                className="text-xs font-bold text-muted-foreground hover:text-foreground/80"
              >
                ← Voltar
              </button>
              <button
                type="submit"
                disabled={isProcessing2Fa}
                className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer transition disabled:opacity-50"
              >
                {isProcessing2Fa ? (
                  <>
                    <Loader2 className="size-4 animate-spin text-secondary" />
                    <span>Validando...</span>
                  </>
                ) : (
                  <>
                    <span>Verificar Código</span>
                    <Check className="size-4 text-secondary" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {modalStep === 3 && (
          <div className="space-y-5">
            <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl flex items-start gap-2.5 text-xs">
              <ShieldAlert className="size-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">
                  Guarde seus códigos de recuperação
                </strong>
                <span>
                  Caso perca o acesso ao seu e-mail ou app, você poderá usar um
                  desses códigos para entrar. Cada código só pode ser usado uma
                  única vez.
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-muted p-4 rounded-2xl border border-border">
              {generatedBackupCodes.map((code, idx) => (
                <div
                  key={idx}
                  className="bg-card p-2.5 rounded-xl border border-border font-mono text-center text-xs font-extrabold text-foreground "
                >
                  {code}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => onCopyBackups(generatedBackupCodes)}
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="size-3.5" />
                <span>
                  {copiedBackups ? "Copiados!" : "Copiar todos os códigos"}
                </span>
              </button>

              <button
                type="button"
                onClick={onFinish}
                className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer transition "
              >
                <span>Concluir e Fechar</span>
                <Check className="size-4 text-secondary" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
