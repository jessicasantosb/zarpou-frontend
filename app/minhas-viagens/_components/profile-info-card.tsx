import type React from "react";
import { IdCard, Loader2, Mail, Phone, Save, User } from "lucide-react";
import { formatCellphone } from "@/lib/format-cellphone";
import { formatCpf, isValidCPF } from "@/lib/format-cpf";

interface ProfileInfoCardProps {
  name: string;
  phone: string;
  cpf: string;
  customerEmail?: string;
  isSavingProfile: boolean;
  onNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onCpfChange: (value: string) => void;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export function ProfileInfoCard({
  name,
  phone,
  cpf,
  customerEmail,
  isSavingProfile,
  onNameChange,
  onPhoneChange,
  onCpfChange,
  onSubmit,
}: ProfileInfoCardProps) {
  return (
    <div className="bg-card rounded-3xl p-6 sm:p-8 border border-border shadow-xs space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-border/60">
        <div>
          <h3 className="text-lg font-bold text-foreground">
            Informações do Titular
          </h3>
          <p className="text-xs text-muted-foreground">
            Mantenha seus dados atualizados para agilizar a emissão de
            passagens e reservas de hotel.
          </p>
        </div>
        <div className="size-10 rounded-xl bg-muted text-foreground/70 flex items-center justify-center">
          <User className="size-5" />
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground/80 tracking-wide">
              Nome Completo
            </label>
            <div className="relative">
              <User className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-input text-sm font-medium outline-hidden focus:border-primary transition"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground/80 tracking-wide">
              Celular / WhatsApp
            </label>
            <div className="relative">
              <Phone className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                placeholder="(31) 99999-9999"
                value={phone}
                maxLength={15}
                onChange={(e) => onPhoneChange(formatCellphone(e.target.value))}
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-input text-sm font-medium outline-hidden focus:border-primary transition"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground/80 tracking-wide">
              E-mail (Login)
            </label>
            <div className="relative">
              <Mail className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                disabled
                value={customerEmail || ""}
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-muted text-muted-foreground text-sm font-medium outline-hidden cursor-not-allowed"
              />
            </div>
            <span className="text-[10px] text-muted-foreground">
              Para alterar seu e-mail de acesso, contate nosso suporte.
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-foreground/80 tracking-wide">
                CPF
              </label>
              {cpf.replace(/\D/g, "").length === 11 &&
                (isValidCPF(cpf) ? (
                  <span className="text-[10px] font-bold text-emerald-600">
                    ✓ Válido
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-destructive">
                    ✕ CPF Inválido
                  </span>
                ))}
            </div>
            <div className="relative">
              <IdCard className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="000.000.000-00"
                maxLength={14}
                value={cpf}
                onChange={(e) => onCpfChange(formatCpf(e.target.value))}
                className={`w-full h-11 pl-10 pr-4 rounded-xl border text-sm font-medium outline-hidden transition ${
                  cpf.replace(/\D/g, "").length === 11 && !isValidCPF(cpf)
                    ? "border-destructive/40 focus:border-destructive text-destructive bg-destructive/10"
                    : "border-input focus:border-primary"
                }`}
              />
            </div>
            {cpf.replace(/\D/g, "").length === 11 && !isValidCPF(cpf) ? (
              <span className="text-[10px] text-destructive font-medium block">
                Dígitos verificadores do CPF não conferem.
              </span>
            ) : (
              <span className="text-[10px] text-muted-foreground">
                Cadastre ou atualize seu CPF para emissão de passagens e
                reservas.
              </span>
            )}
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={isSavingProfile}
            className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-xs transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSavingProfile ? (
              <>
                <Loader2 className="size-4 animate-spin text-secondary" />
                <span>Salvando Alterações...</span>
              </>
            ) : (
              <>
                <Save className="size-4" />
                <span>Salvar Alterações do Perfil</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
