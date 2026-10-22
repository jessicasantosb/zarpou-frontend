import { useState } from "react";
import { useWatch, type UseFormReturn } from "react-hook-form";
import { Eye, EyeOff, Lock } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  PASSWORD_RULES,
  isStrongPassword,
} from "@/lib/password-rules";
import type { AdminUserFormValues } from "@/schemas/admin-user-form";
import { cn } from "@/lib/utils";

interface PasswordFieldProps {
  form: UseFormReturn<AdminUserFormValues>;
  isEditing: boolean;
}

export function PasswordField({ form, isEditing }: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = useWatch({ control: form.control, name: "password" });
  const confirmPassword = useWatch({
    control: form.control,
    name: "confirmPassword",
  });

  const showRules = !isEditing || password.length > 0;
  const showConfirm = !isEditing || password.length > 0;
  const isStrong = isStrongPassword(password);

  return (
    <>
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center justify-between">
              <FormLabel
                required={!isEditing}
                className="text-xs font-bold text-foreground/80"
              >
                {isEditing ? "Nova Senha (opcional)" : "Senha de Acesso"}
              </FormLabel>
              {password.length > 0 && (
                <span
                  className={cn(
                    "rounded-full border px-2 py-0.5 text-[10px] font-bold",
                    isStrong
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-amber-200 bg-amber-50 text-amber-700",
                  )}
                >
                  {isStrong ? "Senha Forte ✓" : "Senha Fraca"}
                </span>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <FormControl>
                <Input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  placeholder={
                    isEditing
                      ? "Deixe em branco para manter a senha atual"
                      : "Crie uma senha segura (mín. 8 caracteres)"
                  }
                  className="rounded-xl border-border bg-muted pl-9 pr-10 text-xs focus:bg-card"
                />
              </FormControl>
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-muted-foreground transition hover:text-foreground/70 cursor-pointer"
                title={showPassword ? "Ocultar senha" : "Ver senha"}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
            <FormMessage className="text-[11px]" />
          </FormItem>
        )}
      />

      {showRules && (
        <div className="-mt-2 space-y-1.5 rounded-xl border border-border bg-muted/80 p-2.5">
          <p className="text-[11px] font-bold text-foreground/70">
            Requisitos de segurança:
          </p>
          <div className="grid grid-cols-2 gap-1.5 text-[10px]">
            {PASSWORD_RULES.map((rule) => {
              const met = rule.test(password);
              return (
                <span
                  key={rule.label}
                  className={cn(
                    "flex items-center gap-1.5 font-medium transition-colors",
                    met ? "font-bold text-emerald-700" : "text-muted-foreground",
                  )}
                >
                  <span
                    className={cn(
                      "size-1.5 rounded-full transition-colors",
                      met ? "bg-emerald-600" : "bg-border",
                    )}
                  />
                  {rule.label}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {showConfirm && (
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel required className="text-xs font-bold text-foreground/80">
                Confirmar Senha
              </FormLabel>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <FormControl>
                  <Input
                    {...field}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repita a mesma senha criada acima"
                    className={cn(
                      "rounded-xl bg-muted pl-9 pr-10 text-xs transition focus:bg-card",
                      confirmPassword.length > 0
                        ? password === confirmPassword
                          ? "border-emerald-400 bg-emerald-50/20"
                          : "border-destructive/40 bg-destructive/10"
                        : "border-border",
                    )}
                  />
                </FormControl>
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((visible) => !visible)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-muted-foreground transition hover:text-foreground/70 cursor-pointer"
                  title={showConfirmPassword ? "Ocultar senha" : "Ver senha"}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              {confirmPassword.length > 0 &&
                password !== confirmPassword && (
                  <p className="text-[11px] font-semibold text-destructive">
                    As senhas digitadas não coincidem.
                  </p>
                )}
              {confirmPassword.length > 0 && password === confirmPassword && (
                <p className="text-[11px] font-semibold text-emerald-600">
                  ✓ As senhas conferem.
                </p>
              )}
              <FormMessage className="text-[11px]" />
            </FormItem>
          )}
        />
      )}
    </>
  );
}
