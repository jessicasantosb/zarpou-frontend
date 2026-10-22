import { MapPin, Star } from "lucide-react";
import { calculateHotelRating } from "@/lib/rating-utils";
import { Booking } from "@/types/booking";
import { Hotel } from "@/types/product";

interface HotelHeaderProps {
  hotel: Hotel;
  bookings: Booking[];
}

export function HotelHeader({ hotel, bookings }: HotelHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-1.5 mb-1.5">
          {Array.from({ length: hotel.stars }).map((_, i) => (
            <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
          ))}
          <span className="text-xs text-muted-foreground font-semibold ml-1">
            Hotel {hotel.stars} estrelas
          </span>
          {hotel.badges && hotel.badges.length > 0 && (
            <span className="ml-2 bg-secondary text-primary text-[10px] font-black px-2 py-0.5 rounded-full tracking-wide">
              {hotel.badges[0]}
            </span>
          )}
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-foreground">
          {hotel.name}
        </h1>

        <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
          <MapPin className="size-4 text-primary shrink-0" />
          {hotel.address} • {hotel.neighborhood}, {hotel.city} - {hotel.state}
        </p>
      </div>

      {(() => {
        const ratingInfo = calculateHotelRating(hotel, bookings);
        if (!ratingInfo.shouldShow || !ratingInfo.rating) return null;
        return (
          <div className="flex items-center md:flex-col md:items-end gap-3 md:gap-0 shrink-0 bg-muted md:bg-transparent p-3 md:p-0 rounded-2xl">
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-sm font-extrabold text-primary leading-tight">
                  {ratingInfo.label}
                </p>
                <p className="text-xs text-muted-foreground">
                  {ratingInfo.reviewCount > 0
                    ? `${ratingInfo.reviewCount} ${ratingInfo.reviewCount === 1 ? "avaliação verificada" : "avaliações verificadas"}`
                    : "Avaliação Zarpou"}
                </p>
              </div>
              <span className="bg-primary text-white text-lg font-black px-3 py-1.5 rounded-xl shadow-xs">
                {ratingInfo.rating.toFixed(1)}
              </span>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
