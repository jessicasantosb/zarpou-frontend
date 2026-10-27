import Image from "next/image";
import Link from "next/link";
import {
  Hotel,
  Luggage,
  Plane,
  ShieldCheck,
  Sparkles,
  MapPin,
} from "lucide-react";
import { DestinationItem } from "@/types/destination";
import { CityPackageItem } from "../_hooks/use-destinos";
import { CityPackageCard } from "./city-package-card";

interface CityDestinationSectionProps {
  dest: DestinationItem;
  getPackages: (dest: DestinationItem) => CityPackageItem[];
  onBookPackage: (pkg: CityPackageItem) => void;
}

export function CityDestinationSection({
  dest,
  getPackages,
  onBookPackage,
}: CityDestinationSectionProps) {
  const cityPackages = getPackages(dest);

  return (
    <section
      id={`cidade-${dest.id}`}
      className="bg-card rounded-3xl border border-border  overflow-hidden"
    >
      <div className="relative min-h-[290px] md:min-h-[310px] w-full overflow-hidden p-6 md:p-8 flex flex-col justify-between">
        <Image
          src={
            dest.image_url ||
            "https://images.pexels.com/photos/12039523/pexels-photo-12039523.jpeg"
          }
          alt={dest.title}
          fill
          unoptimized={Boolean(dest.image_url?.startsWith("data:"))}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/60 to-foreground/30 pointer-events-none" />

        <div className="relative z-10 flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="bg-card/95 backdrop-blur-xs text-foreground text-xs font-black px-3 py-1.5 rounded-full uppercase  flex items-center gap-1.5">
              <span>{dest.flag}</span>
              <span>{dest.country}</span>
            </div>
            {dest.bestTimeToVisit && (
              <div className="bg-card/20 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full border border-white/25 flex items-center gap-1">
                <Sparkles className="size-3 text-secondary" />
                <span>Melhor época: {dest.bestTimeToVisit}</span>
              </div>
            )}
          </div>

          <div className="bg-secondary text-primary text-[10px] font-black px-3 py-1 rounded-md tracking-wide ">
            {dest.tag || "Destino Recomendado"}
          </div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 text-white">
          <div className="space-y-1 max-w-xl">
            <span className="text-[11px] font-bold text-secondary tracking-widest flex items-center gap-1">
              <MapPin className="size-3.5" />
              Lugar Imperdível Zarpou
            </span>
            <h2 className="text-3xl md:text-4xl font-black drop-shadow-md">
              {dest.title}
              {dest.state ? `, ${dest.state}` : ""}
            </h2>
            <p className="text-xs text-primary-foreground/90 leading-relaxed drop-shadow-xs line-clamp-2">
              {dest.description}
            </p>
            {dest.highlights && dest.highlights.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1.5">
                {dest.highlights.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] bg-card/20 backdrop-blur-xs text-white px-2 py-0.5 rounded-md font-medium border border-white/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href={`/hospedagens?city=${encodeURIComponent(dest.title)}`}
              className="px-3.5 py-2 bg-card/20 hover:bg-card/30 backdrop-blur-md rounded-xl text-xs font-bold text-white transition flex items-center gap-1.5 border border-white/20"
            >
              <Hotel className="size-3.5 text-secondary" />
              <span>+{dest.accommodationsCount} Hotéis</span>
            </Link>
            <Link
              href={`/passagens?destination=${encodeURIComponent(dest.title)}`}
              className="px-3.5 py-2 bg-card/20 hover:bg-card/30 backdrop-blur-md rounded-xl text-xs font-bold text-white transition flex items-center gap-1.5 border border-white/20"
            >
              <Plane className="size-3.5 text-secondary" />
              <span>Voos para {dest.title}</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 bg-muted/60 border-t border-border/60">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Luggage className="size-4.5" />
            </div>
            <div>
              <h3 className="font-extrabold text-foreground text-sm md:text-base">
                Pacotes de Viagem para {dest.title} (Voo + Hotel)
              </h3>
              <p className="text-[11px] text-muted-foreground">
                Compre o pacote completo e garanta os maiores descontos da
                agência
              </p>
            </div>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            <ShieldCheck className="size-3.5" />
            Até 12x s/ juros no cartão
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cityPackages.map((pkg) => (
            <CityPackageCard key={pkg.id} pkg={pkg} onBook={onBookPackage} />
          ))}
        </div>
      </div>
    </section>
  );
}
