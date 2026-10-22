import { Search } from "lucide-react";

interface ReservasHeaderProps {
  search: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
}

export function ReservasHeader({
  search,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
}: ReservasHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-black text-foreground">
          Reservas &amp; Pedidos dos Clientes
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Histórico completo de compras e vouchers emitidos pelo app
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative w-64">
          <Search className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por PNR ou nome..."
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            className="w-full h-10 pl-9 pr-3 text-xs bg-card rounded-xl border border-input outline-hidden focus:border-primary"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(event) => onStatusFilterChange(event.target.value)}
          className="h-10 px-3 bg-card border border-input rounded-xl text-xs font-semibold text-foreground/80 outline-hidden"
        >
          <option value="todos">Todos os Status</option>
          <option value="confirmada">Confirmadas</option>
          <option value="pendente_pagamento">Aguardando Pagamento</option>
        </select>
      </div>
    </div>
  );
}
