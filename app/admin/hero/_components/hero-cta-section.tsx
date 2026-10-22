import type { UseFormReturn } from "react-hook-form";
import { MessageCircle } from "lucide-react";
import { FormControl } from "@/components/ui/form";
import type { HeroConfigFormValues } from "@/schemas/hero-config";
import { HeroField } from "./hero-field";
import { HeroSectionCard } from "./hero-section-card";

const CTA_LINK_OPTIONS = [
  { value: "whatsapp", label: "Abrir WhatsApp Oficial da Agência" },
  { value: "/hospedagens", label: "Abrir Catálogo de Hospedagens" },
  { value: "/passagens", label: "Abrir Busca de Passagens" },
  { value: "/pacotes", label: "Abrir Pacotes de Viagem" },
  { value: "/contato", label: "Abrir Formulário de Contato" },
];

interface HeroCtaSectionProps {
  form: UseFormReturn<HeroConfigFormValues>;
}

export function HeroCtaSection({ form }: HeroCtaSectionProps) {
  return (
    <HeroSectionCard
      icon={MessageCircle}
      title="Botão de Chamada para Ação (CTA)"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <HeroField
          control={form.control}
          name="ctaText"
          label="Texto do Botão"
        />
        <HeroField
          control={form.control}
          name="ctaLink"
          label="Destino do Botão"
          render={(field) => (
            <FormControl>
              <select
                value={String(field.value ?? "")}
                onChange={(event) => field.onChange(event.target.value)}
                className="h-11 w-full cursor-pointer rounded-xl border border-input bg-card px-3.5 text-xs font-semibold outline-hidden focus:border-primary"
              >
                {CTA_LINK_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>   
            </FormControl>
          )}
        />
      </div>
    </HeroSectionCard>
  );
}
