import { Check, Eye, EyeOff, Loader2, Lock } from "lucide-react";
import { passwordChecks } from "@/lib/password-rules";
import type { AdminSecurity } from "../_hooks/use-admin-security";

interface AdminPasswordFormProps {
  security: AdminSecurity;
}

export function AdminPasswordForm({ security }: AdminPasswordFormProps) {
  const {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    showCurrentPass,
    setShowCurrentPass,
    showNewPass,
    setShowNewPass,
    showConfirmPass,
    setShowConfirmPass,
    isSubmittingPassword,
    handleChangePassword,
    setIsPasswordModalOpen,
  } = security;

  return (
    <form onSubmit={handleChangePassword} className="space-y-4">
      <div>
        <label className="block text-xs font-bold text-foreground/80 mb-1.5">
          Senha Atual
        </label>
        <div className="relative">
          <input
            type={showCurrentPass ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Digite sua senha atual"
            required
            className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-border focus:outline-hidden focus:ring-2 focus:ring-primary pr-10"
          />
          <button
            type="button"
            onClick={() => setShowCurrentPass(!showCurrentPass)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground/70"
          >
            {showCurrentPass ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-foreground/80 mb-1.5">
          Nova Senha
        </label>
        <div className="relative">
          <input
            type={showNewPass ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Mínimo 8 dígitos com maiúscula, número e símbolo"
            required
            className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-border focus:outline-hidden focus:ring-2 focus:ring-primary pr-10"
          />
          <button
            type="button"
            onClick={() => setShowNewPass(!showNewPass)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground/70"
          >
            {showNewPass ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-foreground/80 mb-1.5">
          Confirmar Nova Senha
        </label>
        <div className="relative">
          <input
            type={showConfirmPass ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repita a nova senha"
            required
            className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-border focus:outline-hidden focus:ring-2 focus:ring-primary pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPass(!showConfirmPass)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground/70"
          >
            {showConfirmPass ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>

      <div className="bg-muted border border-border/60 rounded-xl p-3 text-[11px] space-y-1.5">
        <span className="font-bold text-foreground/80 block mb-1">Requisitos de segurança:</span>
        <div className="grid grid-cols-2 gap-1.5">
          <span
            className={`flex items-center gap-1.5 ${
              passwordChecks.hasMinLength(newPassword) ? "text-emerald-600 font-semibold" : "text-muted-foreground"
            }`}
          >
            <Check className="size-3" /> 8+ caracteres
          </span>
          <span
            className={`flex items-center gap-1.5 ${
              passwordChecks.hasUpperCase(newPassword) ? "text-emerald-600 font-semibold" : "text-muted-foreground"
            }`}
          >
            <Check className="size-3" /> Letra maiúscula
          </span>
          <span
            className={`flex items-center gap-1.5 ${
              passwordChecks.hasNumber(newPassword) ? "text-emerald-600 font-semibold" : "text-muted-foreground"
            }`}
          >
            <Check className="size-3" /> Número
          </span>
          <span
            className={`flex items-center gap-1.5 ${
              passwordChecks.hasSpecialChar(newPassword) ? "text-emerald-600 font-semibold" : "text-muted-foreground"
            }`}
          >
            <Check className="size-3" /> Caractere especial
          </span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-2">
        <button
          type="button"
          disabled={isSubmittingPassword}
          onClick={() => setIsPasswordModalOpen(false)}
          className="px-4 py-2 text-xs font-bold text-foreground/70 hover:bg-muted rounded-xl transition cursor-pointer"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmittingPassword}
          className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow-xs"
        >
          {isSubmittingPassword ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <Lock className="size-4" />
              Atualizar Senha
            </>
          )}
        </button>
      </div>
    </form>
  );
}
