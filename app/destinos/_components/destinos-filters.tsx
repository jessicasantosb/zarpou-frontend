import { Search } from "lucide-react";
import { DestinationItem } from "@/types/destination";
import { cn } from "@/lib/utils";

const CATEGORY_OPTIONS = [
  { value: "all", label: "Todas as Regiões" },
  { value: "national", label: "Destinos Nacionais 🇧🇷" },
  { value: "international", label: "Internacionais 🌎" },
] as const;

interface DestinosFiltersProps {
  searchQuery: string;
  activeCategory: "all" | "national" | "international";
  selectedCityFilter: string;
  citiesWithPackages: DestinationItem[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: "all" | "national" | "international") => void;
  onCityFilterChange: (value: string) => void;
}

export function DestinosFilters({
  searchQuery,
  activeCategory,
  selectedCityFilter,
  citiesWithPackages,
  onSearchChange,
  onCategoryChange,
  onCityFilterChange,
}: DestinosFiltersProps) {
  return (
    <div className="bg-card rounded-3xl p-6 border border-border  mb-10 space-y-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Buscar por cidade, país ou atrativo..."
            className="w-full pl-10 pr-4 py-2.5 bg-muted border border-border rounded-2xl text-xs font-semibold focus:outline-hidden focus:border-primary focus:bg-card transition"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground/70 cursor-pointer font-bold"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORY_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onCategoryChange(option.value)}
              className={cn(
                "px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer shrink-0",
                activeCategory === option.value
                  ? "bg-primary text-white "
                  : "bg-muted text-foreground/70 hover:bg-muted",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {citiesWithPackages.length > 0 && (
        <div className="pt-4 border-t border-border/60">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-bold text-muted-foreground tracking-wide shrink-0 mr-1">
              Filtrar Cidade:
            </span>
            <button
              type="button"
              onClick={() => onCityFilterChange("")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer shrink-0",
                !selectedCityFilter
                  ? "bg-secondary text-primary "
                  : "bg-muted text-foreground/70 hover:bg-muted",
              )}
            >
              Todas as Cidades ({citiesWithPackages.length})
            </button>

            {citiesWithPackages.map((dest) => {
              const isSelected =
                selectedCityFilter.toLowerCase() === dest.title.toLowerCase();

              return (
                <button
                  key={dest.id}
                  type="button"
                  onClick={() =>
                    onCityFilterChange(isSelected ? "" : dest.title)
                  }
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shrink-0",
                    isSelected
                      ? "bg-secondary text-primary "
                      : "bg-muted text-foreground/70 hover:bg-muted",
                  )}
                >
                  <span>{dest.flag}</span>
                  <span>{dest.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
