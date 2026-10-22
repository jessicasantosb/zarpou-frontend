import type { Control } from "react-hook-form";
import { Shield } from "lucide-react";
import { FormControl } from "@/components/ui/form";
import type { AgencyConfigFormValues } from "@/schemas/agency-config";
import { ConfigField } from "./config-field";
import { SectionCard } from "./section-card";

interface LegalSectionProps {
  control: Control<AgencyConfigFormValues>;
}

export function LegalSection({ control }: LegalSectionProps) {
  return (
    <SectionCard
      icon={Shield}
      title="Políticas & Termos de Uso Próprios"
    >
      <div className="space-y-4 text-xs">
        <ConfigField
          control={control}
          name="termsAndConditions"
          label="Termos e Condições da Zarpou"
          render={(field) => (
            <FormControl>
              <textarea
                rows={4}
                value={String(field.value)}
                onChange={(event) => field.onChange(event.target.value)}
                className="w-full rounded-xl border border-input p-3.5 text-xs font-medium leading-relaxed outline-hidden focus:border-primary"
              />
            </FormControl>
          )}
        />
        <ConfigField
          control={control}
          name="privacyPolicy"
          label="Política de Privacidade (LGPD)"
          render={(field) => (
            <FormControl>
              <textarea
                rows={4}
                value={String(field.value)}
                onChange={(event) => field.onChange(event.target.value)}
                className="w-full rounded-xl border border-input p-3.5 text-xs font-medium leading-relaxed outline-hidden focus:border-primary"
              />
            </FormControl>
          )}
        />
      </div>
    </SectionCard>
  );
}
