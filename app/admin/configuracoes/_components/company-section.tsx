import type { Control } from "react-hook-form";
import { Building } from "lucide-react";
import type { AgencyConfigFormValues } from "@/schemas/agency-config";
import { ConfigField } from "./config-field";
import { SectionCard } from "./section-card";

interface CompanySectionProps {
  control: Control<AgencyConfigFormValues>;
}

export function CompanySection({ control }: CompanySectionProps) {
  return (
    <SectionCard icon={Building} title="Dados Cadastrais & Fiscais">
      <div className="grid grid-cols-1 gap-4 text-xs sm:grid-cols-2">
        <ConfigField
          control={control}
          name="cnpj"
          label="CNPJ da Agência"
          required
          helper="Atualiza o rodapé, vouchers e termos legais do site"
        />
        <ConfigField
          control={control}
          name="cadastur"
          label="Registro Cadastur"
          required
          helper="Certificado oficial do Ministério do Turismo"
        />
        <ConfigField control={control} name="companyName" label="Razão Social" />
        <ConfigField
          control={control}
          name="tradingName"
          label="Nome Fantasia"
        />
      </div>
    </SectionCard>
  );
}
