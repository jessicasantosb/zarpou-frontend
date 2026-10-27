import { ArrowRight, Coffee, Maximize2, ShieldCheck, Users } from "lucide-react";
import { Hotel, Room } from "@/types/product";

interface RoomCardProps {
  hotel: Hotel;
  room: Room;
  nights: number;
  onSelectRoom: (room: Room) => void;
}

export function RoomCard({ hotel, room, nights, onSelectRoom }: RoomCardProps) {
  const roomTotalPrice = room.pricePerNight * nights;
  const installment = (roomTotalPrice / hotel.maxInstallments).toFixed(2);

  return (
    <div className="bg-card rounded-3xl p-6 border border-border  hover:border-primary/50 transition-all duration-300 space-y-5">
      <div className="flex flex-col md:flex-row justify-between gap-4 pb-4 border-b border-border/60">
        <div>
          <h3 className="text-lg font-bold text-foreground">{room.name}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{room.description}</p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-foreground/70 mt-3">
            <span className="flex items-center gap-1.5 font-medium">
              <Users className="size-4 text-primary" />
              Até {room.maxAdults} adultos
              {room.maxChildren > 0 && `, ${room.maxChildren} crianças`}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Maximize2 className="size-4 text-primary" />
              {room.sizeM2} m²
            </span>
            <span className="font-semibold text-foreground/80 bg-muted px-2.5 py-1 rounded-lg">
              {room.beds}
            </span>
          </div>
        </div>

        <div className="text-right shrink-0">
          {room.originalPricePerNight && (
            <span className="text-xs text-muted-foreground line-through">
              R$ {room.originalPricePerNight}
            </span>
          )}
          <p className="text-2xl font-black text-primary">
            R$ {room.pricePerNight}
            <span className="text-xs font-normal text-muted-foreground">
              {" "}
              / noite
            </span>
          </p>
          <p className="text-xs text-muted-foreground">
            Total para {nights} noites: <strong>R$ {roomTotalPrice}</strong>
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1.5 text-xs">
          {room.breakfastIncluded && (
            <p className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <Coffee className="size-4 text-emerald-600" />
              Café da manhã buffet incluso
            </p>
          )}
          {room.freeCancellation && (
            <p className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <ShieldCheck className="size-4 text-emerald-600" />
              Cancelamento grátis até 48h antes do check-in
            </p>
          )}
          <p className="text-muted-foreground">
            Disponibilidade:{" "}
            <strong>{room.availableRooms} quartos restantes</strong>
          </p>
        </div>

        <div className="w-full sm:w-auto text-right">
          <p className="text-[11px] font-bold text-emerald-600 mb-1.5">
            Em até {hotel.maxInstallments}x de R$ {installment} sem juros
          </p>
          <button
            type="button"
            onClick={() => onSelectRoom(room)}
            className="w-full sm:w-auto px-8 py-3 bg-secondary hover:bg-secondary/90 text-primary font-extrabold text-sm rounded-xl flex items-center justify-center gap-2   transition transform hover:scale-102 cursor-pointer"
          >
            Reservar este quarto
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
