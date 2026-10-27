import { Check } from "lucide-react";
import { Hotel } from "@/types/product";

interface HotelAboutSectionProps {
  hotel: Hotel;
}

export function HotelAboutSection({ hotel }: HotelAboutSectionProps) {
  return (
    <div className="bg-card rounded-3xl p-6 border border-border  space-y-4">
      <h2 className="text-xl font-bold text-foreground">
        Sobre a Acomodação
      </h2>
      <p className="text-sm text-foreground/80 leading-relaxed">
        {hotel.description}
      </p>

      <h3 className="text-sm font-bold text-foreground tracking-wide pt-3">
        Comodidades do Hotel
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
        {hotel.amenities.map((amenity) => (
          <div
            key={amenity}
            className="flex items-center gap-2 text-xs text-foreground/80 bg-muted/50 p-2.5 rounded-xl border border-border/60"
          >
            <Check className="size-4 text-emerald-600 shrink-0" />
            <span className="font-medium">{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
