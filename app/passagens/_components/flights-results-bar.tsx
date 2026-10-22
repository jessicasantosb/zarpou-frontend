import { ArrowUpDown } from "lucide-react";
import type { FlightSort } from "../_hooks/use-passagens";

interface FlightsResultsBarProps {
  count: number;
  sortBy: FlightSort;
  onSortByChange: (sort: FlightSort) => void;
}

export function FlightsResultsBar({
  count,
  sortBy,
  onSortByChange,
}: FlightsResultsBarProps) {
  return (
    <div className="bg-card rounded-xl p-3 border border-border shadow-xs flex items-center justify-between">
      <span className="text-xs font-medium text-foreground/70">
        <strong>{count}</strong> opções de voos encontrados
      </span>

      <div className="flex items-center gap-2 text-xs">
        <ArrowUpDown className="size-3.5 text-muted-foreground" />
        <span className="text-muted-foreground font-medium">Ordenar:</span>
        <select
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value as FlightSort)}
          className="bg-muted border border-border rounded-lg px-2.5 py-1 font-semibold text-foreground/80 text-xs focus:outline-hidden cursor-pointer"
        >
          <option value="recommended">Melhor combinação</option>
          <option value="price_asc">Menor preço</option>
          <option value="price_desc">Maior preço</option>
        </select>
      </div>
    </div>
  );
}
