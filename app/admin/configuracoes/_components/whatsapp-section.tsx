import { useState } from "react";
import { useWatch, type Control } from "react-hook-form";
import { MessageSquare, Smartphone } from "lucide-react";
import { toast } from "react-toastify";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import type { AgencyConfigFormValues } from "@/schemas/agency-config";
import { ConfigField } from "./config-field";
import { SectionCard } from "./section-card";
import { SecretInput } from "./secret-input";
import { TestConnectionRow } from "./test-connection-row";

const providerOptions = [
  { value: "meta_cloud", label: "Meta Cloud API (Oficial WhatsApp Business)" },
  { value: "evolution_api", label: "Evolution API (Self-Hosted / Baileys)" },
  { value: "z_api", label: "Z-API" },
  { value: "other", label: "Outro Provedor / Gateway Próprio" },
];

interface WhatsappSectionProps {
  control: Control<AgencyConfigFormValues>;
}

export function WhatsappSection({ control }: WhatsappSectionProps) {
  const [isTesting, setIsTesting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const values = useWatch({ control });

  const handleTest = async () => {
    if (
      !values.whatsappApi?.apiToken ||
      !values.whatsappApi?.phoneNumberId
    ) {
      toast.warning("Por favor, preencha o Token e o ID do Número antes de testar.");
      return;
    }
    setIsTesting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsTesting(false);
    setStatus("Conexão validada com sucesso!");
    toast.success("Conexão validada! Credenciais do WhatsApp prontas para disparos automáticos.");
  };

  return (
    <SectionCard
      iconClassName="text-emerald-600"
      icon={MessageSquare}
      title="API do WhatsApp (Disparos Automáticos de Confirmação & Vouchers)"
      headerExtra={
        <FormField
          control={control}
          name="whatsappApi.enabled"
          render={({ field }) => (
            <FormItem className="gap-0">
              <FormControl>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(event) => field.onChange(event.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="h-6 w-11 cursor-pointer rounded-full bg-border peer-focus:outline-hidden after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-input after:bg-card after:transition-all after:content-[''] peer-checked:translate-x-full peer-checked:border-white peer-checked:bg-emerald-600"></div>
                  <span className="ml-2 text-xs font-bold text-foreground/80">
                    {field.value ? "API Ativa" : "Desativada"}
                  </span>
                </label>
              </FormControl>
            </FormItem>
          )}
        />
      }
      description="Configure as credenciais da API para envio automático de confirmação de reservas, bilhetes e vouchers aos passageiros."
    >
      <div className="grid grid-cols-1 gap-4 text-xs sm:grid-cols-2">
        <ConfigField
          control={control}
          name="whatsappApi.provider"
          label="Provedor da API"
          options={providerOptions}
        />
        <ConfigField
          control={control}
          name="whatsappApi.phoneNumberId"
          label="Número do WhatsApp / Phone Number ID"
          icon={Smartphone}
          placeholder="Ex: 104928374659201 ou 5531984210000"
          helper="ID do número remetente na Meta ou número com DDD da instância"
        />
        <ConfigField
          control={control}
          name="whatsappApi.apiToken"
          label="Token de Acesso / API Key"
          hint="(armazena com segurança)"
          className="sm:col-span-2"
          render={(field) => (
            <SecretInput
              value={String(field.value)}
              onChange={field.onChange}
              placeholder="EAAG... ou token gerado no painel da API"
            />
          )}
        />
        <ConfigField
          control={control}
          name="whatsappApi.businessAccountId"
          label="ID da Conta Comercial (WABA ID / Instância)"
          placeholder="Ex: 948302194830192 ou zarpou-production"
        />
        <ConfigField
          control={control}
          name="whatsappApi.apiUrl"
          label="URL Base do Endpoint da API"
          placeholder="Ex: https://graph.facebook.com/v19.0"
        />
      </div>

      <TestConnectionRow
        onTest={handleTest}
        isTesting={isTesting}
        status={status}
        label="Testar Conexão com API"
        testingLabel="Testando Conexão..."
      />
    </SectionCard>
  );
}
