import { Calendar, SlidersHorizontal } from "lucide-react";

interface FlightsSidebarProps {
  todayStr: string;
  departureDate: string;
  returnDate: string;
  adults: number;
  childCount: number;
  totalTravelers: number;
  priceMax: number;
  directOnly: boolean;
  baggageOnly: boolean;
  availableAirlines: string[];
  selectedAirlines: string[];
  onDepartureDateChange: (value: string) => void;
  onReturnDateChange: (value: string) => void;
  onAdultsChange: (value: number) => void;
  onChildrenChange: (value: number) => void;
  onPriceMaxChange: (value: number) => void;
  onDirectOnlyChange: (checked: boolean) => void;
  onBaggageOnlyChange: (checked: boolean) => void;
  onToggleAirline: (airline: string) => void;
  onClearFilters: () => void;
}

export function FlightsSidebar({
  todayStr,
  departureDate,
  returnDate,
  adults,
  childCount,
  totalTravelers,
  priceMax,
  directOnly,
  baggageOnly,
  availableAirlines,
  selectedAirlines,
  onDepartureDateChange,
  onReturnDateChange,
  onAdultsChange,
  onChildrenChange,
  onPriceMaxChange,
  onDirectOnlyChange,
  onBaggageOnlyChange,
  onToggleAirline,
  onClearFilters,
}: FlightsSidebarProps) {
  return (
    <aside className="lg:col-span-3 space-y-6">
      <div className="bg-card rounded-2xl p-5 border border-border  space-y-6 sticky top-24">
        <div className="pb-3 border-b border-border/60 flex flex-col gap-2">
          <div className="flex items-center gap-2 font-bold text-primary text-base">
            <SlidersHorizontal className="size-4 text-secondary shrink-0" />
            <span>Filtros de Voos</span>
          </div>
          <button
            type="button"
            onClick={onClearFilters}
            className="w-full text-xs font-semibold py-1.5 px-3 rounded-lg bg-muted hover:bg-muted text-foreground/70 hover:text-primary transition cursor-pointer text-center"
          >
            Limpar
          </button>
        </div>

        <div className="space-y-3 pb-4 border-b border-border/60">
          <p className="text-xs font-bold text-foreground/80 tracking-wide flex items-center gap-1.5">
            <Calendar className="size-3.5 text-primary" />
            Datas & Passageiros
          </p>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                Ida
              </label>
              <input
                type="date"
                min={todayStr}
                value={departureDate}
                onChange={(e) => {
                  const val = e.target.value;
                  onDepartureDateChange(val);
                  if (val && returnDate && val > returnDate) {
                    onReturnDateChange(val);
                  }
                }}
                className="w-full text-xs font-medium bg-muted border border-border rounded-lg px-2 py-1.5 focus:outline-hidden focus:border-primary text-foreground"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                Volta
              </label>
              <input
                type="date"
                min={departureDate || todayStr}
                value={returnDate}
                onChange={(e) => {
                  const val = e.target.value;
                  if (departureDate && val < departureDate) {
                    onReturnDateChange(departureDate);
                  } else {
                    onReturnDateChange(val);
                  }
                }}
                className="w-full text-xs font-medium bg-muted border border-border rounded-lg px-2 py-1.5 focus:outline-hidden focus:border-primary text-foreground"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="bg-muted p-2.5 rounded-lg border border-border">
              <span className="text-[11px] font-semibold text-foreground/70 block mb-1.5">
                Adultos
              </span>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onAdultsChange(Math.max(1, adults - 1))}
                  className="size-6 rounded-md bg-card border border-input flex items-center justify-center text-foreground/80 font-bold hover:bg-muted text-xs cursor-pointer "
                >
                  -
                </button>
                <span className="text-xs font-bold text-foreground">
                  {adults}
                </span>
                <button
                  type="button"
                  onClick={() => onAdultsChange(Math.min(9, adults + 1))}
                  className="size-6 rounded-md bg-card border border-input flex items-center justify-center text-foreground/80 font-bold hover:bg-muted text-xs cursor-pointer "
                >
                  +
                </button>
              </div>
            </div>

            <div className="bg-muted p-2.5 rounded-lg border border-border">
              <span className="text-[11px] font-semibold text-foreground/70 block mb-1.5">
                Crianças
              </span>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onChildrenChange(Math.max(0, childCount - 1))}
                  className="size-6 rounded-md bg-card border border-input flex items-center justify-center text-foreground/80 font-bold hover:bg-muted text-xs cursor-pointer "
                >
                  -
                </button>
                <span className="text-xs font-bold text-foreground">
                  {childCount}
                </span>
                <button
                  type="button"
                  onClick={() => onChildrenChange(Math.min(8, childCount + 1))}
                  className="size-6 rounded-md bg-card border border-input flex items-center justify-center text-foreground/80 font-bold hover:bg-muted text-xs cursor-pointer "
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground bg-muted/50 px-2.5 py-1.5 rounded-lg border border-border/60">
            <span>Total de viajantes:</span>
            <span className="font-bold text-primary">
              {totalTravelers}{" "}
              {totalTravelers === 1 ? "passageiro" : "passageiros"}
            </span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold text-foreground/80 tracking-wide">
              Preço por passageiro
            </label>
            <span className="text-xs font-semibold text-primary">
              Até R$ {priceMax}
            </span>
          </div>
          <input
            type="range"
            min="500"
            max="15000"
            step="100"
            value={priceMax}
            onChange={(e) => onPriceMaxChange(Number(e.target.value))}
            className="w-full accent-primary cursor-pointer"
          />
        </div>

        <div className="space-y-3 pt-3 border-t border-border/60">
          <p className="text-xs font-bold text-foreground/80 tracking-wide">
            Paradas e Escalas
          </p>
          <label className="flex items-center gap-2.5 text-xs text-foreground/80 cursor-pointer hover:text-primary">
            <input
              type="checkbox"
              checked={directOnly}
              onChange={(e) => onDirectOnlyChange(e.target.checked)}
              className="size-4 rounded-md accent-primary"
            />
            <span>Somente Voos Diretos</span>
          </label>
        </div>

        <div className="space-y-3 pt-3 border-t border-border/60">
          <p className="text-xs font-bold text-foreground/80 tracking-wide">
            Bagagem
          </p>
          <label className="flex items-center gap-2.5 text-xs text-foreground/80 cursor-pointer hover:text-primary">
            <input
              type="checkbox"
              checked={baggageOnly}
              onChange={(e) => onBaggageOnlyChange(e.target.checked)}
              className="size-4 rounded-md accent-primary"
            />
            <span>Com bagagem despachada 23kg</span>
          </label>
        </div>

        <div className="space-y-2 pt-3 border-t border-border/60">
          <p className="text-xs font-bold text-foreground/80 tracking-wide">
            Companhias Aéreas
          </p>
          <div className="flex flex-col gap-2">
            {availableAirlines.map((airline) => (
              <label
                key={airline}
                className="flex items-center gap-2.5 text-xs text-foreground/80 cursor-pointer hover:text-primary"
              >
                <input
                  type="checkbox"
                  checked={selectedAirlines.includes(airline)}
                  onChange={() => onToggleAirline(airline)}
                  className="size-4 rounded-md accent-primary"
                />
                <span>{airline}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
