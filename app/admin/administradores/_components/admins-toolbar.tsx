import { Search } from "lucide-react";

interface AdminsToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  accessFilter: string;
  onAccessFilterChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

export function AdminsToolbar({
  searchTerm,
  onSearchChange,
  accessFilter,
  onAccessFilterChange,
  statusFilter,
  onStatusFilterChange,
}: AdminsToolbarProps) {
  return (
    <div className="flex flex-col items-stretch justify-between gap-3 rounded-2xl border border-border bg-card p-4 shadow-2xs sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar administrador por nome ou e-mail..."
          className="w-full rounded-xl border border-border bg-muted py-2 pl-10 pr-4 text-xs transition focus:bg-card focus:outline-hidden focus:ring-2 focus:ring-secondary focus:border-transparent"
        />
      </div>

      <div className="flex items-center gap-2">
        <select
          value={accessFilter}
          onChange={(event) => onAccessFilterChange(event.target.value)}
          className="cursor-pointer rounded-xl border border-border bg-muted px-3 py-2 text-xs text-foreground/80 transition focus:bg-card focus:outline-hidden focus:ring-2 focus:ring-secondary"
        >
          <option value="all">Todos os Acessos</option>
          <option value="admin">Administrador Geral</option>
          <option value="personalizado">Acesso Personalizado</option>
        </select>

        <select
          value={statusFilter}
          onChange={(event) => onStatusFilterChange(event.target.value)}
          className="cursor-pointer rounded-xl border border-border bg-muted px-3 py-2 text-xs text-foreground/80 transition focus:bg-card focus:outline-hidden focus:ring-2 focus:ring-secondary"
        >
          <option value="all">Todos os Status</option>
          <option value="active">Apenas Ativos</option>
          <option value="inactive">Apenas Inativos</option>
        </select>
      </div>
    </div>
  );
}
