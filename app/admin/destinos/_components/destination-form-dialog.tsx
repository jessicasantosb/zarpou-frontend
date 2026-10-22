import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitErrorHandler } from "react-hook-form";
import { Check, Compass, Loader2, X } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { DestinationItem } from "@/types/destination";
import {
  buildDestinationFormValues,
  destinationFormSchema,
  DESTINATION_DEFAULT_IMAGE,
  type DestinationFormValues,
} from "@/schemas/destination-form";
import { useDestinationStore } from "@/stores/destination-store";
import { DESTINATION_TABS, type DestinationTabId } from "../_constants";
import { DestinationFormTabs } from "./destination-form-tabs";
import { DetailsTab } from "./details-tab";
import { LocationTab } from "./location-tab";
import { MediaTab } from "./media-tab";
import { PricingTab } from "./pricing-tab";

const FIELD_TABS: Array<[keyof DestinationFormValues, DestinationTabId]> = [
  ["title", "location"],
  ["country", "location"],
  ["state", "location"],
  ["flag", "location"],
  ["category", "location"],
  ["tag", "location"],
  ["description", "details"],
  ["bestTimeToVisit", "details"],
  ["highlights", "details"],
  ["startingPrice", "pricing"],
  ["accommodationsCount", "pricing"],
  ["link", "pricing"],
  ["image_url", "media"],
];

interface DestinationFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  destination: DestinationItem | null;
}

export function DestinationFormDialog({
  open,
  onOpenChange,
  destination,
}: DestinationFormDialogProps) {
  const { addDestination, updateDestination } = useDestinationStore();

  const [activeTab, setActiveTab] = useState<DestinationTabId>("location");
  const [isSaving, setIsSaving] = useState(false);

  const isEditing = Boolean(destination);

  const form = useForm<DestinationFormValues>({
    resolver: zodResolver(destinationFormSchema),
    defaultValues: buildDestinationFormValues(destination ?? undefined),
  });

  const handleError: SubmitErrorHandler<DestinationFormValues> = (errors) => {
    const match = FIELD_TABS.find(([field]) => errors[field]);
    if (match) {
      setActiveTab(match[1]);
    }
  };

  const onSubmit = async (values: DestinationFormValues) => {
    const payload: DestinationItem = {
      id: destination?.id ?? `dest-${Date.now()}`,
      title: values.title,
      country: values.country || "Brasil",
      state: values.state || undefined,
      flag: values.flag || "✈️",
      category: values.category,
      tag: values.tag || "Destaque Zarpou",
      description: values.description,
      startingPrice: Number(values.startingPrice) || 0,
      accommodationsCount: Number(values.accommodationsCount) || 0,
      link:
        values.link || `/hospedagens?city=${encodeURIComponent(values.title)}`,
      image_url: values.image_url || DESTINATION_DEFAULT_IMAGE,
      bestTimeToVisit: values.bestTimeToVisit || undefined,
      highlights: values.highlights.filter(Boolean),
    };

    setIsSaving(true);
    try {
      if (destination) {
        await updateDestination(destination.id, payload);
        toast.success("Destino atualizado com sucesso!");
      } else {
        await addDestination(payload);
        toast.success("Novo destino cadastrado com sucesso!");
      }
      onOpenChange(false);
    } catch {
      toast.error("Erro ao salvar o destino. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  const tabContent = {
    location: <LocationTab form={form} isEditing={isEditing} />,
    details: <DetailsTab form={form} />,
    pricing: <PricingTab form={form} />,
    media: <MediaTab form={form} />,
  };

  const activeIndex = DESTINATION_TABS.findIndex((tab) => tab.id === activeTab);
  const previousTab =
    activeIndex > 0 ? DESTINATION_TABS[activeIndex - 1].id : null;
  const nextTab =
    activeIndex < DESTINATION_TABS.length - 1
      ? DESTINATION_TABS[activeIndex + 1].id
      : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="grid max-h-[92vh] grid-rows-[auto_auto_minmax(0,1fr)] gap-0 overflow-hidden rounded-3xl border-border bg-card p-0 shadow-xl sm:max-w-3xl"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-border/60 bg-muted/70 p-5">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-primary text-secondary shadow-xs">
              <Compass className="size-5" />
            </div>
            <div>
              <DialogTitle className="text-base font-black text-foreground">
                {isEditing
                  ? "Editar Destino Turístico"
                  : "Cadastrar Novo Destino"}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Configure cidades, atrativos, melhor época para viajar, preços e
                fotos em alta definição
              </DialogDescription>
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            title="Fechar"
            className="size-8 cursor-pointer rounded-full border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground/70"
          >
            <X className="size-4" />
          </Button>
        </div>

        <DestinationFormTabs activeTab={activeTab} onChange={setActiveTab} />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, handleError)}
            className="min-h-0 space-y-6 overflow-y-auto p-6"
          >
            {tabContent[activeTab]}

            <div className="flex shrink-0 items-center justify-between border-t border-border/60 pt-4">
              <div className="flex items-center gap-2">
                {previousTab && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setActiveTab(previousTab)}
                    className="h-auto cursor-pointer rounded-xl bg-muted px-4 py-2 text-xs font-bold text-foreground/70 hover:bg-border"
                  >
                    ← Aba Anterior
                  </Button>
                )}
                {nextTab && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setActiveTab(nextTab)}
                    className="h-auto cursor-pointer rounded-xl bg-primary/10 px-4 py-2 text-xs font-bold text-primary hover:bg-primary/20"
                  >
                    Próxima Aba →
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => onOpenChange(false)}
                  className="h-auto cursor-pointer rounded-xl px-4 py-2 text-xs font-bold text-muted-foreground hover:bg-muted"
                >
                  Cancelar
                </Button>

                <Button
                  type="submit"
                  disabled={isSaving}
                  className="h-auto cursor-pointer rounded-xl bg-primary px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-primary/90 disabled:opacity-60"
                >
                  {isSaving ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Check className="size-4" />
                  )}
                  {isSaving
                    ? "Salvando..."
                    : isEditing
                      ? "Salvar Alterações"
                      : "Cadastrar Destino Completo"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
