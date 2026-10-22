import { Plus, RotateCcw } from "lucide-react";
import { ImportDataButton } from "@/app/admin/_components/import-data-dialog";

interface PromocoesHeaderProps {
  onReset: () => void;
  onAddNew: () => void;
}

export function PromocoesHeader({ onReset, onAddNew }: PromocoesHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-black text-foreground">
          Promoções &amp; Banners da Home
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Adicione e controle as ofertas em destaque exibidas para os clientes
        </p>
      </div>

      <div className="flex items-center gap-3">
        <ImportDataButton resource="promotions" label="promoções" />

        <button
          type="button"
          onClick={onReset}
          className="px-4 py-2 text-xs font-semibold text-foreground/70 bg-card border border-border rounded-xl hover:bg-muted transition flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="size-3.5" />
          Restaurar Padrão
        </button>

        <button
          type="button"
          onClick={onAddNew}
          className="px-5 py-2.5 bg-primary hover:bg-primary/90 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm transition cursor-pointer"
        >
          <Plus className="size-4 text-secondary" />
          Nova Promoção
        </button>
      </div>
    </div>
  );
}
