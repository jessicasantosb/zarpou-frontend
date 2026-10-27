import { useWatch, type UseFormReturn } from "react-hook-form";
import { AlertCircle, Crown } from "lucide-react";
import { toast } from "react-toastify";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ALL_ADMIN_SCREEN_IDS } from "@/lib/admin-access";
import type { AdminUserFormValues } from "@/schemas/admin-user-form";
import { AVAILABLE_ADMIN_SCREENS } from "@/types/user";
import { cn } from "@/lib/utils";

interface ScreensPermissionFieldProps {
  form: UseFormReturn<AdminUserFormValues>;
  isSuperAdmin: boolean;
}

export function ScreensPermissionField({
  form,
  isSuperAdmin,
}: ScreensPermissionFieldProps) {
  const isGeneralAdmin = useWatch({
    control: form.control,
    name: "isGeneralAdmin",
  });
  const allowedScreens = useWatch({
    control: form.control,
    name: "allowedScreens",
  });

  const hasScreensError = Boolean(form.formState.errors.allowedScreens);

  const applyScreens = (screens: string[]) => {
    form.setValue("allowedScreens", screens, { shouldValidate: true });
  };

  return (
    <div className="pt-2">
      <div className="mb-2 flex items-center justify-between">
        <span className="block text-xs font-bold text-foreground">
          Permissões e Telas de Acesso <span className="text-destructive">*</span>
        </span>
        <span
          className={cn(
            "rounded-full border px-2 py-0.5 text-[10px] font-bold",
            isGeneralAdmin
              ? "border-amber-300 bg-amber-50 text-amber-800"
              : allowedScreens.length === 0
                ? "border-destructive/20 bg-destructive/10 text-destructive"
                : "border-emerald-200 bg-emerald-50 text-emerald-700",
          )}
        >
          {isGeneralAdmin
            ? "👑 Administrador Geral (Acesso Total)"
            : allowedScreens.length === 0
              ? "Nenhuma tela (Obrigatório selecionar)"
              : `${allowedScreens.length} de ${AVAILABLE_ADMIN_SCREENS.length} telas liberadas`}
        </span>
      </div>

      <div className="divide-y divide-border/60 overflow-hidden rounded-2xl border border-border bg-card ">
        <FormField
          control={form.control}
          name="isGeneralAdmin"
          render={({ field }) => (
            <FormItem className="gap-0">
              <FormControl>
                <label
                  onClick={(event) => {
                    if (!isSuperAdmin) {
                      event.preventDefault();
                      toast.warn(
                        "Apenas um Administrador Geral pode conceder o nível de Administrador Geral.",
                      );
                    }
                  }}
                  className={cn(
                    "flex select-none items-start gap-3 p-3.5 transition",
                    isGeneralAdmin
                      ? "bg-amber-500/10"
                      : "bg-muted/70 hover:bg-muted",
                    isSuperAdmin
                      ? "cursor-pointer"
                      : "cursor-not-allowed opacity-60",
                  )}
                >
                  <input
                    type="checkbox"
                    checked={field.value}
                    disabled={!isSuperAdmin}
                    onChange={(event) => {
                      field.onChange(event.target.checked);
                      if (event.target.checked) {
                        form.setValue("allowedScreens", [
                          ...ALL_ADMIN_SCREEN_IDS,
                        ], { shouldValidate: true });
                      }
                    }}
                    className="mt-0.5 size-4 shrink-0 cursor-pointer rounded text-amber-600 focus:ring-amber-500 disabled:cursor-not-allowed"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-1.5 text-xs font-black text-foreground">
                        <Crown className="size-3.5 text-amber-600" />
                        É Administrador Geral? (Acesso Total)
                      </span>
                      <span className="shrink-0 rounded-full border border-amber-300 bg-amber-100 px-2 py-0.5 text-[10px] font-black text-amber-900">
                        Total Irrestrito
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                      {isGeneralAdmin
                        ? "✓ Usuário com acesso total a todas as áreas. As telas individuais abaixo foram desabilitadas."
                        : "Marque esta opção para liberar todas as telas de uma vez só, ou deixe desmarcado para escolher telas específicas abaixo."}
                    </p>
                    {!isSuperAdmin && (
                      <p className="mt-1 text-[10px] font-medium text-amber-700">
                        * Apenas um Administrador Geral pode conceder este nível.
                      </p>
                    )}
                  </div>
                </label>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="allowedScreens"
          render={({ field }) => {
            const toggleScreen = (screenId: string) => {
              if (isGeneralAdmin) return;
              field.onChange(
                field.value.includes(screenId)
                  ? field.value.filter((id) => id !== screenId)
                  : [...field.value, screenId],
              );
            };

            return (
              <FormItem className="gap-0">
                <div className="max-h-56 divide-y divide-border/60 overflow-y-auto">
                  {AVAILABLE_ADMIN_SCREENS.map((screen) => {
                    const isChecked =
                      isGeneralAdmin || field.value.includes(screen.id);

                    return (
                      <label
                        key={screen.id}
                        className={cn(
                          "flex select-none items-center justify-between gap-3 px-3.5 py-2.5 text-xs transition",
                          isGeneralAdmin
                            ? "cursor-not-allowed bg-muted/60 opacity-50"
                            : isChecked
                              ? "cursor-pointer bg-primary/5 hover:bg-primary/10"
                              : "cursor-pointer bg-card hover:bg-muted",
                        )}
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            disabled={isGeneralAdmin}
                            onChange={() => toggleScreen(screen.id)}
                            className="size-4 shrink-0 cursor-pointer rounded text-primary focus:ring-secondary disabled:cursor-not-allowed"
                          />
                          <div className="min-w-0">
                            <span
                              className={cn(
                                "block truncate text-xs",
                                isGeneralAdmin
                                  ? "text-muted-foreground"
                                  : "font-bold text-foreground",
                              )}
                            >
                              {screen.name}
                            </span>
                            <span className="block truncate text-[10px] text-muted-foreground">
                              {screen.description}
                            </span>
                          </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-1.5">
                          <span className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                            id: {screen.id}
                          </span>
                          {isGeneralAdmin ? (
                            <span className="rounded border border-amber-200 bg-amber-50 px-1.5 py-0.5 text-[9px] font-bold text-amber-700">
                              Incluso
                            </span>
                          ) : isChecked ? (
                            <span className="rounded border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700">
                              Liberada
                            </span>
                          ) : null}
                        </div>
                      </label>
                    );
                  })}
                </div>
                <FormMessage className="px-3.5 pt-2 text-[11px]" />
              </FormItem>
            );
          }}
        />
      </div>

      {!isGeneralAdmin && (
        <div className="mt-2 flex flex-wrap items-center justify-between gap-1.5 px-1">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => applyScreens([...ALL_ADMIN_SCREEN_IDS])}
              className="cursor-pointer text-[11px] font-bold text-primary hover:underline"
            >
              + Marcar Todas ({AVAILABLE_ADMIN_SCREENS.length})
            </button>
            <span className="text-muted-foreground/60">•</span>
            <button
              type="button"
              onClick={() =>
                applyScreens(["hospedagens", "passagens", "destinos"])
              }
              className="cursor-pointer text-[11px] font-medium text-muted-foreground transition hover:text-primary"
            >
              Só Catálogo
            </button>
            <span className="text-muted-foreground/60">•</span>
            <button
              type="button"
              onClick={() => applyScreens(["dashboard", "reservas", "usuarios"])}
              className="cursor-pointer text-[11px] font-medium text-muted-foreground transition hover:text-primary"
            >
              Operações & Vendas
            </button>
          </div>

          {allowedScreens.length > 0 && (
            <button
              type="button"
              onClick={() => applyScreens([])}
              className="cursor-pointer text-[11px] font-bold text-muted-foreground transition hover:text-destructive"
            >
              Limpar Seleção
            </button>
          )}
        </div>
      )}

      {!isGeneralAdmin && allowedScreens.length === 0 && !hasScreensError && (
        <div className="mt-2.5 flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs font-semibold text-amber-800">
          <AlertCircle className="size-4 shrink-0 text-amber-600" />
          <span>
            Selecione ao menos uma tela ou marque a opção de Administrador
            Geral acima.
          </span>
        </div>
      )}
    </div>
  );
}
