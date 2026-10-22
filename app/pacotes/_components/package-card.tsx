import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Hotel, Plane, Sparkles } from "lucide-react";
import { PackageItem } from "../_hooks/use-pacotes";

interface PackageCardProps {
  pkg: PackageItem;
}

export function PackageCard({ pkg }: PackageCardProps) {
  const installmentVal = (pkg.price / pkg.installments).toFixed(2);

  return (
    <div className="bg-card rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
      <div>
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={pkg.imageUrl}
            alt={pkg.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 bg-secondary text-primary text-xs font-black px-3 py-1 rounded-full shadow-md tracking-wide flex items-center gap-1">
            <Sparkles className="size-3" />
            Economize {pkg.discountPercent}%
          </div>
          <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-md font-semibold">
            {pkg.nights} noites de viagem
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <p className="text-xs font-semibold text-primary tracking-wide">
              {pkg.destination}
            </p>
            <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition leading-tight mt-0.5">
              {pkg.title}
            </h2>
          </div>

          <div className="space-y-2 border-y border-border/60 py-3 text-xs text-foreground/80">
            <div className="flex items-center gap-2">
              <Plane className="size-4 text-primary shrink-0" />
              <span>Passagens Aéreas de ida e volta inclusas</span>
            </div>
            <div className="flex items-center gap-2">
              <Hotel className="size-4 text-primary shrink-0" />
              <span>Hospedagem com café da manhã</span>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground line-through">
              R$ {pkg.originalPrice}
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-medium text-muted-foreground">
                Por apenas
              </span>
              <span className="text-2xl font-black text-primary">
                R$ {pkg.price}
              </span>
              <span className="text-xs text-muted-foreground">/ pessoa</span>
            </div>
            <p className="text-xs font-bold text-emerald-600">
              Em até {pkg.installments}x de R$ {installmentVal} sem juros
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 pt-0">
        <Link
          href={
            pkg.hotel?.id ? `/hospedagens/${pkg.hotel.id}` : "/hospedagens"
          }
          className="w-full py-3 bg-secondary hover:bg-secondary/90 text-primary font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md shadow-secondary/20 transition transform group-hover:scale-102"
        >
          Ver Pacote Completo
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
