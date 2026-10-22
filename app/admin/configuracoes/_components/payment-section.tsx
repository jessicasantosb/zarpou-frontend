import type { Control } from "react-hook-form";
import { CreditCard, Key, Lock } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import type { AgencyConfigFormValues } from "@/schemas/agency-config";
import { cn } from "@/lib/utils";
import { ConfigField } from "./config-field";
import { SectionCard } from "./section-card";
import { SecretInput } from "./secret-input";

const providerOptions = [
  { value: "mercadopago", label: "Mercado Pago (Recomendado para Turismo)" },
  { value: "asaas", label: "Asaas (Excelente para Pix, Boletos e Split)" },
  { value: "pagarme", label: "Pagar.me / Stone" },
  { value: "stripe", label: "Stripe" },
  { value: "efi", label: "Efí (Gerencianet - Pix Especialista)" },
];

const methodOptions = [
  { key: "creditCard", label: "Cartão de Crédito (até 12x)" },
  { key: "pix", label: "Pix (com 5% de desconto à vista)" },
  { key: "boleto", label: "Boleto Bancário" },
] as const;

interface PaymentSectionProps {
  control: Control<AgencyConfigFormValues>;
}

export function PaymentSection({ control }: PaymentSectionProps) {
  return (
    <SectionCard
      icon={CreditCard}
      title="Configurações da API de Pagamento (Gateway)"
      headerExtra={
        <FormField
          control={control}
          name="paymentGateway.environment"
          render={({ field }) => (
            <FormItem className="gap-0">
              <FormControl>
                <div className="flex items-center gap-2 rounded-xl bg-muted p-1">
                  <button
                    type="button"
                    onClick={() => field.onChange("sandbox")}
                    className={cn(
                      "cursor-pointer rounded-lg px-3 py-1 text-xs font-bold transition",
                      field.value === "sandbox"
                        ? "bg-amber-500 text-white shadow-xs"
                        : "text-foreground/70 hover:text-foreground",
                    )}
                  >
                    Ambiente de Testes (Sandbox)
                  </button>
                  <button
                    type="button"
                    onClick={() => field.onChange("production")}
                    className={cn(
                      "cursor-pointer rounded-lg px-3 py-1 text-xs font-bold transition",
                      field.value === "production"
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "text-foreground/70 hover:text-foreground",
                    )}
                  >
                    Produção Oficial (Ao Vivo)
                  </button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      }
      description="Defina o provedor e as credenciais que processarão os pagamentos em cartão, Pix e boleto diretamente na plataforma Zarpou."
    >
      <div className="grid grid-cols-1 gap-4 text-xs sm:grid-cols-2">
        <ConfigField
          control={control}
          name="paymentGateway.provider"
          label="Gateway de Pagamento"
          options={providerOptions}
        />
        <ConfigField
          control={control}
          name="paymentGateway.pixKey"
          label="Chave Pix da Agência (Para Recebimento Direto)"
          placeholder="CNPJ, Chave Aleatória ou E-mail da conta bancária"
        />
        <ConfigField
          control={control}
          name="paymentGateway.publicKey"
          label="Chave Pública / Public Key"
          hint="(Frontend / Token)"
          icon={Lock}
          mono
          placeholder="APP_USR-xxxx... ou pk_live_..."
        />
        <ConfigField
          control={control}
          name="paymentGateway.secretKey"
          label="Chave Secreta / Access Token"
          hint="(Backend / Transações)"
          render={(field) => (
            <SecretInput
              value={String(field.value)}
              onChange={field.onChange}
              icon={Key}
              placeholder="APP_USR-yyyy... ou sk_live_..."
            />
          )}
        />
        <ConfigField
          control={control}
          name="paymentGateway.webhookSecret"
          label="Segredo do Webhook (Webhook Secret / Assinatura de Notificação)"
          mono
          className="sm:col-span-2"
          placeholder="Ex: whsec_xxxxxxxxxxxxxxxxxxxx ou chave de validação de callback"
          helper="Usado pelo backend para confirmar se o aviso de pagamento Pix/Cartão aprovado é autêntico"
        />

        <FormField
          control={control}
          name="paymentGateway.activeMethods"
          render={({ field }) => (
            <FormItem className="space-y-1 border-t border-border/60 pt-2 sm:col-span-2">
              <FormLabel className="block text-xs font-bold tracking-wide text-foreground/80">
                Métodos de Pagamento Permitidos no Checkout
              </FormLabel>
              <div className="flex flex-wrap gap-4">
                {methodOptions.map((method) => (
                  <label
                    key={method.key}
                    className="flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-muted px-3.5 py-2"
                  >
                    <input
                      type="checkbox"
                      checked={field.value[method.key]}
                      onChange={(event) =>
                        field.onChange({
                          ...field.value,
                          [method.key]: event.target.checked,
                        })
                      }
                      className="size-4 cursor-pointer rounded text-primary"
                    />
                    <span className="text-xs font-bold text-foreground/80">
                      {method.label}
                    </span>
                  </label>
                ))}
              </div>
            </FormItem>
          )}
        />
      </div>
    </SectionCard>
  );
}
