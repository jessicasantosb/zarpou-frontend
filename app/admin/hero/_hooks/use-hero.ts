"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useConfirm } from "@/components/shared/confirm-dialog-provider";
import {
  buildHeroConfigDefaults,
  heroConfigSchema,
  type HeroConfigFormValues,
} from "@/schemas/hero-config";
import { useHeroStore } from "@/stores/hero-store";

export function useHero() {
  const { hero, updateHero, resetHero, fetchHero } = useHeroStore();
  const { confirm } = useConfirm();

  const [mounted, setMounted] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<HeroConfigFormValues>({
    resolver: zodResolver(heroConfigSchema),
    defaultValues: buildHeroConfigDefaults(hero),
  });

  useEffect(() => {
    fetchHero();
  }, [fetchHero]);

  useEffect(() => {
    setMounted(true);
    form.reset(buildHeroConfigDefaults(hero));
  }, [hero, form]);

  const showSavedFeedback = (delay: number) => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), delay);
  };

  const onSubmit = form.handleSubmit(async (values) => {
    setIsSaving(true);
    try {
      await Promise.all([
        updateHero(values),
        new Promise((resolve) => setTimeout(resolve, 350)),
      ]);
      toast.success("Alterações do Hero salvas com sucesso!");
      showSavedFeedback(3000);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Ocorreu um erro ao salvar o Hero.";
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  });

  const onReset = useCallback(async () => {
    const confirmed = await confirm({
      title: "Restaurar Hero Original",
      description:
        "Deseja restaurar as configurações originais do Hero da página inicial?",
      confirmText: "Restaurar",
      cancelText: "Cancelar",
      variant: "warning",
      icon: "warning",
    });
    if (!confirmed) return;

    setIsSaving(true);
    try {
      resetHero();
      const fresh = useHeroStore.getState().hero;
      form.reset(buildHeroConfigDefaults(fresh));
      await updateHero(fresh);
      toast.success("Hero restaurado para o padrão original!");
      showSavedFeedback(2500);
    } catch {
      toast.error("Erro ao restaurar o Hero.");
    } finally {
      setIsSaving(false);
    }
  }, [confirm, form, resetHero, updateHero]);

  const onClearTexts = useCallback(() => {
    form.setValue("titlePrefix", "");
    form.setValue("titleHighlight", "");
    form.setValue("titleSuffix", "");
    form.setValue("subtitle", "");
    toast.info("Campos de texto limpos. Clique em Salvar para aplicar.");
  }, [form]);

  return {
    mounted,
    saved,
    isSaving,
    form,
    onSubmit,
    onReset,
    onClearTexts,
  };
}
