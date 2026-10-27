"use client";

import { Check, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { AiChatSection } from "./_components/ai-chat-section";
import { CompanySection } from "./_components/company-section";
import { ConfiguracoesHeader } from "./_components/configuracoes-header";
import { ContactChannelsSection } from "./_components/contact-channels-section";
import { LegalSection } from "./_components/legal-section";
import { PaymentSection } from "./_components/payment-section";
import { ResendSection } from "./_components/resend-section";
import { SocialSection } from "./_components/social-section";
import { StorageSection } from "./_components/storage-section";
import { WhatsappSection } from "./_components/whatsapp-section";
import { useConfiguracoes } from "./_hooks/use-configuracoes";

export default function AdminConfiguracoesPage() {
  const { mounted, isLoading, saved, isSaving, form, onSubmit, onReset } =
    useConfiguracoes();

  if (!mounted) {
    return (
      <div className="p-12 text-center text-muted-foreground text-xs">
        Carregando configurações...
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6 pb-16">
      <ConfiguracoesHeader
        isLoading={isLoading}
        isSaving={isSaving}
        onReset={onReset}
      />

      {saved && (
        <div className="flex animate-in items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-bold text-emerald-800 fade-in">
          <Check className="size-4 text-emerald-600" />
          Configurações e credenciais de API salvas com sucesso! As alterações
          já estão ativas no sistema.
        </div>
      )}

      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-6">
          <CompanySection control={form.control} />
          <WhatsappSection control={form.control} />
          <PaymentSection control={form.control} />
          <ResendSection control={form.control} />
          <AiChatSection control={form.control} />
          <StorageSection control={form.control} />
          <ContactChannelsSection control={form.control} />
          <SocialSection control={form.control} />
          <LegalSection control={form.control} />

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              disabled={isSaving}
              className="h-auto cursor-pointer rounded-xl bg-secondary px-8 py-3.5 text-sm font-black text-primary   transition hover:scale-102 hover:bg-secondary/90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Salvando configurações...
                </>
              ) : (
                <>
                  <Save className="size-4" />
                  Salvar Todas as Configurações
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
