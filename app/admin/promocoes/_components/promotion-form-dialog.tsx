import { zodResolver } from "@hookform/resolvers/zod";
import {
  useWatch,
  useForm,
  type SubmitErrorHandler,
} from "react-hook-form";
import { Tag, X } from "lucide-react";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ImageUploader } from "@/app/admin/_components/image-uploader";
import { api } from "@/lib/api";
import {
  buildPromotionFormValues,
  promotionFormSchema,
  type PromotionFormValues,
} from "@/schemas/promotion-form";
import { useDestinationStore } from "@/stores/destination-store";
import { useProductStore } from "@/stores/product-store";
import { usePromotionStore } from "@/stores/promotion-store";
import { Promotion } from "@/types/promotion";
import { PromotionField } from "./promotion-field";
import { PromotionNotificationCard } from "./promotion-notification-card";
import { PromotionPreviewCard } from "./promotion-preview-card";
import { PromotionTypeSelect } from "./promotion-type-select";

interface PromotionFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  promo: Promotion | null;
}

export function PromotionFormDialog({
  open,
  onOpenChange,
  promo,
}: PromotionFormDialogProps) {
  const { promotions, addPromotion, updatePromotion } = usePromotionStore();
  const { hotels, flights } = useProductStore();
  const { destinations } = useDestinationStore();

  const form = useForm<PromotionFormValues>({
    resolver: zodResolver(promotionFormSchema),
    defaultValues: buildPromotionFormValues(promo ?? undefined, {
      hotels,
      flights,
      destinations,
    }),
  });

  const watchedImageUrl = useWatch({ control: form.control, name: "imageUrl" }) ?? "";
  const watchedBadge = useWatch({ control: form.control, name: "badge" }) ?? "";
  const watchedDiscountText =
    useWatch({ control: form.control, name: "discountText" }) ?? "";
  const watchedTitle = useWatch({ control: form.control, name: "title" }) ?? "";
  const watchedSubtitle =
    useWatch({ control: form.control, name: "subtitle" }) ?? "";
  const watchedButtonText =
    useWatch({ control: form.control, name: "buttonText" }) ?? "";
  const watchedNotify =
    useWatch({ control: form.control, name: "notifySubscribers" }) ?? false;

  const handleError: SubmitErrorHandler<PromotionFormValues> = (errors) => {
    if (errors.title) {
      toast.warning("Informe o título da promoção.");
    }
  };

  const onSubmit = async (values: PromotionFormValues) => {
    if (!values.title.trim()) {
      toast.warning("Informe o título da promoção.");
      return;
    }

    if (!values.associationType) {
      toast.warning(
        "Por favor, selecione o tipo de oferta (Hospedagem, Passagem ou Destino).",
      );
      return;
    }

    if (
      values.associationType === "hotel" &&
      !values.selectedHotelId &&
      (!values.link || values.link === "/hospedagens")
    ) {
      toast.warning(
        "Por favor, selecione uma hospedagem cadastrada para vincular a esta promoção.",
      );
      return;
    }

    if (
      values.associationType === "flight" &&
      !values.selectedFlightId &&
      (!values.link || values.link === "/passagens")
    ) {
      toast.warning(
        "Por favor, selecione uma passagem aérea cadastrada para vincular a esta promoção.",
      );
      return;
    }

    if (
      values.associationType === "destination" &&
      !values.selectedDestinationId &&
      (!values.link || values.link === "/destinos")
    ) {
      toast.warning(
        "Por favor, selecione um destino turístico para vincular a esta promoção.",
      );
      return;
    }

    if (!values.imageUrl.trim()) {
      toast.error(
        "Por favor, selecione ou envie a imagem do banner da promoção.",
      );
      return;
    }

    try {
      if (promo) {
        const isAlreadySent = promo.notificationSent;
        const shouldTriggerNow = values.notifySubscribers && !isAlreadySent;

        await updatePromotion(promo.id, {
          title: values.title.trim(),
          subtitle: values.subtitle.trim(),
          badge: values.badge.trim(),
          discountText: values.discountText.trim(),
          imageUrl: values.imageUrl.trim(),
          link: values.link.trim(),
          buttonText: values.buttonText.trim(),
          ...(shouldTriggerNow
            ? {
                notificationSent: true,
                notificationSentAt: new Date().toISOString(),
              }
            : {}),
        });

        if (shouldTriggerNow) {
          api.post(`/promotions/${promo.id}/notify`).catch(() => {});
          toast.success(
            "Promoção atualizada e notificações disparadas aos clientes (WhatsApp e E-mail)!",
          );
        } else {
          toast.success("Promoção atualizada com sucesso!");
        }
      } else {
        await addPromotion({
          title: values.title.trim(),
          subtitle: values.subtitle.trim(),
          badge: values.badge.trim(),
          discountText: values.discountText.trim(),
          imageUrl: values.imageUrl.trim(),
          link: values.link.trim(),
          buttonText: values.buttonText.trim(),
          active: true,
          order: promotions.length + 1,
          notificationSent: values.notifySubscribers,
          notificationSentAt: values.notifySubscribers
            ? new Date().toISOString()
            : undefined,
        });

        if (values.notifySubscribers) {
          toast.success(
            "Promoção criada com sucesso! Notificações enviadas aos viajantes inscritos.",
          );
        } else {
          toast.success("Promoção criada com sucesso!");
        }
      }

      onOpenChange(false);
    } catch (err: unknown) {
      console.error("Erro ao salvar promoção:", err);
      const msg =
        err instanceof Error
          ? err.message
          : "Erro ao salvar promoção no servidor.";
      toast.error(msg);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        aria-describedby={undefined}
        className="grid max-h-[90vh] grid-rows-[auto_minmax(0,1fr)] gap-0 overflow-hidden rounded-3xl border-border bg-card p-0  sm:max-w-xl"
      >
        <div className="flex items-center justify-between p-6 pb-4 border-b border-border/60 shrink-0 bg-card">
          <DialogTitle className="flex items-center gap-2 text-lg font-bold text-foreground">
            <Tag className="size-5 text-primary" />
            {promo ? "Editar Promoção" : "Adicionar Nova Promoção"}
          </DialogTitle>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="text-muted-foreground hover:text-foreground/80 font-bold p-1 rounded-lg hover:bg-muted transition cursor-pointer"
          >
            <X className="size-5" />
          </button>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, handleError)}
            className="flex min-h-0 flex-col overflow-hidden"
          >
            <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
              <PromotionTypeSelect
                form={form}
                hotels={hotels}
                flights={flights}
                destinations={destinations}
              />

              <PromotionField
                control={form.control}
                name="title"
                label="Título da Promoção"
                required
                placeholder="Ex: Semana Santa em Porto Seguro"
              />

              <PromotionField
                control={form.control}
                name="subtitle"
                label="Subtítulo / Descrição Curta"
                placeholder="Ex: Resorts com pensão completa e cancelamento grátis"
              />

              <div className="grid grid-cols-2 gap-3">
                <PromotionField
                  control={form.control}
                  name="badge"
                  label="Badge de Destaque"
                />
                <PromotionField
                  control={form.control}
                  name="discountText"
                  label="Texto de Desconto"
                />
              </div>

              <div className="pt-2 border-t border-border/60">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <ImageUploader
                        value={field.value}
                        onChange={field.onChange}
                        folder="promocoes"
                        label="Imagem do Banner da Promoção *"
                        description="Upload para o AWS S3 / Nuvem ou URL direta externa"
                        aspectRatio="banner"
                        recommendedResolution="Recomendado 1200x600 ou 1920x1080"
                      />
                    </FormItem>
                  )}
                />
              </div>

              {watchedImageUrl && (
                <PromotionPreviewCard
                  imageUrl={watchedImageUrl}
                  badge={watchedBadge}
                  discountText={watchedDiscountText}
                  title={watchedTitle}
                  subtitle={watchedSubtitle}
                  buttonText={watchedButtonText}
                />
              )}

              <div className="grid grid-cols-2 gap-3 pt-2">
                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem className="gap-0 space-y-1">
                      <FormLabel
                        required
                        className="font-bold text-foreground/80"
                      >
                        Link de Destino
                      </FormLabel>
                      <FormControl>
                        <input
                          type="text"
                          name={field.name}
                          ref={field.ref}
                          onBlur={field.onBlur}
                          value={String(field.value ?? "")}
                          placeholder="/hospedagens/hotel-..."
                          onChange={(event) => {
                            const value = event.target.value;
                            field.onChange(value);
                            const matched = hotels.find((hotel) =>
                              value.includes(hotel.id),
                            );
                            form.setValue(
                              "selectedHotelId",
                              matched ? matched.id : "",
                            );
                          }}
                          className="w-full h-11 px-3.5 rounded-xl border border-input text-xs font-mono font-medium outline-hidden focus:border-primary bg-muted"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />

                <PromotionField
                  control={form.control}
                  name="buttonText"
                  label="Texto do Botão"
                />
              </div>

              <PromotionNotificationCard
                alreadySent={promo?.notificationSent ?? false}
                checked={watchedNotify}
                onCheckedChange={(checked) =>
                  form.setValue("notifySubscribers", checked)
                }
              />
            </div>

            <div className="p-6 pt-4 border-t border-border/60 flex items-center justify-end gap-3 shrink-0 bg-card">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="px-4 py-2.5 rounded-xl border border-input text-foreground/70 font-semibold hover:bg-muted transition cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition  cursor-pointer"
              >
                {promo ? "Salvar Alterações" : "Publicar Promoção"}
              </button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
