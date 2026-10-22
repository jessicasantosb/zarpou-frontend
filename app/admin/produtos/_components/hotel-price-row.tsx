import Image from "next/image";
import { Hotel } from "@/types/product";
import type { HotelPriceDraft } from "../_hooks/use-produtos";
import { PriceEditorRow } from "./price-editor-row";

interface HotelPriceRowProps {
  hotel: Hotel;
  priceDraft?: HotelPriceDraft;
  isSaved: boolean;
  onPriceChange: (data: HotelPriceDraft) => void;
  onSave: () => void;
}

export function HotelPriceRow({
  hotel,
  priceDraft,
  isSaved,
  onPriceChange,
  onSave,
}: HotelPriceRowProps) {
  const currentBase = priceDraft?.basePrice ?? hotel.basePricePerNight;
  const currentOriginal =
    priceDraft?.originalPrice ?? hotel.originalPricePerNight ?? 0;

  return (
    <PriceEditorRow
      icon={
        <div className="relative size-20 rounded-2xl overflow-hidden shrink-0 shadow-xs">
          <Image
            src={hotel.imageUrl}
            alt={hotel.name}
            fill
            className="object-cover"
          />
        </div>
      }
      badge={`${hotel.city} - ${hotel.state}`}
      title={hotel.name}
      description={`${hotel.stars} estrelas • Nota ${hotel.rating} • ${hotel.rooms.length} tipos de quarto`}
      porLabel={'Preço "Por" (Diária) *'}
      deValue={currentOriginal}
      porValue={currentBase}
      onDeChange={(value) =>
        onPriceChange({ basePrice: currentBase, originalPrice: value })
      }
      onPorChange={(value) =>
        onPriceChange({ basePrice: value, originalPrice: currentOriginal })
      }
      isSaved={isSaved}
      onSave={onSave}
    />
  );
}
