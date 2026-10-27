import { Plus, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminsHeaderProps {
  onCreate: () => void;
}

export function AdminsHeader({ onCreate }: AdminsHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-black text-foreground">
            Administradores do Sistema
          </h1>
          <span className="inline-flex items-center gap-1 rounded-full border border-secondary/30 bg-secondary/15 px-2.5 py-0.5 text-[11px] font-bold text-primary">
            <ShieldCheck className="size-3.5" />
            Gestão de Acessos
          </span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Controle os colaboradores da agência com acesso ao painel. Ative ou
          desative membros da equipe conforme permissão.
        </p>
      </div>

      <div className="flex items-center gap-2.5 self-start sm:self-auto">
        <Button
          type="button"
          size="sm"
          onClick={onCreate}
          className="h-auto rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white  hover:bg-primary/90"
        >
          <Plus className="size-4 text-secondary" />
          Novo Administrador
        </Button>
      </div>
    </div>
  );
}
