import { DestinationItem } from "@/types/destination";
import { DestinationCard } from "./destination-card";

interface DestinationsGridProps {
  destinations: DestinationItem[];
  onEdit: (destination: DestinationItem) => void;
  onDelete: (destination: DestinationItem) => void;
}

export function DestinationsGrid({
  destinations,
  onEdit,
  onDelete,
}: DestinationsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {destinations.map((destination) => (
        <DestinationCard
          key={destination.id}
          destination={destination}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
