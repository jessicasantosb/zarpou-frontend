import { RotateCcw } from "lucide-react";

interface ProdutosHeaderProps {
  onResetPrices: () => void;
}

export function ProdutosHeader({ onResetPrices }: ProdutosHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-black text-foreground">
          Gestão de Preços &amp; Catálogo
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Ajuste os valores de diárias e tarifas aéreas com reflexo instantâneo
          no site
        </p>
      </div>

      <button
        type="button"
        onClick={onResetPrices}
        className="px-4 py-2 text-xs font-semibold text-foreground/70 bg-card border border-border rounded-xl hover:bg-muted transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
      >
        <RotateCcw className="size-3.5" />
        Restaurar Preços Originais
      </button>
    </div>
  );
}
