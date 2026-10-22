import { z } from "zod";
import { DestinationItem } from "@/types/destination";
import { Flight, Hotel } from "@/types/product";
import { Promotion } from "@/types/promotion";

export const promotionFormSchema = z.object({
  title: z.string().trim().min(1, "Informe o título da promoção."),
  subtitle: z.string(),
  badge: z.string(),
  discountText: z.string(),
  associationType: z.string(),
  selectedHotelId: z.string(),
  selectedFlightId: z.string(),
  selectedDestinationId: z.string(),
  link: z.string().min(1, "Informe o link de destino."),
  buttonText: z.string(),
  notifySubscribers: z.boolean(),
  imageUrl: z.string(),
});

export type PromotionFormValues = z.infer<typeof promotionFormSchema>;

export interface PromotionFormContext {
  hotels: Hotel[];
  flights: Flight[];
  destinations: DestinationItem[];
}

export const buildPromotionFormValues = (
  promo: Promotion | undefined,
  context: PromotionFormContext,
): PromotionFormValues => {
  if (!promo) {
    return {
      title: "",
      subtitle: "",
      badge: "OFERTA EXCLUSIVA",
      discountText: "Até 30% OFF",
      associationType: "",
      selectedHotelId: "",
      selectedFlightId: "",
      selectedDestinationId: "",
      link: "",
      buttonText: "Aproveitar Oferta",
      notifySubscribers: true,
      imageUrl: "",
    };
  }

  const currentLink = promo.link || "/hospedagens";
  const base = {
    title: promo.title || "",
    subtitle: promo.subtitle || "",
    badge: promo.badge || "OFERTA EXCLUSIVA",
    discountText: promo.discountText || "",
    link: currentLink,
    buttonText: promo.buttonText || "Aproveitar Oferta",
    imageUrl: promo.imageUrl || "",
    notifySubscribers: false,
  };

  if (currentLink.includes("/passagens")) {
    const matchedFlight = context.flights.find((flight) =>
      currentLink
        .toLowerCase()
        .includes(flight.outbound.destinationCity.toLowerCase()),
    );

    return {
      ...base,
      associationType: "flight",
      selectedHotelId: "",
      selectedFlightId: matchedFlight ? matchedFlight.id : "",
      selectedDestinationId: "",
    };
  }

  if (currentLink.includes("/destinos")) {
    const matchedDestination = context.destinations.find(
      (destination) =>
        currentLink
          .toLowerCase()
          .includes(encodeURIComponent(destination.title).toLowerCase()) ||
        currentLink.toLowerCase().includes(destination.title.toLowerCase()),
    );

    return {
      ...base,
      associationType: "destination",
      selectedHotelId: "",
      selectedFlightId: "",
      selectedDestinationId: matchedDestination ? matchedDestination.id : "",
    };
  }

  const matchedHotel = context.hotels.find((hotel) =>
    currentLink.includes(hotel.id),
  );

  return {
    ...base,
    associationType: "hotel",
    selectedHotelId: matchedHotel ? matchedHotel.id : "",
    selectedFlightId: "",
    selectedDestinationId: "",
  };
};
