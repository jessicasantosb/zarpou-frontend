import { useState, type KeyboardEvent } from "react";
import { useWatch, type UseFormReturn } from "react-hook-form";
import { Check } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { FlightFormValues } from "@/schemas/flight-form";
import { cn } from "@/lib/utils";
import { COMMON_FLAGS, SUGGESTED_HIGHLIGHTS } from "../_constants";
import { FlightField } from "./flight-field";

interface FlightDetailsTabProps {
  form: UseFormReturn<FlightFormValues>;
}

export function FlightDetailsTab({ form }: FlightDetailsTabProps) {
  const [customHighlight, setCustomHighlight] = useState("");

  const baggageIncluded = useWatch({
    control: form.control,
    name: "baggageIncluded",
  });
  const handBaggageIncluded = useWatch({
    control: form.control,
    name: "handBaggageIncluded",
  });
  const highlights = useWatch({ control: form.control, name: "highlights" }) ?? [];

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

  const handleCustomHighlightKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddCustomHighlight();
    }
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-150">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-muted rounded-2xl border border-border space-y-2">
          <FlightField
            control={form.control}
            name="cabinClass"
            label="Classe da Cabine"
            labelClassName="text-xs font-bold text-foreground"
            render={(field) => (
              <FormControl>
                <select
                  value={String(field.value)}
                  onChange={(event) => field.onChange(event.target.value)}
                  className="w-full h-10 px-3 text-xs rounded-xl border border-border bg-card font-bold"
                >
                  <option value="Econômica">Econômica (Standard)</option>
                  <option value="Premium Economy">Premium Economy</option>
                  <option value="Executiva">Executiva (Business Class)</option>
                </select>
              </FormControl>
            )}
          />
          <p className="text-[11px] text-muted-foreground">
            Informa o conforto e serviço de bordo para os passageiros.
          </p>
        </div>

        <div className="p-4 bg-muted rounded-2xl border border-border space-y-3">
          <label className="text-xs font-bold text-foreground tracking-wide block">
            Franquia de Bagagens
          </label>
          <div className="space-y-2">
            <label className="flex items-center gap-2.5 text-xs font-semibold text-foreground/80 cursor-pointer">
              <input
                type="checkbox"
                checked={handBaggageIncluded}
                onChange={(event) =>
                  form.setValue("handBaggageIncluded", event.target.checked)
                }
                className="size-4 text-primary rounded-sm"
              />
              <span>Bagagem de mão (10kg) inclusa</span>
            </label>
            <label className="flex items-center gap-2.5 text-xs font-semibold text-foreground/80 cursor-pointer">
              <input
                type="checkbox"
                checked={baggageIncluded}
                onChange={(event) =>
                  form.setValue("baggageIncluded", event.target.checked)
                }
                className="size-4 text-primary rounded-sm"
              />
              <span>Bagagem despachada (23kg) inclusa</span>
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-border/60">
        <FlightField
          control={form.control}
          name="country"
          label="País de Destino"
          placeholder="Ex: Estados Unidos"
          inputClassName="font-semibold"
        />

        <FormField
          control={form.control}
          name="flag"
          render={({ field }) => (
            <FormItem className="gap-0 space-y-1">
              <FormLabel className="block text-[11px] font-bold text-foreground/80 tracking-wide">
                Bandeira (Emoji)
              </FormLabel>
              <div className="flex items-center gap-1.5">
                <FormControl>
                  <input
                    type="text"
                    name={field.name}
                    ref={field.ref}
                    onBlur={field.onBlur}
                    value={String(field.value ?? "")}
                    onChange={(event) => field.onChange(event.target.value)}
                    className="w-14 h-10 text-center text-lg rounded-xl border border-border"
                  />
                </FormControl>
                <div className="flex flex-wrap gap-1">
                  {COMMON_FLAGS.slice(0, 5).map((item) => (
                    <button
                      key={item.flag}
                      type="button"
                      onClick={() => {
                        form.setValue("flag", item.flag);
                        form.setValue("country", item.country);
                        form.setValue("region", item.region);
                      }}
                      className="size-8 rounded-lg border border-border text-sm hover:bg-muted transition cursor-pointer flex items-center justify-center"
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

        <FlightField
          control={form.control}
          name="region"
          label="Região (Filtro)"
          inputClassName="font-semibold"
          render={(field) => (
            <FormControl>
              <select
                value={String(field.value)}
                onChange={(event) => field.onChange(event.target.value)}
                className="w-full h-10 px-3 text-xs rounded-xl border border-border font-semibold"
              >
                <option value="all">Todas as Regiões</option>
                <option value="usa">Estados Unidos 🇺🇸</option>
                <option value="europe">Europa 🇪🇺</option>
                <option value="south-america">América do Sul 🌎</option>
                <option value="other">Outros / Ásia / Oriente</option>
              </select>
            </FormControl>
          )}
        />
      </div>

      <div className="space-y-3 pt-2 border-t border-border/60">
        <label className="text-xs font-bold text-foreground tracking-wide block">
          Destaques & Diferenciais do Voo
        </label>

        <div className="flex flex-wrap gap-1.5">
          {SUGGESTED_HIGHLIGHTS.map((item) => {
            const active = highlights.includes(item);
            return (
              <button
                key={item}
                type="button"
                onClick={() => toggleHighlight(item)}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1",
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
          <input
            type="text"
            value={customHighlight}
            onChange={(event) => setCustomHighlight(event.target.value)}
            onKeyDown={handleCustomHighlightKeyDown}
            placeholder="Adicionar outro diferencial (ex: Poltrona reclinável 180°)..."
            className="flex-1 h-10 px-3 text-xs rounded-xl border border-border"
          />
          <button
            type="button"
            onClick={handleAddCustomHighlight}
            className="px-4 bg-muted hover:bg-border text-foreground text-xs font-bold rounded-xl transition cursor-pointer"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}
