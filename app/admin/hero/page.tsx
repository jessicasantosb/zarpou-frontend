"use client";

import { Check, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { HeroBackgroundSection } from "./_components/hero-background-section";
import { HeroCtaSection } from "./_components/hero-cta-section";
import { HeroHeader } from "./_components/hero-header";
import { HeroPreviewCard } from "./_components/hero-preview-card";
import { HeroTextsSection } from "./_components/hero-texts-section";
import { useHero } from "./_hooks/use-hero";

export default function AdminHeroPage() {
  const { mounted, saved, isSaving, form, onSubmit, onReset, onClearTexts } =
    useHero();

  if (!mounted) {
    return (
      <div className="p-12 text-center text-muted-foreground text-xs">
        Carregando configurações do Hero...
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6 pb-16">
      <HeroHeader isSaving={isSaving} onReset={onReset} />

      {saved && (
        <div className="flex animate-in items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-bold text-emerald-800 fade-in">
          <Check className="size-4 text-emerald-600" />
          Hero atualizado com sucesso! As alterações já estão visíveis na
          página inicial.
        </div>
      )}

      <HeroPreviewCard form={form} />

      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-6 text-xs">
          <HeroTextsSection form={form} onClearTexts={onClearTexts} />
          <HeroBackgroundSection form={form} />
          <HeroCtaSection form={form} />

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              disabled={isSaving}
              className="h-auto cursor-pointer rounded-xl bg-secondary px-8 py-3.5 text-sm font-black text-primary   transition hover:scale-102 hover:bg-secondary/90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Salvando alterações...
                </>
              ) : (
                <>
                  <Save className="size-4" />
                  Salvar Alterações do Hero
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
