import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { CityPackageItem } from "../_hooks/use-destinos";

interface CityPackageCardProps {
  pkg: CityPackageItem;
  onBook: (pkg: CityPackageItem) => void;
}

export function CityPackageCard({ pkg, onBook }: CityPackageCardProps) {
  const installmentValue = (pkg.price / pkg.installments).toFixed(2);

  return (
    <div className="bg-card rounded-2xl p-6 border border-border   transition-all flex flex-col justify-between group space-y-5">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-[10px] font-black tracking-wide text-secondary bg-secondary/15 px-2 py-0.5 rounded-md inline-block mb-1">
              {pkg.nights} Noites de Viagem
            </span>
            <h4 className="font-bold text-foreground text-base group-hover:text-primary transition leading-snug">
              {pkg.title}
            </h4>
          </div>

          <div className="bg-emerald-600 text-white text-[10px] font-black px-2 py-1 rounded-md  flex items-center gap-1 shrink-0">
            <Sparkles className="size-2.5" />
            <span>{pkg.discountPercent}% OFF</span>
          </div>
        </div>

        <div className="bg-muted/50 p-3.5 rounded-xl border border-border/60 space-y-2">
          <span className="text-[10px] font-bold tracking-wide text-muted-foreground block mb-1">
            O que está incluso:
          </span>
          {pkg.highlights.map((highlight) => (
            <div
              key={highlight}
              className="flex items-start gap-2 text-xs text-foreground/80 font-medium"
            >
              <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{highlight}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-border/60 flex items-end justify-between gap-4">
        <div>
          <span className="text-[11px] text-muted-foreground line-through block">
            De R$ {pkg.originalPrice}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-[11px] font-semibold text-muted-foreground">
              Por
            </span>
            <span className="text-2xl font-black text-primary">
              R$ {pkg.price}
            </span>
            <span className="text-[10px] text-muted-foreground">/pessoa</span>
          </div>
          <span className="text-[11px] font-bold text-emerald-600 block mt-0.5">
            12x de R$ {installmentValue} sem juros
          </span>
        </div>

        <button
          type="button"
          onClick={() => onBook(pkg)}
          className="px-5 py-3 bg-secondary hover:bg-secondary/90 text-primary font-black text-xs rounded-xl flex items-center gap-2   transition-transform group-hover:scale-102 cursor-pointer shrink-0"
        >
          <span>Reservar Pacote</span>
          <ArrowRight className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
