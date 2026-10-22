import { Plane } from "lucide-react";
import { Flight } from "@/types/product";
import type { FlightPriceDraft } from "../_hooks/use-produtos";
import { PriceEditorRow } from "./price-editor-row";

interface FlightPriceRowProps {
  flight: Flight;
  priceDraft?: FlightPriceDraft;
  isSaved: boolean;
  onPriceChange: (data: FlightPriceDraft) => void;
  onSave: () => void;
}

export function FlightPriceRow({
  flight,
  priceDraft,
  isSaved,
  onPriceChange,
  onSave,
}: FlightPriceRowProps) {
  const currentPrice = priceDraft?.price ?? flight.price;
  const currentOriginal = priceDraft?.originalPrice ?? flight.originalPrice ?? 0;

  return (
    <PriceEditorRow
      icon={
        <div className="size-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <Plane className="size-7" />
        </div>
      }
      badge={`${flight.outbound.airline} • ${flight.outbound.flightNumber}`}
      title={`${flight.outbound.originCity} (${flight.outbound.originIata}) → ${flight.outbound.destinationCity} (${flight.outbound.destinationIata})`}
      description={`${flight.isRoundTrip ? "Ida e Volta" : "Somente Ida"} • Duração: ${flight.outbound.duration}`}
      porLabel="Preço do Voo *"
      deValue={currentOriginal}
      porValue={currentPrice}
      onDeChange={(value) =>
        onPriceChange({ price: currentPrice, originalPrice: value })
      }
      onPorChange={(value) =>
        onPriceChange({ price: value, originalPrice: currentOriginal })
      }
      isSaved={isSaved}
      onSave={onSave}
    />
  );
}
