import { Hotel, Plane } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProdutosTab } from "../_hooks/use-produtos";

interface PricesTabsProps {
  activeTab: ProdutosTab;
  hotelsCount: number;
  flightsCount: number;
  onChange: (tab: ProdutosTab) => void;
}

export function PricesTabs({
  activeTab,
  hotelsCount,
  flightsCount,
  onChange,
}: PricesTabsProps) {
  return (
    <div className="flex gap-2 border-b border-border pb-3">
      <button
        type="button"
        onClick={() => onChange("hospedagens")}
        className={cn(
          "flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer",
          activeTab === "hospedagens"
            ? "bg-primary text-white "
            : "bg-card text-foreground/70 hover:bg-muted",
        )}
      >
        <Hotel className="size-4" />
        Preços de Hospedagens ({hotelsCount})
      </button>

      <button
        type="button"
        onClick={() => onChange("passagens")}
        className={cn(
          "flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer",
          activeTab === "passagens"
            ? "bg-primary text-white "
            : "bg-card text-foreground/70 hover:bg-muted",
        )}
      >
        <Plane className="size-4" />
        Preços de Voos ({flightsCount})
      </button>
    </div>
  );
}
