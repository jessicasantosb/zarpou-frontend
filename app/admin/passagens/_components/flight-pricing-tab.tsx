import { useMemo } from "react";
import { useWatch, type UseFormReturn } from "react-hook-form";
import { ImageUploader } from "@/app/admin/_components/image-uploader";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import type { FlightFormValues } from "@/schemas/flight-form";
import { FlightField } from "./flight-field";

const INSTALLMENT_OPTIONS = [1, 2, 3, 4, 6, 8, 10, 12, 18, 24];

interface FlightPricingTabProps {
  form: UseFormReturn<FlightFormValues>;
}

export function FlightPricingTab({ form }: FlightPricingTabProps) {
  const price = useWatch({ control: form.control, name: "price" });
  const originalPrice = useWatch({
    control: form.control,
    name: "originalPrice",
  });
  const maxInstallments = useWatch({
    control: form.control,
    name: "maxInstallments",
  });
  const featured = useWatch({ control: form.control, name: "featured" });

  const discountCalculated = useMemo(() => {
    const priceValue = Number(price);
    const originalPriceValue = Number(originalPrice);
    if (originalPriceValue > priceValue && originalPriceValue > 0) {
      return Math.round(
        ((originalPriceValue - priceValue) / originalPriceValue) * 100,
      );
    }
    return 0;
  }, [price, originalPrice]);

  const installmentValue = useMemo(() => {
    const installments = Math.max(1, Number(maxInstallments) || 12);
    return (Number(price) / installments).toFixed(2);
  }, [price, maxInstallments]);

  return (
    <div className="space-y-5 animate-in fade-in duration-150">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FlightField
          control={form.control}
          name="originalPrice"
          label="Preço Original (De) R$"
          type="number"
          placeholder="Ex: 4200"
          labelClassName="text-[11px] font-bold text-muted-foreground"
          inputClassName="font-semibold text-muted-foreground"
        />

        <FlightField
          control={form.control}
          name="price"
          label="Preço Promocional (Por) R$"
          required
          type="number"
          placeholder="Ex: 3290"
          labelClassName="text-[11px] font-bold text-primary"
          inputClassName="border-primary/50 font-black text-primary"
        />

        <FlightField
          control={form.control}
          name="maxInstallments"
          label="Parcelas Sem Juros"
          render={(field) => (
            <FormControl>
              <select
                value={String(field.value)}
                onChange={(event) => field.onChange(event.target.value)}
                className="w-full h-10 px-3 text-xs rounded-xl border border-border font-semibold"
              >
                {INSTALLMENT_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    Até {option}x sem juros
                  </option>
                ))}
              </select>
            </FormControl>
          )}
        />
      </div>

      <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <p className="text-xs text-emerald-800 font-bold">
            Valor final por passageiro: R$ {Number(price).toLocaleString("pt-BR")}
            {discountCalculated > 0 && (
              <span className="ml-2 bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-full font-black">
                {discountCalculated}% OFF
              </span>
            )}
          </p>
          <p className="text-[11px] text-emerald-700">
            {maxInstallments}x de R$ {installmentValue} sem juros no cartão
          </p>
        </div>

        <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-foreground/80 bg-card px-3 py-1.5 rounded-xl border border-emerald-200 ">
          <input
            type="checkbox"
            checked={featured}
            onChange={(event) =>
              form.setValue("featured", event.target.checked)
            }
            className="size-4 text-primary rounded-sm"
          />
          <span>Exibir na Home (Destaque)</span>
        </label>
      </div>

      <div className="pt-2 border-t border-border/60">
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <ImageUploader
                value={field.value}
                onChange={field.onChange}
                folder="passagens"
                label="Foto Panorâmica do Destino *"
                description="Upload para o Storage do Supabase ou link direto da web"
                aspectRatio="video"
                recommendedResolution="Recomendado 1200x800 ou 800x600 em alta qualidade"
              />
              <FormMessage className="text-[10px]" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
