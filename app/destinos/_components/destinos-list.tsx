import { MapPin } from "lucide-react";
import { DestinationItem } from "@/types/destination";
import { CityPackageItem } from "../_hooks/use-destinos";
import { CityDestinationSection } from "./city-destination-section";

interface DestinosListProps {
  destinations: DestinationItem[];
  totalWithPackages: number;
  getPackages: (dest: DestinationItem) => CityPackageItem[];
  onBookPackage: (pkg: CityPackageItem) => void;
  onResetFilters: () => void;
}

export function DestinosList({
  destinations,
  totalWithPackages,
  getPackages,
  onBookPackage,
  onResetFilters,
}: DestinosListProps) {
  if (destinations.length === 0) {
    return (
      <div className="bg-card rounded-3xl p-16 text-center border border-border shadow-sm max-w-md mx-auto space-y-4">
        <div className="size-16 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mx-auto">
          <MapPin className="size-8" />
        </div>
        <h3 className="text-xl font-bold text-foreground">
          {totalWithPackages === 0
            ? "Nenhum pacote disponível"
            : "Nenhum destino encontrado"}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {totalWithPackages === 0
            ? "Ainda não há pacotes de viagem com voos e hospedagens combinados no catálogo. Novos pacotes serão exibidos assim que os itens forem cadastrados."
            : "Tente selecionar outra categoria ou limpe o campo de busca para visualizar todas as opções disponíveis."}
        </p>
        {totalWithPackages > 0 && (
          <button
            type="button"
            onClick={onResetFilters}
            className="px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary/90 transition cursor-pointer"
          >
            Ver Todas as Cidades
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-14">
      {destinations.map((dest) => (
        <CityDestinationSection
          key={dest.id}
          dest={dest}
          getPackages={getPackages}
          onBookPackage={onBookPackage}
        />
      ))}
    </div>
  );
}
