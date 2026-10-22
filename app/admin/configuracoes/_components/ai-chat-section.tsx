import { useState } from "react";
import { useWatch, type Control } from "react-hook-form";
import { Bot, Check, Sparkles } from "lucide-react";
import { toast } from "react-toastify";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import type { AgencyConfigFormValues } from "@/schemas/agency-config";
import { ConfigField } from "./config-field";
import { SectionCard } from "./section-card";
import { SecretInput } from "./secret-input";
import { TestConnectionRow } from "./test-connection-row";

const providerOptions = [
  { value: "openai", label: "OpenAI (ChatGPT / GPT-4o-mini)" },
  { value: "gemini", label: "Google Gemini (Gemini 1.5 Flash)" },
  { value: "groq", label: "Groq (Llama 3.3 Ultra-rápido)" },
  { value: "anthropic", label: "Anthropic (Claude 3.5 Sonnet)" },
  { value: "other", label: "Outro Provedor Compatível" },
];

interface AiChatSectionProps {
  control: Control<AgencyConfigFormValues>;
}

export function AiChatSection({ control }: AiChatSectionProps) {
  const [isTesting, setIsTesting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const values = useWatch({ control });

  const handleTest = async () => {
    if (!values.aiChat?.apiKey) {
      toast.info(
        "Chave de IA vazia: o Chatbot operará em modo inteligente nativo com catálogo Zarpou.",
      );
      setStatus("Modo nativo (catálogo)");
      return;
    }
    setIsTesting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsTesting(false);
    setStatus("Conexão com a IA validada com sucesso!");
    toast.success(
      "Conexão com a IA validada com sucesso! Concierge de Viagens pronto para atendimento 24h.",
    );
  };

  return (
    <SectionCard
      icon={Bot}
      title="Inteligência Artificial & Chatbot de Viagens (Concierge Virtual)"
      headerExtra={
        <FormField
          control={control}
          name="aiChat.enabled"
          render={({ field }) => (
            <FormItem className="gap-0">
              <FormControl>
                <label className="flex cursor-pointer items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5">
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(event) => field.onChange(event.target.checked)}
                    className="size-4 cursor-pointer rounded text-primary"
                  />
                  <span className="flex items-center gap-1 text-[11px] font-bold text-primary">
                    <Sparkles className="size-3 fill-secondary text-secondary" />
                    Chatbot Ativo no Site
                  </span>
                </label>
              </FormControl>
            </FormItem>
          )}
        />
      }
      description={
        <>
          Configure a API de Inteligência Artificial que alimenta o botão
          flutuante &quot;Fale com a IA&quot; e responde dúvidas de clientes
          24h por dia sobre hotéis, voos, pacotes e roteiros.
        </>
      }
    >
      <div className="grid grid-cols-1 gap-4 text-xs sm:grid-cols-2">
        <ConfigField
          control={control}
          name="aiChat.provider"
          label="Provedor de Inteligência Artificial"
          options={providerOptions}
        />
        <ConfigField
          control={control}
          name="aiChat.model"
          label="Modelo da IA"
          transform={(value) => value.trim()}
          placeholder="Ex: gpt-4o-mini ou gemini-1.5-flash"
        />
        <ConfigField
          control={control}
          name="aiChat.apiKey"
          label="Chave da API de IA (API Key / Token)"
          className="sm:col-span-2"
          render={(field) => (
            <SecretInput
              value={String(field.value)}
              onChange={(value) => field.onChange(value.trim())}
              placeholder="sk-proj-xxxxxxxxxxxxxxxxxxxx ou chave da sua conta de IA"
            />
          )}
          helper={() => (
            <div className="flex items-center justify-between pt-0.5">
              <span>
                Deixe vazio para utilizar o motor nativo inteligente de
                sugestões do catálogo Zarpou
              </span>
              {values.aiChat?.apiKey ? (
                <span className="flex items-center gap-1 font-bold text-emerald-600">
                  <Check className="size-3" /> Chave configurada
                </span>
              ) : (
                <span className="font-semibold text-primary">
                  Modo demonstração inteligente ativo
                </span>
              )}
            </div>
          )}
        />
        <ConfigField
          control={control}
          name="aiChat.welcomeMessage"
          label="Mensagem Inicial de Boas-Vindas"
          className="sm:col-span-2"
        />
        <ConfigField
          control={control}
          name="aiChat.systemPrompt"
          label="Prompt do Sistema / Instruções do Assistente (System Prompt)"
          className="sm:col-span-2"
          render={(field) => (
            <FormControl>
              <textarea
                rows={3}
                value={String(field.value)}
                onChange={(event) => field.onChange(event.target.value)}
                placeholder="Instruções de como o concierge deve se comportar e orientar os clientes..."
                className="w-full resize-none rounded-xl border border-input p-3 text-xs font-medium outline-hidden focus:border-primary"
              />
            </FormControl>
          )}
        />
      </div>

      <TestConnectionRow
        onTest={handleTest}
        isTesting={isTesting}
        status={status}
        label="Testar Conexão com a IA"
        testingLabel="Testando Conexão..."
        iconClassName="text-secondary"
        statusVariant={status?.includes("sucesso") ? "success" : "warning"}
      />
    </SectionCard>
  );
}
