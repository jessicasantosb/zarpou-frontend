interface HotelsEmptyStateProps {
  onReset: () => void;
}

export function HotelsEmptyState({ onReset }: HotelsEmptyStateProps) {
  return (
    <div className="bg-card rounded-2xl p-12 text-center border border-border  space-y-4">
      <p className="text-lg font-bold text-foreground">
        Nenhuma acomodação encontrada para estes filtros
      </p>
      <p className="text-sm text-muted-foreground max-w-md mx-auto">
        Tente aumentar o limite de preço ou limpar os filtros de cancelamento e
        comodidades para ver mais opções.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary/90 transition "
      >
        Ver Todas as Hospedagens
      </button>
    </div>
  );
}
