import { Plus } from "lucide-react";
import { ImportDataButton } from "@/app/admin/_components/import-data-dialog";

interface PromocoesHeaderProps {
  onAddNew: () => void;
}

export function PromocoesHeader({ onAddNew }: PromocoesHeaderProps) {
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
          onClick={onAddNew}
          className="px-5 py-2.5 bg-primary hover:bg-primary/90 text-white font-bold text-xs rounded-xl flex items-center gap-2  transition cursor-pointer"
        >
          <Plus className="size-4 text-secondary" />
          Nova Promoção
        </button>
      </div>
    </div>
  );
}
