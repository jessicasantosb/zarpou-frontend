import type { Control } from "react-hook-form";
import { Phone } from "lucide-react";
import type { AgencyConfigFormValues } from "@/schemas/agency-config";
import { ConfigField } from "./config-field";
import { SectionCard } from "./section-card";

interface ContactChannelsSectionProps {
  control: Control<AgencyConfigFormValues>;
}

export function ContactChannelsSection({
  control,
}: ContactChannelsSectionProps) {
  return (
    <SectionCard
      icon={Phone}
      title="Canais de Atendimento ao Cliente (Exibidos no Site)"
    >
      <div className="grid grid-cols-1 gap-4 text-xs sm:grid-cols-2">
        <ConfigField
          control={control}
          name="whatsapp"
          label="WhatsApp Oficial do Site (com DDI e DDD)"
          required
          placeholder="Ex: 5531984210000"
          transform={(value) => value.replace(/\D/g, "")}
          helper="Apenas números. Atualiza os botões flutuantes e links wa.me do site."
        />
        <ConfigField
          control={control}
          name="phone"
          label="Telefone Fixo Comercial"
        />
        <ConfigField
          control={control}
          name="whatsappMessage"
          label="Mensagem Padrão ao Abrir WhatsApp"
          className="sm:col-span-2"
        />
        <ConfigField
          control={control}
          name="email"
          label="E-mail de Atendimento"
          type="email"
        />
        <ConfigField
          control={control}
          name="address"
          label="Endereço / Sede"
        />
      </div>
    </SectionCard>
  );
}
