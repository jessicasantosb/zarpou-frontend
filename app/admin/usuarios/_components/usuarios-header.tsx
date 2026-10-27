import { Plus, Users } from "lucide-react";

interface UsuariosHeaderProps {
  onCreate: () => void;
}

export function UsuariosHeader({ onCreate }: UsuariosHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-black text-foreground">Clientes</h1>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-secondary/15 text-primary border border-secondary/30">
            <Users className="size-3.5" />
            Viajantes B2C
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Gerencie os clientes cadastrados na Zarpou, suas preferências de
          notificação (WhatsApp/E-mail) e histórico de reservas.
        </p>
      </div>

      <div className="flex items-center gap-2.5 self-start sm:self-auto">
        <button
          type="button"
          onClick={onCreate}
          className="px-4 py-2 text-xs font-bold text-white bg-primary rounded-xl hover:bg-primary/90 transition flex items-center gap-1.5  cursor-pointer"
        >
          <Plus className="size-4 text-secondary" />
          Novo Cliente
        </button>
      </div>
    </div>
  );
}
