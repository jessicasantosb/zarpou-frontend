import Image from "next/image";
import {
  ArrowRight,
  Clock,
  Edit2,
  Luggage,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { FLIGHT_DEFAULT_IMAGE } from "@/schemas/flight-form";
import { Flight } from "@/types/product";

interface FlightCardProps {
  flight: Flight;
  onEdit: (flight: Flight) => void;
  onDelete: (flight: Flight) => void;
}

export function FlightCard({ flight, onEdit, onDelete }: FlightCardProps) {
  const installment = (
    flight.price / (flight.maxInstallments || 12)
  ).toFixed(2);
  const img = flight.imageUrl || FLIGHT_DEFAULT_IMAGE;

  return (
    <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-xs hover:shadow-md transition flex flex-col sm:flex-row items-stretch">
      <div className="relative w-full sm:w-52 h-48 sm:h-auto shrink-0 bg-muted self-stretch">
        <Image
          src={img}
          alt={flight.outbound.destinationCity}
          fill
          unoptimized={img.startsWith("data:")}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-foreground/30 pointer-events-none" />

        <div className="absolute top-2.5 left-2.5 bg-card/95 text-foreground text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
          <span>{flight.flag || "✈️"}</span>
          <span>{flight.country || "Exterior"}</span>
        </div>

        {flight.discountPercent && flight.discountPercent > 0 && (
          <div className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-md shadow-xs">
            {flight.discountPercent}% OFF
          </div>
        )}

        <div className="absolute bottom-2.5 left-2.5 text-white">
          <span className="text-[9px] uppercase font-bold text-secondary">
            {flight.isRoundTrip ? "Ida & Volta" : "Somente Ida"}
          </span>
          <h3 className="text-base font-black leading-tight drop-shadow-xs">
            {flight.outbound.destinationCity}
          </h3>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-border/60 pb-2">
            <div>
              <p className="text-xs font-black text-foreground flex items-center gap-1.5">
                <span>{flight.outbound.originIata}</span>
                <ArrowRight className="size-3 text-muted-foreground" />
                <span className="text-primary">
                  {flight.outbound.destinationIata}
                </span>
              </p>
              <p className="text-[10px] text-muted-foreground">
                {flight.outbound.originCity} →{" "}
                {flight.outbound.destinationCity}
              </p>
            </div>

            <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
              {flight.outbound.airline}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-foreground/70">
            <span className="flex items-center gap-1 text-[11px]">
              <Clock className="size-3 text-muted-foreground" />
              {flight.outbound.duration} •{" "}
              {flight.outbound.stops === 0
                ? "Voo Direto"
                : `${flight.outbound.stops} parada`}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
              <Luggage className="size-3" />
              {flight.outbound.baggageIncluded
                ? "Bagagem Inclusa"
                : "Mão 10kg"}
            </span>
          </div>

          {flight.returnFlight && (
            <div className="bg-muted p-2 rounded-xl text-[11px] text-foreground/70 flex items-center justify-between border border-border/60">
              <span className="font-semibold text-primary flex items-center gap-1">
                <RotateCcw className="size-3 text-secondary" />
                Volta: {flight.returnFlight.originIata} →{" "}
                {flight.returnFlight.destinationIata}
              </span>
              <span className="text-muted-foreground text-[10px]">
                {flight.returnFlight.stops === 0
                  ? "Direto"
                  : `${flight.returnFlight.stops} parada`}
              </span>
            </div>
          )}

          <div className="pt-2 border-t border-border/60 flex items-baseline justify-between">
            <div>
              {flight.originalPrice &&
                flight.originalPrice > flight.price && (
                  <p className="text-[10px] text-muted-foreground line-through">
                    De R$ {flight.originalPrice.toLocaleString("pt-BR")}
                  </p>
                )}
              <p className="text-base font-black text-primary">
                R$ {flight.price.toLocaleString("pt-BR")}
                <span className="text-[10px] font-medium text-muted-foreground ml-1">
                  (ou {flight.maxInstallments || 12}x R$ {installment})
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="p-3 border-t border-border/60 bg-muted/50 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => onEdit(flight)}
            className="px-3 py-1.5 bg-card border border-border hover:border-primary text-primary text-xs font-bold rounded-lg flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
          >
            <Edit2 className="size-3.5" />
            Editar
          </button>

          <button
            type="button"
            onClick={() => onDelete(flight)}
            className="px-3 py-1.5 bg-destructive/10 hover:bg-destructive/20 text-destructive text-xs font-bold rounded-lg flex items-center gap-1.5 transition cursor-pointer"
          >
            <Trash2 className="size-3.5" />
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
