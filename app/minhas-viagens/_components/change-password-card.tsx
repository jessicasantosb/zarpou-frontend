import type React from "react";
import { Check, Key, Loader2, Lock } from "lucide-react";
import { passwordChecks } from "@/lib/password-rules";
import { InputPassword } from "@/components/ui/input-password";

interface ChangePasswordCardProps {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  showCurrentPass: boolean;
  showNewPass: boolean;
  showConfirmPass: boolean;
  isChangingPassword: boolean;
  onCurrentPasswordChange: (value: string) => void;
  onNewPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onToggleCurrentPass: () => void;
  onToggleNewPass: () => void;
  onToggleConfirmPass: () => void;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

const inputClassName =
  "h-11 rounded-xl border border-input text-sm font-medium shadow-none outline-hidden transition focus:border-primary focus-visible:border-primary focus-visible:ring-0";

export function ChangePasswordCard({
  currentPassword,
  newPassword,
  confirmPassword,
  showCurrentPass,
  showNewPass,
  showConfirmPass,
  isChangingPassword,
  onCurrentPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onToggleCurrentPass,
  onToggleNewPass,
  onToggleConfirmPass,
  onSubmit,
}: ChangePasswordCardProps) {
  return (
    <div className="bg-card rounded-3xl p-6 sm:p-8 border border-border shadow-xs space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-border/60">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/15 text-primary text-[11px] font-black tracking-wide mb-1">
            <Key className="size-3 text-secondary fill-secondary" />
            Segurança da Conta
          </div>
          <h3 className="text-lg font-bold text-foreground">
            Alterar Senha de Acesso
          </h3>
          <p className="text-xs text-muted-foreground">
            Para sua segurança, utilize uma senha forte com letras maiúsculas,
            números e caracteres especiais.
          </p>
        </div>
        <div className="size-10 rounded-xl bg-muted text-foreground/70 flex items-center justify-center">
          <Lock className="size-5" />
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground/80 tracking-wide">
              Senha Atual *
            </label>
            <InputPassword
              password={currentPassword}
              setPassword={onCurrentPasswordChange}
              showPassword={showCurrentPass}
              setShowPassword={onToggleCurrentPass}
              className={inputClassName}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground/80 tracking-wide">
              Nova Senha *
            </label>
            <InputPassword
              icon={Key}
              placeholder="Mínimo 8 caracteres"
              password={newPassword}
              setPassword={onNewPasswordChange}
              showPassword={showNewPass}
              setShowPassword={onToggleNewPass}
              className={inputClassName}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground/80 tracking-wide">
              Confirmar Nova Senha *
            </label>
            <InputPassword
              icon={Key}
              placeholder="Repita a nova senha"
              password={confirmPassword}
              setPassword={onConfirmPasswordChange}
              showPassword={showConfirmPass}
              setShowPassword={onToggleConfirmPass}
              className={inputClassName}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
          <div
            className={`flex items-center gap-1.5 ${
              passwordChecks.hasMinLength(newPassword)
                ? "text-emerald-600 font-bold"
                : "text-muted-foreground"
            }`}
          >
            <Check className="size-3.5" /> 8+ caracteres
          </div>
          <div
            className={`flex items-center gap-1.5 ${
              passwordChecks.hasUpperCase(newPassword)
                ? "text-emerald-600 font-bold"
                : "text-muted-foreground"
            }`}
          >
            <Check className="size-3.5" /> 1 letra maiúscula
          </div>
          <div
            className={`flex items-center gap-1.5 ${
              passwordChecks.hasNumber(newPassword)
                ? "text-emerald-600 font-bold"
                : "text-muted-foreground"
            }`}
          >
            <Check className="size-3.5" /> 1 número
          </div>
          <div
            className={`flex items-center gap-1.5 ${
              passwordChecks.hasSpecialChar(newPassword)
                ? "text-emerald-600 font-bold"
                : "text-muted-foreground"
            }`}
          >
            <Check className="size-3.5" /> 1 caractere especial
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={isChangingPassword}
            className="px-6 py-3 bg-secondary hover:bg-secondary/90 text-primary font-black text-xs rounded-xl flex items-center gap-2 shadow-xs transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isChangingPassword ? (
              <>
                <Loader2 className="size-4 animate-spin text-primary" />
                <span>Atualizando Senha...</span>
              </>
            ) : (
              <>
                <Key className="size-4" />
                <span>Atualizar Senha</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
