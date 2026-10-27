import { Search } from "lucide-react";

interface UsuariosFiltersProps {
  searchTerm: string;
  statusFilter: string;
  channelFilter: string;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onChannelFilterChange: (value: string) => void;
}

export function UsuariosFilters({
  searchTerm,
  statusFilter,
  channelFilter,
  onSearchChange,
  onStatusFilterChange,
  onChannelFilterChange,
}: UsuariosFiltersProps) {
  return (
    <div className="bg-card p-4 rounded-2xl border border-border  flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
      <div className="relative flex-1">
        <Search className="size-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar por nome, e-mail, CPF ou telefone..."
          className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-xl text-xs focus:bg-card focus:outline-hidden focus:ring-2 focus:ring-secondary focus:border-transparent transition"
        />
      </div>

      <div className="flex items-center gap-2">
        <select
          value={statusFilter}
          onChange={(event) => onStatusFilterChange(event.target.value)}
          className="px-3 py-2 bg-muted border border-border rounded-xl text-xs text-foreground/80 focus:bg-card focus:outline-hidden focus:ring-2 focus:ring-secondary transition cursor-pointer"
        >
          <option value="all">Todos os Status</option>
          <option value="active">Apenas Ativos</option>
          <option value="inactive">Apenas Inativos</option>
        </select>

        <select
          value={channelFilter}
          onChange={(event) => onChannelFilterChange(event.target.value)}
          className="px-3 py-2 bg-muted border border-border rounded-xl text-xs text-foreground/80 focus:bg-card focus:outline-hidden focus:ring-2 focus:ring-secondary transition cursor-pointer"
        >
          <option value="all">Todos os Canais</option>
          <option value="whatsapp">Inscrito no WhatsApp</option>
          <option value="email">Inscrito no E-mail</option>
        </select>
      </div>
    </div>
  );
}
