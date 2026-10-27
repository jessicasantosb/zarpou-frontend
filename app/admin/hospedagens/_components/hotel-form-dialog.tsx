import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitErrorHandler } from "react-hook-form";
import { Check, Loader2, X } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import {
  buildHotelFormValues,
  hotelFormSchema,
  type HotelFormValues,
} from "@/schemas/hotel-form";
import { Hotel } from "@/types/product";
import { useProductStore } from "@/stores/product-store";
import type { HotelTabId } from "../_constants";
import { HotelAmenitiesTab } from "./hotel-amenities-tab";
import { HotelFormTabs } from "./hotel-form-tabs";
import { HotelGeneralTab } from "./hotel-general-tab";
import { HotelPhotosTab } from "./hotel-photos-tab";
import { HotelRoomsTab } from "./hotel-rooms-tab";

const HOTEL_ERROR_TABS: Record<string, HotelTabId> = {
  name: "geral",
  city: "geral",
  state: "geral",
  neighborhood: "geral",
  address: "geral",
  stars: "geral",
  badge: "geral",
  maxInstallments: "geral",
  rooms: "quartos",
  description: "fotos",
  imageUrl: "fotos",
  gallery: "fotos",
  amenities: "comodidades",
};

interface HotelFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hotel: Hotel | null;
}

export function HotelFormDialog({
  open,
  onOpenChange,
  hotel,
}: HotelFormDialogProps) {
  const { hotels, addHotel, updateHotel } = useProductStore();

  const [activeTab, setActiveTab] = useState<HotelTabId>("geral");
  const [isSaving, setIsSaving] = useState(false);

  const isEditing = Boolean(hotel);

  const form = useForm<HotelFormValues>({
    resolver: zodResolver(hotelFormSchema),
    defaultValues: buildHotelFormValues(hotel ?? undefined),
  });

  const roomsCount = form.watch("rooms").length;
  const amenitiesCount = form.watch("amenities").length;

  const handleError: SubmitErrorHandler<HotelFormValues> = (errors) => {
    const key = Object.keys(errors)[0];
    const tab = HOTEL_ERROR_TABS[key];
    if (tab) {
      setActiveTab(tab);
    }
  };

  const onSubmit = async (values: HotelFormValues) => {
    const lowestRoomPrice = Math.min(
      ...values.rooms.map((room) => room.pricePerNight),
    );
    const lowestOriginalPrice = values.rooms.some(
      (room) => room.originalPricePerNight,
    )
      ? Math.min(
          ...values.rooms
            .filter(
              (room) =>
                room.originalPricePerNight &&
                room.originalPricePerNight > room.pricePerNight,
            )
            .map((room) => room.originalPricePerNight!),
        )
      : undefined;

    const discount =
      lowestOriginalPrice && lowestOriginalPrice > lowestRoomPrice
        ? Math.round(
            ((lowestOriginalPrice - lowestRoomPrice) / lowestOriginalPrice) *
              100,
          )
        : 0;

    const completeGallery = [
      values.imageUrl,
      ...values.gallery.filter(
        (photo) => photo && photo !== values.imageUrl,
      ),
    ];

    const existingHotel = hotel
      ? hotels.find((item) => item.id === hotel.id)
      : null;

    const hotelData: Hotel = {
      id: hotel?.id ?? `hotel-${Date.now()}`,
      name: values.name,
      city: values.city,
      state: values.state,
      country: "Brasil",
      stars: values.stars,
      rating: existingHotel ? existingHotel.rating : 0,
      reviewCount: existingHotel ? existingHotel.reviewCount : 0,
      reviewLabel: existingHotel ? existingHotel.reviewLabel : "Excelente",
      address:
        values.address ||
        `${values.neighborhood}, ${values.city} - ${values.state}`,
      neighborhood: values.neighborhood,
      description: values.description,
      imageUrl: values.imageUrl,
      gallery: completeGallery,
      amenities: values.amenities,
      basePricePerNight: lowestRoomPrice,
      originalPricePerNight: lowestOriginalPrice,
      discountPercent: discount,
      maxInstallments: values.maxInstallments,
      badges: values.badge ? [values.badge] : [],
      featured: true,
      rooms: values.rooms,
    };

    setIsSaving(true);
    try {
      if (hotel) {
        await updateHotel(hotel.id, hotelData);
        toast.success("Hospedagem e quartos atualizados com sucesso!");
      } else {
        await addHotel(hotelData);
        toast.success("Nova hospedagem e quartos cadastrados com sucesso!");
      }
      onOpenChange(false);
    } catch {
      toast.error("Erro ao salvar hospedagem. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  const tabContent = {
    geral: <HotelGeneralTab form={form} />,
    quartos: <HotelRoomsTab form={form} />,
    fotos: <HotelPhotosTab form={form} />,
    comodidades: <HotelAmenitiesTab form={form} />,
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="grid max-h-[92vh] grid-rows-[auto_auto_minmax(0,1fr)_auto] gap-0 overflow-hidden rounded-3xl border-border bg-card p-0  sm:max-w-3xl"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-border/60 bg-card p-5 pb-3">
          <div>
            <DialogTitle className="text-lg font-extrabold text-foreground">
              {hotel ? "Editar Hospedagem & Quartos" : "Cadastrar Nova Hospedagem"}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Configure os dados exibidos na listagem e na tela de detalhes do
              hotel (/hospedagens/item)
            </DialogDescription>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            title="Fechar"
            className="cursor-pointer rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground/80"
          >
            <X className="size-5" />
          </Button>
        </div>

        <HotelFormTabs
          activeTab={activeTab}
          roomsCount={roomsCount}
          amenitiesCount={amenitiesCount}
          onChange={setActiveTab}
        />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, handleError)}
            className="flex min-h-0 flex-col overflow-hidden"
          >
            <div className="flex-1 space-y-5 overflow-y-auto p-6">
              {tabContent[activeTab]}
            </div>

            <div className="flex shrink-0 items-center justify-between border-t border-border/60 bg-card p-5 pt-3">
              <div className="hidden text-xs font-medium text-muted-foreground sm:block">
                {roomsCount}{" "}
                {roomsCount === 1
                  ? "quarto configurado"
                  : "quartos configurados"}
              </div>

              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => onOpenChange(false)}
                  className="h-auto cursor-pointer rounded-xl px-5 py-2.5 text-xs font-bold text-foreground/70 hover:bg-muted"
                >
                  Cancelar
                </Button>

                <Button
                  type="submit"
                  disabled={isSaving}
                  className="h-auto cursor-pointer rounded-xl bg-primary px-6 py-2.5 text-xs font-bold text-white  hover:bg-primary/90 disabled:opacity-60"
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
                      : "Criar Hospedagem"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
