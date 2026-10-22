import type { UseFormReturn } from "react-hook-form";
import { FormControl } from "@/components/ui/form";
import type { HotelFormValues } from "@/schemas/hotel-form";
import { HotelField } from "./hotel-field";

const STAR_OPTIONS = [
  { value: "3", label: "3 Estrelas" },
  { value: "4", label: "4 Estrelas" },
  { value: "5", label: "5 Estrelas (Luxo)" },
];

const INSTALLMENT_OPTIONS = [
  { value: "6", label: "Até 6x sem juros" },
  { value: "10", label: "Até 10x sem juros" },
  { value: "12", label: "Até 12x sem juros" },
];

interface HotelGeneralTabProps {
  form: UseFormReturn<HotelFormValues>;
}

export function HotelGeneralTab({ form }: HotelGeneralTabProps) {
  return (
    <div className="animate-in space-y-4 fade-in duration-150">
      <HotelField
        control={form.control}
        name="name"
        label="Nome do Hotel / Pousada / Resort"
        required
        placeholder="Ex: Copacabana Palace Grand Luxury"
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <HotelField
          control={form.control}
          name="city"
          label="Cidade"
          required
          placeholder="Ex: Rio de Janeiro"
        />
        <HotelField
          control={form.control}
          name="state"
          label="Estado (UF)"
          required
          maxLength={2}
          placeholder="RJ"
          inputClassName="font-bold"
          transform={(value) => value.toUpperCase()}
        />
        <HotelField
          control={form.control}
          name="neighborhood"
          label="Bairro / Praia"
          required
          placeholder="Ex: Copacabana"
        />
      </div>

      <HotelField
        control={form.control}
        name="address"
        label="Endereço Completo (Rua e Número)"
        placeholder="Ex: Av. Atlântica, 1702"
        inputClassName="font-medium"
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <HotelField
          control={form.control}
          name="stars"
          label="Classificação (Estrelas)"
          render={(field) => (
            <FormControl>
              <select
                value={String(field.value)}
                onChange={(event) => field.onChange(Number(event.target.value))}
                className="h-10 w-full rounded-xl border border-border px-3 text-xs font-semibold outline-hidden focus:border-primary"
              >
                {STAR_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </FormControl>
          )}
        />
        <HotelField
          control={form.control}
          name="badge"
          label="Selo / Badge Destaque"
          placeholder="Ex: Recomendado, Oferta Zarpou"
        />
        <HotelField
          control={form.control}
          name="maxInstallments"
          label="Max Parcelas Sem Juros"
          render={(field) => (
            <FormControl>
              <select
                value={String(field.value)}
                onChange={(event) => field.onChange(Number(event.target.value))}
                className="h-10 w-full rounded-xl border border-border px-3 text-xs font-semibold outline-hidden focus:border-primary"
              >
                {INSTALLMENT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </FormControl>
          )}
        />
      </div>
    </div>
  );
}
