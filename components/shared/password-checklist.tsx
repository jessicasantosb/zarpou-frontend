import { Check } from "lucide-react";

export interface PasswordCriteria {
  hasMinLength: boolean;
  hasUpperCase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

interface PasswordChecklistProps {
  passwordCriteria: PasswordCriteria;
  fulfilledCount: number;
}

export function PasswordChecklist({
  passwordCriteria,
  fulfilledCount,
}: PasswordChecklistProps) {
  return (
    <div className="p-3.5 bg-muted/50 border border-border/90 rounded-2xl space-y-2.5 transition">
      <div className="flex items-center justify-between text-[11px] font-bold">
        <span className="text-foreground/70">Requisitos da Senha:</span>
        <span
          className={
            fulfilledCount === 4
              ? "text-emerald-600 font-extrabold"
              : fulfilledCount >= 2
                ? "text-amber-600 font-semibold"
                : "text-muted-foreground font-medium"
          }
        >
          {fulfilledCount === 4
            ? "✓ Senha Forte e Válida"
            : fulfilledCount >= 2
              ? "Senha Média"
              : "Senha Fraca"}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full">
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            fulfilledCount >= 1
              ? fulfilledCount === 4
                ? "bg-emerald-500"
                : "bg-amber-400"
              : "bg-muted"
          }`}
        />
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            fulfilledCount >= 2
              ? fulfilledCount === 4
                ? "bg-emerald-500"
                : "bg-amber-400"
              : "bg-muted"
          }`}
        />
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            fulfilledCount >= 3
              ? fulfilledCount === 4
                ? "bg-emerald-500"
                : "bg-amber-400"
              : "bg-muted"
          }`}
        />
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            fulfilledCount === 4 ? "bg-emerald-500" : "bg-muted"
          }`}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1.5 pt-1 text-xs">
        <div
          className={`flex items-center gap-1.5 transition-colors ${
            passwordCriteria.hasMinLength
              ? "text-emerald-700 font-semibold"
              : "text-muted-foreground"
          }`}
        >
          {passwordCriteria.hasMinLength ? (
            <Check className="size-3.5 text-emerald-600 shrink-0" />
          ) : (
            <span className="size-1.5 rounded-full bg-border ml-1 mr-1 shrink-0" />
          )}
          <span>Mínimo 8 caracteres</span>
        </div>

        <div
          className={`flex items-center gap-1.5 transition-colors ${
            passwordCriteria.hasUpperCase
              ? "text-emerald-700 font-semibold"
              : "text-muted-foreground"
          }`}
        >
          {passwordCriteria.hasUpperCase ? (
            <Check className="size-3.5 text-emerald-600 shrink-0" />
          ) : (
            <span className="size-1.5 rounded-full bg-border ml-1 mr-1 shrink-0" />
          )}
          <span>1 letra maiúscula (A-Z)</span>
        </div>

        <div
          className={`flex items-center gap-1.5 transition-colors ${
            passwordCriteria.hasNumber
              ? "text-emerald-700 font-semibold"
              : "text-muted-foreground"
          }`}
        >
          {passwordCriteria.hasNumber ? (
            <Check className="size-3.5 text-emerald-600 shrink-0" />
          ) : (
            <span className="size-1.5 rounded-full bg-border ml-1 mr-1 shrink-0" />
          )}
          <span>1 número (0-9)</span>
        </div>

        <div
          className={`flex items-center gap-1.5 transition-colors ${
            passwordCriteria.hasSpecialChar
              ? "text-emerald-700 font-semibold"
              : "text-muted-foreground"
          }`}
        >
          {passwordCriteria.hasSpecialChar ? (
            <Check className="size-3.5 text-emerald-600 shrink-0" />
          ) : (
            <span className="size-1.5 rounded-full bg-border ml-1 mr-1 shrink-0" />
          )}
          <span>1 especial (!@#$...)</span>
        </div>
      </div>
    </div>
  );
}
