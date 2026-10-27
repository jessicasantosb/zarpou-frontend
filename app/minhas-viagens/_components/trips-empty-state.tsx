import Link from "next/link";
import { CalendarCheck2 } from "lucide-react";
import type { StatusFilter } from "../_hooks/use-minhas-viagens";

interface TripsEmptyStateProps {
  statusFilter: StatusFilter;
  onResetFilter: () => void;
}

export function TripsEmptyState({
  statusFilter,
  onResetFilter,
}: TripsEmptyStateProps) {
  return (
    <div className="bg-card rounded-3xl p-12 text-center border border-border  space-y-4">
      <div className="size-16 rounded-full bg-muted text-muted-foreground flex items-center justify-center mx-auto">
        <CalendarCheck2 className="size-8" />
      </div>
      <h2 className="text-xl font-bold text-foreground">
        Nenhuma viagem encontrada nesta categoria
      </h2>
      <p className="text-xs text-muted-foreground max-w-sm mx-auto">
        {statusFilter !== "todas"
          ? "Você não possui reservas correspondentes ao filtro selecionado. Mude o filtro para ver todas as suas viagens."
          : "Suas futuras viagens, passagens aéreas e vouchers aparecerão aqui assim que você concluir uma compra."}
      </p>
      {statusFilter !== "todas" ? (
        <button
          type="button"
          onClick={onResetFilter}
          className="px-5 py-2.5 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary/90 transition  cursor-pointer"
        >
          Ver Todas as Viagens
        </button>
      ) : (
        <Link
          href="/hospedagens"
          className="inline-block px-6 py-3 bg-secondary text-primary font-bold text-xs rounded-xl hover:bg-secondary/90 transition "
        >
          Explorar Hotéis e Pacotes
        </Link>
      )}
    </div>
  );
}
