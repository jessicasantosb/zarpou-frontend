import { Flight } from "@/types/product";
import { FlightCard } from "./flight-card";

interface FlightsGridProps {
  flights: Flight[];
  onEdit: (flight: Flight) => void;
  onDelete: (flight: Flight) => void;
}

export function FlightsGrid({ flights, onEdit, onDelete }: FlightsGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {flights.map((flight) => (
        <FlightCard
          key={flight.id}
          flight={flight}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
