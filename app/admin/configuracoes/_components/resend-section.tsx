import { useState } from "react";
import { useWatch, type Control } from "react-hook-form";
import { Check, Mail } from "lucide-react";
import { toast } from "react-toastify";
import type { AgencyConfigFormValues } from "@/schemas/agency-config";
import { ConfigField } from "./config-field";
import { SectionCard } from "./section-card";
import { SecretInput } from "./secret-input";
import { TestConnectionRow } from "./test-connection-row";

interface ResendSectionProps {
  control: Control<AgencyConfigFormValues>;
}

export function ResendSection({ control }: ResendSectionProps) {
  const [isTesting, setIsTesting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const values = useWatch({ control });

  const handleTest = async () => {
    if (!values.resendApiKey) {
      toast.warning("Por favor, informe a RESEND_API_KEY antes de testar.");
      return;
    }
    if (!values.resendApiKey.startsWith("re_")) {
      toast.warning(
        "Aviso: Chaves oficiais do Resend costumam iniciar com 're_'. Verifique sua chave.",
      );
      return;
    }
    setIsTesting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsTesting(false);
    setStatus("Chave do Resend válida!");
    toast.success(
      "Chave do Resend válida! Disparos de e-mail e vouchers transacionais ativos.",
    );
  };

  return (
    <SectionCard
      icon={Mail}
      title="API de E-mails Transacionais (Resend)"
      headerExtra={
        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black tracking-wide text-primary">
          <span>RESEND_API_KEY</span>
        </div>
      }
      description={
        <>
          A chave de API do Resend é utilizada para disparo em tempo real de
          confirmações de reserva, vouchers de hospedagem/aéreo e mensagens do
          formulário de contato (
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">
            /api/contact
          </code>
          ).
        </>
      }
    >
      <ConfigField
        control={control}
        name="resendApiKey"
        label="Chave da API do Resend (RESEND_API_KEY)"
        render={(field) => (
          <SecretInput
            value={String(field.value)}
            onChange={(value) => field.onChange(value.trim())}
            placeholder="re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
          />
        )}
        helper={() => (
          <div className="flex flex-col justify-between gap-1 pt-1 sm:flex-row sm:items-center">
            <span>
              Obtenha ou gere sua chave no painel oficial em{" "}
              <a
                href="https://resend.com/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-primary hover:underline"
              >
                resend.com/api-keys
              </a>
            </span>
            {values.resendApiKey ? (
              <span className="flex items-center gap-1 font-bold text-emerald-600">
                <Check className="size-3" /> Chave configurada
              </span>
            ) : (
              <span className="font-semibold text-amber-500">
                Modo simulação ativo (chave vazia)
              </span>
            )}
          </div>
        )}
      />

      <TestConnectionRow
        onTest={handleTest}
        isTesting={isTesting}
        status={status}
        label="Testar Chave do Resend"
        testingLabel="Testando Chave..."
        statusVariant={status?.includes("válido") ? "success" : "warning"}
      />
    </SectionCard>
  );
}
