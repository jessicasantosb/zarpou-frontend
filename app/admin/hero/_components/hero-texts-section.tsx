import type { UseFormReturn } from "react-hook-form";
import { Sparkles } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import type { HeroConfigFormValues } from "@/schemas/hero-config";
import { HeroField } from "./hero-field";
import { HeroSectionCard } from "./hero-section-card";

interface HeroTextsSectionProps {
  form: UseFormReturn<HeroConfigFormValues>;
  onClearTexts: () => void;
}

export function HeroTextsSection({ form, onClearTexts }: HeroTextsSectionProps) {
  return (
    <HeroSectionCard
      icon={Sparkles}
      title="Títulos e Chamada Principal (Opcional)"
      headerExtra={
        <div className="flex items-center gap-3">
          <span className="hidden text-[11px] font-medium text-muted-foreground sm:inline">
            Deixe vazio para fundo limpo com botão na parte inferior da dobra
          </span>
          <button
            type="button"
            onClick={onClearTexts}
            title="Limpar todos os campos de texto do Hero"
            className="cursor-pointer rounded-lg border border-border px-2.5 py-1 text-[11px] font-bold text-foreground/70 transition hover:bg-destructive/20 hover:text-destructive"
          >
            Limpar Textos
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <HeroField
          control={form.control}
          name="titlePrefix"
          label="Início do Título (Prefixo - Opcional)"
          placeholder="Ex: Seu (ou deixe vazio)"
        />
        <HeroField
          control={form.control}
          name="titleHighlight"
          label="Palavra em Destaque (Opcional)"
          placeholder="Ex: sonho (ou deixe vazio)"
          inputClassName="border-secondary/70 bg-secondary/5 font-bold text-foreground focus:border-secondary"
        />
        <HeroField
          control={form.control}
          name="titleSuffix"
          label="Final do Título (Sufixo - Opcional)"
          placeholder="Ex: de viajar bem... (ou deixe vazio)"
        />
      </div>

      <FormField
        control={form.control}
        name="subtitle"
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel className="text-xs font-bold text-foreground/80">
              Subtítulo / Descrição Explicativa (Opcional)
            </FormLabel>
            <FormControl>
              <textarea
                rows={3}
                value={String(field.value ?? "")}
                onBlur={field.onBlur}
                onChange={(event) => field.onChange(event.target.value)}
                placeholder="Digite a descrição da agência ou deixe em branco para manter a imagem limpa..."
                className="w-full resize-none rounded-xl border border-input p-3.5 text-xs font-medium leading-relaxed outline-hidden focus:border-primary"
              />
            </FormControl>
          </FormItem>
        )}
      />
    </HeroSectionCard>
  );
}
