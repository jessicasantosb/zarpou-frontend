import { Hotel } from "@/types/product";
import type { HotelPriceDraft } from "../_hooks/use-produtos";
import { HotelPriceRow } from "./hotel-price-row";

interface HotelPricesListProps {
  hotels: Hotel[];
  priceDrafts: Record<string, HotelPriceDraft>;
  savedId: string | null;
  onPriceChange: (hotelId: string, data: HotelPriceDraft) => void;
  onSave: (hotelId: string) => void;
}

export function HotelPricesList({
  hotels,
  priceDrafts,
  savedId,
  onPriceChange,
  onSave,
}: HotelPricesListProps) {
  return (
    <div className="space-y-4">
      {hotels.map((hotel) => (
        <HotelPriceRow
          key={hotel.id}
          hotel={hotel}
          priceDraft={priceDrafts[hotel.id]}
          isSaved={savedId === hotel.id}
          onPriceChange={(data) => onPriceChange(hotel.id, data)}
          onSave={() => onSave(hotel.id)}
        />
      ))}
    </div>
  );
}
