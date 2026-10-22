import type { Control } from "react-hook-form";
import { Globe } from "lucide-react";
import type { AgencyConfigFormValues } from "@/schemas/agency-config";
import { ConfigField } from "./config-field";
import { SectionCard } from "./section-card";

interface SocialSectionProps {
  control: Control<AgencyConfigFormValues>;
}

export function SocialSection({ control }: SocialSectionProps) {
  return (
    <SectionCard icon={Globe} title="Redes Sociais">
      <div className="grid grid-cols-1 gap-4 text-xs sm:grid-cols-2">
        <ConfigField
          control={control}
          name="instagram"
          label="Instagram (Usuário sem @)"
        />
        <ConfigField
          control={control}
          name="linkedin"
          label="LinkedIn (Empresa)"
        />
      </div>
    </SectionCard>
  );
}
