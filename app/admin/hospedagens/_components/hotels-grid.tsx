import { Hotel } from "@/types/product";
import { HotelCard } from "./hotel-card";

interface HotelsGridProps {
  hotels: Hotel[];
  onEdit: (hotel: Hotel) => void;
  onDelete: (hotel: Hotel) => void;
}

export function HotelsGrid({ hotels, onEdit, onDelete }: HotelsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {hotels.map((hotel) => (
        <HotelCard
          key={hotel.id}
          hotel={hotel}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
