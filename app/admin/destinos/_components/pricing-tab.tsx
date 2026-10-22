import type { UseFormReturn } from "react-hook-form";
import { Hotel, Link as LinkIcon, Tag } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { DestinationFormValues } from "@/schemas/destination-form";

interface PricingTabProps {
  form: UseFormReturn<DestinationFormValues>;
}

export function PricingTab({ form }: PricingTabProps) {
  const title = form.watch("title");
  const accommodationsCount = form.watch("accommodationsCount");

  const buildCityLink = (path: string) =>
    `${path}?city=${encodeURIComponent(title.trim() || "Brasil")}`;

  return (
    <div className="animate-in space-y-5 fade-in duration-150">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="startingPrice"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel
                required
                className="flex items-center gap-1 text-[11px] font-bold tracking-wide text-foreground/80"
              >
                <Tag className="size-3 text-emerald-600" />
                Preço a partir de (R$)
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Ex: 520"
                  className="h-10 rounded-xl border-border text-xs font-bold text-emerald-600 outline-hidden focus:border-primary"
                />
              </FormControl>
              <p className="text-[10px] text-muted-foreground">
                Valor de referência para diárias ou pacotes promocionais deste
                destino.
              </p>
              <FormMessage className="text-[10px]" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accommodationsCount"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel
                required
                className="flex items-center gap-1 text-[11px] font-bold tracking-wide text-foreground/80"
              >
                <Hotel className="size-3 text-primary" />
                Acomodações Disponíveis
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Ex: 85"
                  className="h-10 rounded-xl border-border text-xs font-semibold outline-hidden focus:border-primary"
                />
              </FormControl>
              <p className="text-[10px] text-muted-foreground">
                Exibido nos cards como &quot;+{accommodationsCount} opções de
                hospedagens&quot;.
              </p>
              <FormMessage className="text-[10px]" />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="link"
        render={({ field }) => (
          <FormItem className="space-y-3 rounded-2xl border border-border bg-muted p-4">
            <div className="flex items-center justify-between">
              <FormLabel className="flex items-center gap-1.5 text-xs font-bold tracking-wide text-foreground">
                <LinkIcon className="size-3.5 text-primary" />
                Link de Redirecionamento ao Clicar
              </FormLabel>
              <span className="text-[11px] text-muted-foreground">
                Para onde o cliente vai
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => field.onChange(buildCityLink("/hospedagens"))}
                className="cursor-pointer rounded-xl bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary transition hover:bg-primary/20"
              >
                🏨 Filtrar Hospedagens da Cidade
              </button>

              <button
                type="button"
                onClick={() => field.onChange(buildCityLink("/destinos"))}
                className="cursor-pointer rounded-xl bg-secondary/20 px-3 py-1.5 text-xs font-bold text-foreground transition hover:bg-secondary/30"
              >
                🧭 Ver Pacotes em /destinos
              </button>
            </div>

            <FormControl>
              <Input
                {...field}
                type="text"
                placeholder="/hospedagens?city=NomeDaCidade"
                className="h-10 rounded-xl border-border bg-card font-mono text-xs text-foreground/80 outline-hidden focus:border-primary"
              />
            </FormControl>
            <FormMessage className="text-[10px]" />
          </FormItem>
        )}
      />
    </div>
  );
}
