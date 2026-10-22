import type { StatusFilter } from "../_hooks/use-minhas-viagens";

interface TripsStatusFiltersProps {
  statusFilter: StatusFilter;
  total: number;
  proximas: number;
  concluidas: number;
  pendentes: number;
  onStatusFilterChange: (filter: StatusFilter) => void;
}

export function TripsStatusFilters({
  statusFilter,
  total,
  proximas,
  concluidas,
  pendentes,
  onStatusFilterChange,
}: TripsStatusFiltersProps) {
  const filters: Array<{
    id: StatusFilter;
    label: string;
    count: number;
  }> = [
    { id: "todas", label: "Todas", count: total },
    { id: "proximas", label: "🌴 Próximas", count: proximas },
    { id: "concluidas", label: "⭐ Concluídas & Avaliações", count: concluidas },
    { id: "pendentes", label: "⏳ Aguardando Pagamento", count: pendentes },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => onStatusFilterChange(filter.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              statusFilter === filter.id
                ? "bg-primary text-white shadow-xs"
                : "bg-card text-foreground/70 border border-border hover:bg-muted"
            }`}
          >
            <span>{filter.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                statusFilter === filter.id
                  ? "bg-card/20 text-white"
                  : "bg-muted text-foreground/70"
              }`}
            >
              {filter.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
