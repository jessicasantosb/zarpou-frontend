import Image from "next/image";
import { Edit2, MapPin, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HOTEL_DEFAULT_IMAGE } from "@/schemas/hotel-form";
import { Hotel } from "@/types/product";

interface HotelCardProps {
  hotel: Hotel;
  onEdit: (hotel: Hotel) => void;
  onDelete: (hotel: Hotel) => void;
}

export function HotelCard({ hotel, onEdit, onDelete }: HotelCardProps) {
  const roomsCount = hotel.rooms?.length || 1;
  const installment = (
    hotel.basePricePerNight /
    (hotel.maxInstallments || 12)
  ).toFixed(2);

  return (
    <div className="flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card  transition-shadow ">
      <div>
        <div className="relative h-48 w-full bg-muted">
          <Image
            src={hotel.imageUrl || HOTEL_DEFAULT_IMAGE}
            alt={hotel.name}
            fill
            unoptimized={hotel.imageUrl?.startsWith("data:")}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {hotel.badges && hotel.badges[0] && (
            <div className="absolute top-3 left-3 rounded-full bg-secondary px-2.5 py-1 text-[10px] font-black tracking-wide text-primary ">
              {hotel.badges[0]}
            </div>
          )}

          {hotel.rating > 0 && (
            <div className="absolute top-3 right-3 flex items-center gap-1 rounded-lg bg-primary px-2 py-0.5 text-xs font-black text-white">
              <Star className="size-3 fill-secondary text-secondary" />
              <span>{hotel.rating.toFixed(1)}</span>
            </div>
          )}

          <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between text-xs text-white">
            <span className="flex items-center gap-1 font-semibold drop-shadow-xs truncate">
              <MapPin className="size-3 shrink-0 text-secondary" />
              {hotel.neighborhood || hotel.city}, {hotel.state}
            </span>
            <span className="shrink-0 text-[11px] text-white/80">
              {roomsCount} {roomsCount === 1 ? "quarto" : "quartos"}
            </span>
          </div>
        </div>

        <div className="space-y-2.5 p-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: hotel.stars }).map((_, index) => (
                <Star
                  key={index}
                  className="size-3 fill-amber-400 text-amber-400"
                />
              ))}
              <span className="ml-1 text-[11px] font-medium text-muted-foreground">
                {hotel.stars} estrelas
              </span>
            </div>

            <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-semibold text-foreground/80">
              {roomsCount} opçõe{roomsCount === 1 ? "o" : "s"}
            </span>
          </div>

          <h3 className="line-clamp-1 text-base font-bold text-foreground">
            {hotel.name}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {hotel.description}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {hotel.amenities?.slice(0, 3).map((amenity, index) => (
              <span
                key={index}
                className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-semibold text-foreground/70"
              >
                {amenity}
              </span>
            ))}
          </div>

          <div className="flex items-baseline justify-between border-t border-border/60 pt-2">
            <div>
              {hotel.originalPricePerNight &&
                hotel.originalPricePerNight > hotel.basePricePerNight && (
                  <p className="text-[10px] text-muted-foreground line-through">
                    De R${" "}
                    {hotel.originalPricePerNight.toLocaleString("pt-BR")}
                  </p>
                )}
              <p className="text-lg font-black text-primary">
                R$ {hotel.basePricePerNight.toLocaleString("pt-BR")}
                <span className="text-xs font-normal text-muted-foreground">
                  {" "}
                  / noite
                </span>
              </p>
              <p className="text-[10px] text-muted-foreground">
                ou em até {hotel.maxInstallments || 12}x de R$ {installment}{" "}
                sem juros
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-end gap-2 border-t border-border/60 p-4 pt-0">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onEdit(hotel)}
          className="h-auto cursor-pointer rounded-lg border-border bg-card px-3 py-1.5 text-xs font-bold text-primary  hover:border-primary"
        >
          <Edit2 className="size-3.5" />
          Editar
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onDelete(hotel)}
          className="h-auto cursor-pointer rounded-lg border-destructive/20 bg-destructive/10 px-3 py-1.5 text-xs font-bold text-destructive hover:bg-destructive/20 hover:text-destructive"
        >
          <Trash2 className="size-3.5" />
          Excluir
        </Button>
      </div>
    </div>
  );
}
