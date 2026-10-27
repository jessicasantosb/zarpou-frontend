import { MapPin, Search } from "lucide-react";
import { Container } from "@/components/shared/container";
import { formatDateBR } from "@/lib/format-date";

interface SearchSummaryBarProps {
  searchTerm: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  adults: number;
  rooms: number;
  onSearchTermChange: (value: string) => void;
  onClearSearch: () => void;
}

export function SearchSummaryBar({
  searchTerm,
  checkIn,
  checkOut,
  nights,
  adults,
  rooms,
  onSearchTermChange,
  onClearSearch,
}: SearchSummaryBarProps) {
  return (
    <div className="bg-primary text-white py-4  border-b border-primary/20 mb-8">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-card/10 flex items-center justify-center">
              <MapPin className="size-5 text-secondary" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">
                {searchTerm
                  ? `Hospedagens em ${searchTerm}`
                  : "Todas as Hospedagens"}
              </h1>
              <p className="text-xs text-white/80">
                {formatDateBR(checkIn)} até {formatDateBR(checkOut)} • {nights}{" "}
                {nights === 1 ? "noite" : "noites"} • {adults}{" "}
                {adults === 1 ? "hóspede" : "hóspedes"}, {rooms}{" "}
                {rooms === 1 ? "quarto" : "quartos"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Mudar destino ou hotel..."
                value={searchTerm}
                onChange={(e) => onSearchTermChange(e.target.value)}
                className="w-full bg-card/10 text-white placeholder:text-white/60 text-xs rounded-xl pl-9 pr-3 py-2 border border-white/20 focus:outline-hidden focus:bg-card/20"
              />
            </div>
            <button
              type="button"
              onClick={onClearSearch}
              className="whitespace-nowrap px-4 py-2 bg-secondary text-primary font-bold text-xs rounded-xl hover:bg-secondary/90 transition  cursor-pointer"
              title="Limpar pesquisa e filtros para ver todas as hospedagens"
            >
              Limpar Busca
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
