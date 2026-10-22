import { Flight } from "@/types/product";
import type { FlightPriceDraft } from "../_hooks/use-produtos";
import { FlightPriceRow } from "./flight-price-row";

interface FlightPricesListProps {
  flights: Flight[];
  priceDrafts: Record<string, FlightPriceDraft>;
  savedId: string | null;
  onPriceChange: (flightId: string, data: FlightPriceDraft) => void;
  onSave: (flightId: string) => void;
}

export function FlightPricesList({
  flights,
  priceDrafts,
  savedId,
  onPriceChange,
  onSave,
}: FlightPricesListProps) {
  return (
    <div className="space-y-4">
      {flights.map((flight) => (
        <FlightPriceRow
          key={flight.id}
          flight={flight}
          priceDraft={priceDrafts[flight.id]}
          isSaved={savedId === flight.id}
          onPriceChange={(data) => onPriceChange(flight.id, data)}
          onSave={() => onSave(flight.id)}
        />
      ))}
    </div>
  );
}
