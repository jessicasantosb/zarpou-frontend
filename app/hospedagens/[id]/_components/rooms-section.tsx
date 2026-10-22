import { Hotel, Room } from "@/types/product";
import { RoomCard } from "./room-card";

interface RoomsSectionProps {
  hotel: Hotel;
  nights: number;
  onSelectRoom: (room: Room) => void;
}

export function RoomsSection({ hotel, nights, onSelectRoom }: RoomsSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">
          Opções de Quartos Disponíveis
        </h2>
        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
          Tarifas garantidas Zarpou
        </span>
      </div>

      {hotel.rooms.map((room) => (
        <RoomCard
          key={room.id}
          hotel={hotel}
          room={room}
          nights={nights}
          onSelectRoom={onSelectRoom}
        />
      ))}
    </div>
  );
}
