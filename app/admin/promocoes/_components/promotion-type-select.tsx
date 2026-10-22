import type { UseFormReturn } from "react-hook-form";
import { Building, MapPin, Plane, Sparkles, Tag } from "lucide-react";
import { toast } from "react-toastify";
import type { DestinationItem } from "@/types/destination";
import type { PromotionFormValues } from "@/schemas/promotion-form";
import { Flight, Hotel } from "@/types/product";

const SELECT_CLASS =
  "w-full h-11 px-3.5 rounded-xl border border-input text-xs font-semibold outline-hidden focus:border-primary bg-card cursor-pointer";

const USE_DATA_BUTTON_CLASS =
  "text-primary hover:underline font-bold flex items-center gap-1 cursor-pointer";

interface PromotionTypeSelectProps {
  form: UseFormReturn<PromotionFormValues>;
  hotels: Hotel[];
  flights: Flight[];
  destinations: DestinationItem[];
}

export function PromotionTypeSelect({
  form,
  hotels,
  flights,
  destinations,
}: PromotionTypeSelectProps) {
  const associationType = form.watch("associationType");
  const selectedHotelId = form.watch("selectedHotelId");
  const selectedFlightId = form.watch("selectedFlightId");
  const selectedDestinationId = form.watch("selectedDestinationId");

  const handleAssociationTypeChange = (newType: string) => {
    form.setValue("associationType", newType);
    form.setValue("selectedHotelId", "");
    form.setValue("selectedFlightId", "");
    form.setValue("selectedDestinationId", "");
    if (newType === "hotel") {
      form.setValue("link", "/hospedagens");
    } else if (newType === "flight") {
      form.setValue("link", "/passagens");
    } else if (newType === "destination") {
      form.setValue("link", "/destinos");
    } else {
      form.setValue("link", "");
    }
  };

  const handleSelectHotel = (hotelId: string) => {
    form.setValue("selectedHotelId", hotelId);
    if (!hotelId) return;

    const hotel = hotels.find((item) => item.id === hotelId);
    if (hotel) {
      form.setValue("link", `/hospedagens/${hotel.id}`);

      const currentImage = form.getValues("imageUrl");
      if (!currentImage && hotel.imageUrl) {
        form.setValue("imageUrl", hotel.imageUrl);
      }

      const currentTitle = form.getValues("title");
      if (!currentTitle || currentTitle.trim() === "") {
        form.setValue("title", `${hotel.name} - ${hotel.city}`);
      }

      const currentSubtitle = form.getValues("subtitle");
      if (!currentSubtitle || currentSubtitle.trim() === "") {
        form.setValue(
          "subtitle",
          `Hospedagem em ${hotel.city}, ${hotel.state} com diárias a partir de R$ ${hotel.basePricePerNight}.`,
        );
      }
    }
  };

  const handleSelectFlight = (flightId: string) => {
    form.setValue("selectedFlightId", flightId);
    if (!flightId) return;

    const flight = flights.find((item) => item.id === flightId);
    if (flight) {
      form.setValue(
        "link",
        `/passagens?destination=${encodeURIComponent(flight.outbound.destinationCity)}`,
      );

      const currentImage = form.getValues("imageUrl");
      if (!currentImage && flight.imageUrl) {
        form.setValue("imageUrl", flight.imageUrl);
      }

      const currentTitle = form.getValues("title");
      if (!currentTitle || currentTitle.trim() === "") {
        form.setValue(
          "title",
          `Voo para ${flight.outbound.destinationCity} (${flight.outbound.destinationIata})`,
        );
      }

      const currentSubtitle = form.getValues("subtitle");
      if (!currentSubtitle || currentSubtitle.trim() === "") {
        form.setValue(
          "subtitle",
          `Passagem ${flight.outbound.airline} saindo de ${flight.outbound.originCity} a partir de R$ ${flight.price.toLocaleString("pt-BR")}.`,
        );
      }

      if (flight.discountPercent && flight.discountPercent > 0) {
        form.setValue("discountText", `${flight.discountPercent}% OFF`);
      }
    }
  };

  const handleSelectDestination = (destinationId: string) => {
    form.setValue("selectedDestinationId", destinationId);
    if (!destinationId) return;

    const destination = destinations.find((item) => item.id === destinationId);
    if (destination) {
      form.setValue(
        "link",
        `/destinos?cidade=${encodeURIComponent(destination.title)}`,
      );

      const currentImage = form.getValues("imageUrl");
      if (!currentImage && destination.image_url) {
        form.setValue("imageUrl", destination.image_url);
      }

      const currentTitle = form.getValues("title");
      if (!currentTitle || currentTitle.trim() === "") {
        form.setValue(
          "title",
          `Descubra ${destination.title} - ${destination.country}`,
        );
      }

      const currentSubtitle = form.getValues("subtitle");
      if (!currentSubtitle || currentSubtitle.trim() === "") {
        form.setValue(
          "subtitle",
          destination.description ||
            `Pacotes completos e roteiros selecionados em ${destination.title}.`,
        );
      }
    }
  };

  const handleUseHotelData = () => {
    const hotel = hotels.find((item) => item.id === selectedHotelId);
    if (hotel) {
      if (hotel.imageUrl) form.setValue("imageUrl", hotel.imageUrl);
      form.setValue("title", `${hotel.name} - ${hotel.city}`);
      form.setValue(
        "subtitle",
        `Hospedagem em ${hotel.city}, ${hotel.state} a partir de R$ ${hotel.basePricePerNight}/noite.`,
      );
      toast.info("Dados e foto do hotel preenchidos no formulário!");
    }
  };

  const handleUseFlightData = () => {
    const flight = flights.find((item) => item.id === selectedFlightId);
    if (flight) {
      if (flight.imageUrl) form.setValue("imageUrl", flight.imageUrl);
      form.setValue(
        "title",
        `Voo para ${flight.outbound.destinationCity} (${flight.outbound.destinationIata})`,
      );
      form.setValue(
        "subtitle",
        `Passagem ${flight.outbound.airline} saindo de ${flight.outbound.originCity} a partir de R$ ${flight.price.toLocaleString("pt-BR")}.`,
      );
      if (flight.discountPercent) {
        form.setValue("discountText", `${flight.discountPercent}% OFF`);
      }
      toast.info("Dados e foto do voo preenchidos no formulário!");
    }
  };

  const handleUseDestinationData = () => {
    const destination = destinations.find(
      (item) => item.id === selectedDestinationId,
    );
    if (destination) {
      if (destination.image_url) {
        form.setValue("imageUrl", destination.image_url);
      }
      form.setValue(
        "title",
        `Descubra ${destination.title} - ${destination.country}`,
      );
      form.setValue(
        "subtitle",
        destination.description ||
          `Pacotes completos e roteiros selecionados em ${destination.title}.`,
      );
      toast.info("Dados e foto do destino preenchidos no formulário!");
    }
  };

  return (
    <div className="space-y-3 p-3.5 bg-muted/80 rounded-2xl border border-border">
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="font-bold text-foreground flex items-center gap-1.5 text-xs">
            <Tag className="size-4 text-primary" />
            Tipo de Oferta (Vincular Promoção a) *
          </label>
          {(selectedHotelId || selectedFlightId || selectedDestinationId) && (
            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              ✓ Item Vinculado com Sucesso
            </span>
          )}
        </div>

        <select
          value={associationType}
          onChange={(event) => handleAssociationTypeChange(event.target.value)}
          className={SELECT_CLASS}
        >
          <option value="">Selecione o tipo de oferta...</option>
          <option value="hotel">🏨 Hospedagem (Hotel / Resort)</option>
          <option value="flight">✈️ Passagem Aérea (Voo Internacional)</option>
          <option value="destination">
            📍 Destino Turístico (Cidade / Pacotes)
          </option>
        </select>
      </div>

      {associationType === "hotel" && (
        <div className="space-y-1.5 animate-in fade-in slide-in-from-top-1">
          <label className="font-bold text-foreground/80 text-[11px] flex items-center gap-1">
            <Building className="size-3.5 text-primary" />
            Selecione o Hotel *
          </label>
          <select
            value={selectedHotelId}
            onChange={(event) => handleSelectHotel(event.target.value)}
            className={SELECT_CLASS}
          >
            <option value="">Selecione um hotel cadastrado...</option>
            {hotels.map((hotel) => (
              <option key={hotel.id} value={hotel.id}>
                {hotel.name} — {hotel.city}, {hotel.state} (R${" "}
                {hotel.basePricePerNight}/noite)
              </option>
            ))}
          </select>

          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span>
              Encaminhará para a página detalhada do hotel selecionado.
            </span>
            {selectedHotelId && (
              <button
                type="button"
                onClick={handleUseHotelData}
                className={USE_DATA_BUTTON_CLASS}
              >
                <Sparkles className="size-3 text-secondary fill-secondary" />
                Usar foto e título do hotel
              </button>
            )}
          </div>
        </div>
      )}

      {associationType === "flight" && (
        <div className="space-y-1.5 animate-in fade-in slide-in-from-top-1">
          <label className="font-bold text-foreground/80 text-[11px] flex items-center gap-1">
            <Plane className="size-3.5 text-primary" />
            Selecione a Passagem Aérea *
          </label>
          <select
            value={selectedFlightId}
            onChange={(event) => handleSelectFlight(event.target.value)}
            className={SELECT_CLASS}
          >
            <option value="">
              Selecione um voo internacional cadastrado...
            </option>
            {flights.map((flight) => (
              <option key={flight.id} value={flight.id}>
                {flight.outbound.originIata} → {flight.outbound.destinationIata}{" "}
                ({flight.outbound.destinationCity}) — R${" "}
                {flight.price.toLocaleString("pt-BR")} (
                {flight.outbound.airline})
              </option>
            ))}
          </select>

          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span>Encaminhará para o catálogo de passagens aéreas.</span>
            {selectedFlightId && (
              <button
                type="button"
                onClick={handleUseFlightData}
                className={USE_DATA_BUTTON_CLASS}
              >
                <Sparkles className="size-3 text-secondary fill-secondary" />
                Usar foto e título do voo
              </button>
            )}
          </div>
        </div>
      )}

      {associationType === "destination" && (
        <div className="space-y-1.5 animate-in fade-in slide-in-from-top-1">
          <label className="font-bold text-foreground/80 text-[11px] flex items-center gap-1">
            <MapPin className="size-3.5 text-primary" />
            Selecione o Destino Turístico *
          </label>
          <select
            value={selectedDestinationId}
            onChange={(event) => handleSelectDestination(event.target.value)}
            className={SELECT_CLASS}
          >
            <option value="">
              Selecione um destino ou cidade cadastrada...
            </option>
            {destinations.map((destination) => (
              <option key={destination.id} value={destination.id}>
                {destination.flag ?? ""} {destination.title} —{" "}
                {destination.country} (A partir de R${" "}
                {destination.startingPrice})
              </option>
            ))}
          </select>

          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span>
              Encaminhará para os pacotes e roteiros do destino selecionado.
            </span>
            {selectedDestinationId && (
              <button
                type="button"
                onClick={handleUseDestinationData}
                className={USE_DATA_BUTTON_CLASS}
              >
                <Sparkles className="size-3 text-secondary fill-secondary" />
                Usar foto e título do destino
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
