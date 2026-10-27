import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, MapPin, Star } from "lucide-react";
import { calculateHotelRating } from "@/lib/rating-utils";
import { Booking } from "@/types/booking";
import { Hotel } from "@/types/product";

interface HotelListingCardProps {
  hotel: Hotel;
  bookings: Booking[];
  nights: number;
  rooms: number;
  checkIn: string;
  checkOut: string;
  adults: number;
}

export function HotelListingCard({
  hotel,
  bookings,
  nights,
  rooms,
  checkIn,
  checkOut,
  adults,
}: HotelListingCardProps) {
  const totalPrice = hotel.basePricePerNight * nights * rooms;
  const installmentValue = (totalPrice / hotel.maxInstallments).toFixed(2);

  return (
    <article className="bg-card rounded-2xl overflow-hidden border border-border   transition-all duration-300 grid grid-cols-1 md:grid-cols-12 group">
      <div className="relative md:col-span-5 h-56 md:h-full min-h-[220px] overflow-hidden">
        <Image
          src={hotel.imageUrl}
          alt={hotel.name}
          fill
          unoptimized={hotel.imageUrl?.startsWith("data:")}
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {hotel.badges && hotel.badges.length > 0 && (
          <div className="absolute top-3 left-3 bg-secondary text-primary text-[11px] font-extrabold px-3 py-1 rounded-full  tracking-wide">
            {hotel.badges[0]}
          </div>
        )}
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-md font-medium">
          {hotel.gallery.length} fotos
        </div>
      </div>

      <div className="p-5 md:col-span-7 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <div className="flex items-center gap-1 mb-1">
                {Array.from({ length: hotel.stars }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-3.5 fill-amber-400 text-amber-400"
                  />
                ))}
                <span className="text-[11px] text-muted-foreground font-medium ml-1">
                  Hotel {hotel.stars} estrelas
                </span>
              </div>
              <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition leading-snug">
                {hotel.name}
              </h2>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <MapPin className="size-3.5 text-primary shrink-0" />
                {hotel.neighborhood}, {hotel.city} - {hotel.state}
              </p>
            </div>

            {(() => {
              const ratingInfo = calculateHotelRating(hotel, bookings);
              if (!ratingInfo.shouldShow || !ratingInfo.rating) return null;
              return (
                <div className="flex flex-col items-end shrink-0">
                  <span className="bg-primary text-white text-sm font-extrabold px-2.5 py-1 rounded-lg ">
                    {ratingInfo.rating.toFixed(1)}
                  </span>
                  <span className="text-[11px] font-bold text-primary mt-0.5">
                    {ratingInfo.label}
                  </span>
                  {ratingInfo.reviewCount > 0 && (
                    <span className="text-[10px] text-muted-foreground">
                      {ratingInfo.reviewCount}{" "}
                      {ratingInfo.reviewCount === 1
                        ? "avaliação"
                        : "avaliações"}
                    </span>
                  )}
                </div>
              );
            })()}
          </div>

          <div className="flex flex-wrap gap-1.5 my-3">
            {hotel.amenities.slice(0, 4).map((amenity) => (
              <span
                key={amenity}
                className="text-[11px] bg-muted text-foreground/80 px-2 py-0.5 rounded-md font-medium flex items-center gap-1"
              >
                <Check className="size-3 text-emerald-600" />
                {amenity}
              </span>
            ))}
          </div>

          <p className="text-xs text-foreground/70 line-clamp-2">
            {hotel.description}
          </p>
        </div>

        <div className="pt-4 mt-3 border-t border-border/60 flex flex-col sm:flex-row items-end sm:items-center justify-between gap-3">
          <div className="text-right sm:text-left">
            {hotel.originalPricePerNight && (
              <span className="text-xs text-muted-foreground line-through mr-1.5">
                R$ {hotel.originalPricePerNight}
              </span>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-semibold text-muted-foreground">
                Diária a partir de
              </span>
              <span className="text-2xl font-extrabold text-primary">
                R$ {hotel.basePricePerNight}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Total de <strong>R$ {totalPrice}</strong> para {nights}{" "}
              {nights === 1 ? "noite" : "noites"}
              {rooms > 1 ? ` (${rooms} quartos)` : ""}
            </p>
            <p className="text-xs font-bold text-emerald-600 mt-0.5">
              Em até {hotel.maxInstallments}x de R$ {installmentValue} sem juros
            </p>
          </div>

          <Link
            href={`/hospedagens/${hotel.id}?checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&rooms=${rooms}`}
            className="w-full sm:w-auto px-6 py-3 bg-secondary hover:bg-secondary/90 text-primary font-bold text-sm rounded-xl flex items-center justify-center gap-2   transition transform group-hover:scale-102"
          >
            Ver quartos
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
