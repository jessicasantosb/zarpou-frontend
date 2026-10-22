import type { UseFormReturn } from "react-hook-form";
import { ShieldCheck } from "lucide-react";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import type { AdminUserFormValues } from "@/schemas/admin-user-form";

interface TwoFactorSectionProps {
  form: UseFormReturn<AdminUserFormValues>;
  isEditing: boolean;
}

export function TwoFactorSection({ form, isEditing }: TwoFactorSectionProps) {
  if (!isEditing) {
    return (
      <div className="space-y-2 rounded-2xl border border-amber-200/90 bg-amber-50/80 p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 shrink-0 rounded-xl border border-amber-200/60 bg-amber-500/10 p-2 text-amber-700">
            <ShieldCheck className="size-5 text-amber-600" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-foreground">
                Verificação em Duas Etapas (2FA)
              </h4>
              <span className="rounded-full border border-border bg-card px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                Inicia Desativado
              </span>
            </div>
            <p className="text-xs leading-relaxed text-foreground/70">
              A verificação em duas etapas é criada como desativada para
              garantir o primeiro acesso do usuário.{" "}
              <strong>
                É muito importante orientar o novo administrador a ativar a
                proteção
              </strong>{" "}
              (via E-mail ou Aplicativo Autenticador TOTP) logo após seu
              primeiro login, através do menu de perfil no topo da tela.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <FormField
      control={form.control}
      name="twoFactorEnabled"
      render={({ field }) => (
        <FormItem className="gap-0 rounded-2xl border border-border bg-muted/60 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0 rounded-xl bg-primary/10 p-2 text-primary">
                <ShieldCheck className="size-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-foreground">
                    Autenticação em 2 Fatores (2FA)
                  </span>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${
                      field.value
                        ? "border-emerald-300 bg-emerald-100/70 text-emerald-700"
                        : "border-border bg-muted text-muted-foreground"
                    }`}
                  >
                    {field.value ? "Ativado" : "Desativado"}
                  </span>
                </div>
                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                  {field.value
                    ? "Proteção ativa via App Autenticador (TOTP) ou código por e-mail. Você pode desmarcar para resetar caso o administrador tenha perdido o acesso."
                    : "Desativado no momento. O próprio administrador deve ativar em seu perfil após fazer login."}
                </p>
              </div>
            </div>

            <FormControl>
              <label className="relative mt-0.5 inline-flex shrink-0 cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={(event) => field.onChange(event.target.checked)}
                  className="peer sr-only"
                />
                <div className="cursor-pointer rounded-full bg-border peer-focus:outline-none after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:translate-x-0 after:rounded-full after:border after:border-input after:bg-card after:transition-all after:content-[''] peer-checked:translate-x-full peer-checked:border-white peer-checked:bg-primary h-5 w-9"></div>
              </label>
            </FormControl>
          </div>
        </FormItem>
      )}
    />
  );
}
