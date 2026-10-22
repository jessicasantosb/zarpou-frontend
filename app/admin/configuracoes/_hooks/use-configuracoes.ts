"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useConfirm } from "@/components/shared/confirm-dialog-provider";
import {
  agencyConfigSchema,
  buildAgencyConfigDefaults,
  type AgencyConfigFormValues,
} from "@/schemas/agency-config";
import { useConfigStore } from "@/stores/config-store";

export function useConfiguracoes() {
  const { config, updateConfig, resetConfig, fetchConfig, isLoading } =
    useConfigStore();
  const { confirm } = useConfirm();

  const [mounted, setMounted] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<AgencyConfigFormValues>({
    resolver: zodResolver(agencyConfigSchema),
    defaultValues: buildAgencyConfigDefaults(config),
  });

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  useEffect(() => {
    setMounted(true);
    form.reset(buildAgencyConfigDefaults(config));
  }, [config, form]);

  const showSavedFeedback = (delay: number) => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), delay);
  };

  const onSubmit = form.handleSubmit(async (values) => {
    setIsSaving(true);
    try {
      await Promise.all([
        updateConfig(values),
        new Promise((resolve) => setTimeout(resolve, 350)),
      ]);
      toast.success("Configurações salvas com sucesso!");
      showSavedFeedback(3500);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Ocorreu um erro ao salvar as configurações. Tente novamente.";
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  });

  const onReset = useCallback(async () => {
    const confirmed = await confirm({
      title: "Restaurar Configurações Originais",
      description:
        "Deseja restaurar as configurações originais da Zarpou para o padrão inicial?",
      confirmText: "Restaurar",
      cancelText: "Cancelar",
      variant: "warning",
      icon: "warning",
    });

    if (!confirmed) return;

    setIsSaving(true);
    try {
      resetConfig();
      const fresh = useConfigStore.getState().config;
      form.reset(buildAgencyConfigDefaults(fresh));
      await updateConfig(fresh);
      toast.success("Configurações restauradas para o padrão!");
      showSavedFeedback(2500);
    } catch {
      toast.error("Erro ao restaurar as configurações.");
    } finally {
      setIsSaving(false);
    }
  }, [confirm, form, resetConfig, updateConfig]);

  return {
    mounted,
    isLoading,
    saved,
    isSaving,
    form,
    onSubmit,
    onReset,
  };
}
