import {
  CheckCircle2,
  Key,
  Mail,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { CustomerUser } from "@/types/user";

interface TwoFactorCardProps {
  customerUser?: CustomerUser | null;
  onStartSetup: () => void;
  onDisable: () => void;
  onShowBackupCodes: () => void;
}

export function TwoFactorCard({
  customerUser,
  onStartSetup,
  onDisable,
  onShowBackupCodes,
}: TwoFactorCardProps) {
  return (
    <div className="bg-card rounded-3xl p-6 md:p-8 border border-border  space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-2xl bg-secondary/15 text-primary font-bold flex items-center justify-center shrink-0">
            <ShieldCheck className="size-5 text-secondary" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="font-bold text-foreground text-base">
                Autenticação em Duas Etapas (2FA)
              </h3>
              <span
                className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold tracking-wide ${
                  customerUser?.twoFactorEnabled
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                    : "bg-muted text-foreground/70 border border-border"
                }`}
              >
                {customerUser?.twoFactorEnabled ? "Ativado" : "Desativado"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Adicione uma camada extra de proteção ao acessar seus vouchers e
              viagens
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {customerUser?.twoFactorEnabled ? (
            <>
              {customerUser.backupCodes &&
                customerUser.backupCodes.length > 0 && (
                  <button
                    type="button"
                    onClick={onShowBackupCodes}
                    className="px-3.5 py-2 text-xs font-bold text-foreground/80 bg-muted hover:bg-muted rounded-xl transition cursor-pointer flex items-center gap-1.5"
                  >
                    <Key className="size-3.5 text-secondary" />
                    <span>Ver Códigos Reserva</span>
                  </button>
                )}
              <button
                type="button"
                onClick={onDisable}
                className="px-4 py-2 text-xs font-bold text-destructive hover:bg-destructive/20 border border-destructive/20 rounded-xl transition cursor-pointer"
              >
                Desativar 2FA
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onStartSetup}
              className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white font-bold text-xs rounded-xl flex items-center gap-2  transition cursor-pointer"
            >
              <ShieldCheck className="size-4 text-secondary" />
              <span>Ativar Proteção 2FA</span>
            </button>
          )}
        </div>
      </div>

      {customerUser?.twoFactorEnabled ? (
        <div className="p-4 bg-emerald-50/60 border border-emerald-200/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="size-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">
                Sua conta está protegida por verificação em duas etapas
              </p>
              <p className="text-[11px] text-muted-foreground">
                Método principal:{" "}
                <strong className="text-foreground/80">
                  {customerUser.twoFactorMethod === "authenticator"
                    ? "Aplicativo Autenticador (Google Authenticator)"
                    : "Código de 6 dígitos enviado por E-mail"}
                </strong>
              </p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 bg-card px-3 py-1 rounded-lg border border-emerald-200  self-start sm:self-auto">
            Segurança Máxima Ativa
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted/50 rounded-2xl border border-border/80 space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-xs">
              <Mail className="size-4 text-secondary" />
              <span>Código de 6 dígitos por E-mail</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Toda vez que você entrar, enviamos um código de segurança
              instantâneo para o seu e-mail cadastrado.
            </p>
          </div>

          <div className="p-4 bg-muted/50 rounded-2xl border border-border/80 space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-xs">
              <Smartphone className="size-4 text-secondary" />
              <span>Google Authenticator / Authy</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Gere códigos de autenticação temporários offline diretamente pelo
              seu aplicativo favorito no celular.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
