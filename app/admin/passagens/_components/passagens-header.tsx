import { Plane, Plus, RotateCcw } from "lucide-react";
import { ImportDataButton } from "@/app/admin/_components/import-data-dialog";

interface PassagensHeaderProps {
  onRestore: () => void;
  onAddNew: () => void;
}

export function PassagensHeader({ onRestore, onAddNew }: PassagensHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/15 text-primary text-[11px] font-black tracking-wide mb-2">
          <Plane className="size-3 text-secondary fill-secondary" />
          Catálogo & Ofertas
        </div>
        <h1 className="text-2xl font-black text-foreground">Passagens Aéreas</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Cadastre rotas completas de ida e volta, configure companhias,
          franquias de bagagem, horários e tarifas.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <ImportDataButton resource="flights" label="passagens" />

        <button
          type="button"
          onClick={onRestore}
          className="px-4 py-2 text-xs font-semibold text-foreground/70 bg-card border border-border rounded-xl hover:bg-muted transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
        >
          <RotateCcw className="size-3.5" />
          Restaurar Padrões
        </button>

        <button
          type="button"
          onClick={onAddNew}
          className="px-5 py-2.5 bg-primary hover:bg-primary/90 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-xs transition cursor-pointer"
        >
          <Plus className="size-4" />
          Adicionar Novo Voo
        </button>
      </div>
    </div>
  );
}
