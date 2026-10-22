import { ArrowUpDown } from "lucide-react";
import { SortOption } from "../_hooks/use-hospedagens";

interface ResultsToolbarProps {
  count: number;
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
}

export function ResultsToolbar({ count, sortBy, onSortChange }: ResultsToolbarProps) {
  return (
    <div className="bg-card rounded-xl p-3 border border-border shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
      <span className="text-xs font-medium text-foreground/70">
        Mostrando <strong className="text-foreground">{count}</strong>{" "}
        acomodações disponíveis
      </span>

      <div className="flex items-center gap-2 text-xs">
        <ArrowUpDown className="size-3.5 text-muted-foreground" />
        <span className="text-muted-foreground font-medium">Ordenar por:</span>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="bg-muted border border-border rounded-lg px-2.5 py-1 font-semibold text-foreground/80 text-xs focus:ring-1 focus:ring-primary focus:outline-hidden cursor-pointer"
        >
          <option value="recommended">Mais recomendados</option>
          <option value="price_asc">Menor preço primeiro</option>
          <option value="price_desc">Maior preço primeiro</option>
          <option value="rating_desc">Melhor avaliação</option>
        </select>
      </div>
    </div>
  );
}
