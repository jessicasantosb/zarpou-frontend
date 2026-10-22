import type { UseFormReturn } from "react-hook-form";
import { MapPin } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { DestinationFormValues } from "@/schemas/destination-form";
import { cn } from "@/lib/utils";
import { COMMON_FLAGS, SUGGESTED_TAGS } from "../_constants";

interface LocationTabProps {
  form: UseFormReturn<DestinationFormValues>;
  isEditing: boolean;
}

export function LocationTab({ form, isEditing }: LocationTabProps) {
  const selectedTag = form.watch("tag");
  const category = form.watch("category");

  return (
    <div className="animate-in space-y-5 fade-in duration-150">
      <div className="flex items-center justify-between rounded-2xl border border-primary/10 bg-primary/5 p-3 text-xs">
        <span className="flex items-center gap-1.5 font-bold text-primary">
          <MapPin className="size-4 text-secondary" />
          Dados Geográficos do Destino
        </span>
        <span className="font-medium text-muted-foreground">
          Campos com * são obrigatórios
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="space-y-1 sm:col-span-2">
              <FormLabel
                required
                className="block text-[11px] font-bold tracking-wide text-foreground/80"
              >
                Nome da Cidade / Destino
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Ex: Armação dos Búzios, Fernando de Noronha, Paris..."
                  onChange={(event) => {
                    field.onChange(event);
                    const link = form.getValues("link");
                    if (
                      !isEditing &&
                      (!link || link.startsWith("/hospedagens"))
                    ) {
                      form.setValue(
                        "link",
                        `/hospedagens?city=${encodeURIComponent(event.target.value.trim())}`,
                      );
                    }
                  }}
                  className="h-10 rounded-xl border-border text-xs font-bold text-foreground outline-hidden focus:border-primary"
                />
              </FormControl>
              <FormMessage className="text-[10px]" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="block text-[11px] font-bold tracking-wide text-foreground/80">
                Estado / Província
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Ex: Rio de Janeiro, Île-de-France..."
                  className="h-10 rounded-xl border-border text-xs font-medium outline-hidden focus:border-primary"
                />
              </FormControl>
              <FormMessage className="text-[10px]" />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel
                required
                className="block text-[11px] font-bold tracking-wide text-foreground/80"
              >
                País
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Ex: Brasil"
                  className="h-10 rounded-xl border-border text-xs font-semibold outline-hidden focus:border-primary"
                />
              </FormControl>
              <FormMessage className="text-[10px]" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="flag"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="block text-[11px] font-bold tracking-wide text-foreground/80">
                Bandeira (Emoji)
              </FormLabel>
              <div className="flex items-center gap-1.5">
                <FormControl>
                  <Input
                    {...field}
                    className="h-10 w-14 rounded-xl border-border text-center text-lg outline-hidden focus:border-primary"
                  />
                </FormControl>
                <div className="flex flex-wrap gap-1">
                  {COMMON_FLAGS.slice(0, 5).map((item) => (
                    <button
                      key={item.flag}
                      type="button"
                      onClick={() => {
                        field.onChange(item.flag);
                        form.setValue("country", item.country);
                        form.setValue("category", item.category);
                      }}
                      className="flex size-8 cursor-pointer items-center justify-center rounded-lg border border-border text-sm transition hover:bg-muted"
                      title={item.country}
                    >
                      {item.flag}
                    </button>
                  ))}
                </div>
              </div>
              <FormMessage className="text-[10px]" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel
                required
                className="block text-[11px] font-bold tracking-wide text-foreground/80"
              >
                Categoria do Destino
              </FormLabel>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => field.onChange("national")}
                  className={cn(
                    "flex h-10 cursor-pointer items-center justify-center gap-1 rounded-xl border text-xs font-bold transition",
                    category === "national"
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-card text-foreground/70 hover:bg-muted",
                  )}
                >
                  <span>🇧🇷</span> Nacional
                </button>
                <button
                  type="button"
                  onClick={() => field.onChange("international")}
                  className={cn(
                    "flex h-10 cursor-pointer items-center justify-center gap-1 rounded-xl border text-xs font-bold transition",
                    category === "international"
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-card text-foreground/70 hover:bg-muted",
                  )}
                >
                  <span>🌎</span> Exterior
                </button>
              </div>
              <FormMessage className="text-[10px]" />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="tag"
        render={({ field }) => (
          <FormItem className="space-y-2 border-t border-border/60 pt-2">
            <FormLabel
              required
              className="block text-[11px] font-bold tracking-wide text-foreground/80"
            >
              Tag Principal / Selo do Card
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                type="text"
                placeholder="Ex: Praias Paradisíacas"
                className="h-10 rounded-xl border-border text-xs font-bold text-primary outline-hidden focus:border-primary"
              />
            </FormControl>

            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="py-1 text-[10px] font-semibold text-muted-foreground">
                Sugestões:
              </span>
              {SUGGESTED_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => field.onChange(tag)}
                  className={cn(
                    "cursor-pointer rounded-lg px-2.5 py-1 text-[10px] font-medium transition",
                    selectedTag === tag
                      ? "bg-secondary font-bold text-primary"
                      : "bg-muted text-foreground/70 hover:bg-border",
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
            <FormMessage className="text-[10px]" />
          </FormItem>
        )}
      />
    </div>
  );
}
