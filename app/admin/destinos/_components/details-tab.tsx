import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { Calendar, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { SUGGESTED_HIGHLIGHTS, SUGGESTED_SEASONS } from "../_constants";

interface DetailsTabProps {
  form: UseFormReturn<DestinationFormValues>;
}

export function DetailsTab({ form }: DetailsTabProps) {
  const [customHighlight, setCustomHighlight] = useState("");

  const bestTimeToVisit = form.watch("bestTimeToVisit");
  const highlights = form.watch("highlights");

  const toggleHighlight = (item: string) => {
    const next = highlights.includes(item)
      ? highlights.filter((highlight) => highlight !== item)
      : [...highlights, item];
    form.setValue("highlights", next);
  };

  const handleAddCustomHighlight = () => {
    const trimmed = customHighlight.trim();
    if (!trimmed) return;
    if (!highlights.includes(trimmed)) {
      form.setValue("highlights", [...highlights, trimmed]);
    }
    setCustomHighlight("");
  };

  return (
    <div className="animate-in space-y-5 fade-in duration-150">
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel
              required
              className="block text-[11px] font-bold tracking-wide text-foreground/80"
            >
              Descrição Completa do Destino
            </FormLabel>
            <FormControl>
              <textarea
                rows={3}
                value={field.value}
                onBlur={field.onBlur}
                onChange={field.onChange}
                placeholder="Conte sobre os encantos da cidade, a culinária, as belezas naturais e por que o turista deve visitar..."
                className="w-full resize-none rounded-xl border border-border p-3 text-xs font-medium leading-relaxed outline-hidden focus:border-primary"
              />
            </FormControl>
            <FormMessage className="text-[10px]" />
          </FormItem>
        )}
      />

      <div className="space-y-2 border-t border-border/60 pt-2">
        <FormField
          control={form.control}
          name="bestTimeToVisit"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="flex items-center gap-1.5 text-[11px] font-bold tracking-wide text-foreground/80">
                <Calendar className="size-3.5 text-primary" />
                Melhor Época para Visitar (Temporada)
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Ex: Dezembro a Março (Verão) ou Ano Todo"
                  className="h-10 rounded-xl border-border text-xs font-medium outline-hidden focus:border-primary"
                />
              </FormControl>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {SUGGESTED_SEASONS.map((season) => (
                  <button
                    key={season}
                    type="button"
                    onClick={() => field.onChange(season)}
                    className={cn(
                      "cursor-pointer rounded-lg px-2.5 py-1 text-[10px] font-medium transition",
                      bestTimeToVisit === season
                        ? "bg-primary font-bold text-white"
                        : "bg-muted text-foreground/70 hover:bg-border",
                    )}
                  >
                    {season}
                  </button>
                ))}
              </div>
              <FormMessage className="text-[10px]" />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-3 border-t border-border/60 pt-2">
        <span className="flex items-center gap-1.5 text-[11px] font-bold tracking-wide text-foreground/80">
          <Sparkles className="size-3.5 text-secondary" />
          Pontos Turísticos & Experiências Imperdíveis
        </span>

        <div className="flex flex-wrap gap-1.5">
          {SUGGESTED_HIGHLIGHTS.map((item) => {
            const active = highlights.includes(item);
            return (
              <button
                key={item}
                type="button"
                onClick={() => toggleHighlight(item)}
                className={cn(
                  "flex cursor-pointer items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition",
                  active
                    ? "bg-primary text-white shadow-2xs"
                    : "bg-muted text-foreground/70 hover:bg-border",
                )}
              >
                {active && <Check className="size-3" />}
                {item}
              </button>
            );
          })}
        </div>

        <div className="flex gap-2">
          <Input
            value={customHighlight}
            onChange={(event) => setCustomHighlight(event.target.value)}
            placeholder="Adicionar atração específica (ex: Praia da Ferradura, Teleférico)..."
            className="h-10 flex-1 rounded-xl border-border text-xs"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleAddCustomHighlight();
              }
            }}
          />
          <Button
            type="button"
            variant="ghost"
            onClick={handleAddCustomHighlight}
            className="h-auto cursor-pointer rounded-xl bg-muted px-4 text-xs font-bold text-foreground hover:bg-border"
          >
            Adicionar
          </Button>
        </div>
      </div>
    </div>
  );
}
