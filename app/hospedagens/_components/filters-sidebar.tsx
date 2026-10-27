import { Calendar, SlidersHorizontal, Star } from "lucide-react";

interface FiltersSidebarProps {
  checkIn: string;
  checkOut: string;
  adults: number;
  rooms: number;
  nights: number;
  todayStr: string;
  priceMax: number;
  freeCancellation: boolean;
  breakfastOnly: boolean;
  minRating: number;
  selectedStars: number[];
  onCheckInChange: (value: string) => void;
  onCheckOutChange: (value: string) => void;
  onAdultsDecrease: () => void;
  onAdultsIncrease: () => void;
  onRoomsDecrease: () => void;
  onRoomsIncrease: () => void;
  onPriceMaxChange: (value: number) => void;
  onFreeCancellationChange: (value: boolean) => void;
  onBreakfastOnlyChange: (value: boolean) => void;
  onMinRatingChange: (value: number) => void;
  onToggleStar: (star: number) => void;
  onClearFilters: () => void;
}

export function FiltersSidebar({
  checkIn,
  checkOut,
  adults,
  rooms,
  nights,
  todayStr,
  priceMax,
  freeCancellation,
  breakfastOnly,
  minRating,
  selectedStars,
  onCheckInChange,
  onCheckOutChange,
  onAdultsDecrease,
  onAdultsIncrease,
  onRoomsDecrease,
  onRoomsIncrease,
  onPriceMaxChange,
  onFreeCancellationChange,
  onBreakfastOnlyChange,
  onMinRatingChange,
  onToggleStar,
  onClearFilters,
}: FiltersSidebarProps) {
  return (
    <aside className="lg:col-span-3 space-y-6">
      <div className="bg-card rounded-2xl p-5 border border-border  space-y-6 sticky top-24">
        <div className="pb-3 border-b border-border/60 flex flex-col gap-2">
          <div className="flex items-center gap-2 font-bold text-primary text-base">
            <SlidersHorizontal className="size-4 text-secondary shrink-0" />
            <span>Filtros de Busca</span>
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
            Datas &amp; Hóspedes
          </p>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                Check-in
              </label>
              <input
                type="date"
                min={todayStr}
                value={checkIn}
                onChange={(e) => onCheckInChange(e.target.value)}
                className="w-full text-xs font-medium bg-muted border border-border rounded-lg px-2 py-1.5 focus:outline-hidden focus:border-primary text-foreground"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                Check-out
              </label>
              <input
                type="date"
                min={checkIn || todayStr}
                value={checkOut}
                onChange={(e) => onCheckOutChange(e.target.value)}
                className="w-full text-xs font-medium bg-muted border border-border rounded-lg px-2 py-1.5 focus:outline-hidden focus:border-primary text-foreground"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground bg-muted/50 px-2.5 py-1.5 rounded-lg border border-border/60">
            <span>Duração:</span>
            <span className="font-bold text-primary">
              {nights} {nights === 1 ? "noite" : "noites"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="bg-muted p-2.5 rounded-lg border border-border">
              <span className="text-[11px] font-semibold text-foreground/70 block mb-1.5">
                Hóspedes
              </span>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  disabled={adults <= 1}
                  onClick={onAdultsDecrease}
                  className="size-6 rounded-md bg-card border border-input flex items-center justify-center text-foreground/80 font-bold hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed text-xs cursor-pointer "
                >
                  -
                </button>
                <span className="text-xs font-bold text-foreground">
                  {adults}
                </span>
                <button
                  type="button"
                  onClick={onAdultsIncrease}
                  className="size-6 rounded-md bg-card border border-input flex items-center justify-center text-foreground/80 font-bold hover:bg-muted text-xs cursor-pointer "
                >
                  +
                </button>
              </div>
            </div>

            <div className="bg-muted p-2.5 rounded-lg border border-border">
              <span className="text-[11px] font-semibold text-foreground/70 block mb-1.5">
                Quartos
              </span>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  disabled={rooms <= 1}
                  onClick={onRoomsDecrease}
                  className="size-6 rounded-md bg-card border border-input flex items-center justify-center text-foreground/80 font-bold hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed text-xs cursor-pointer "
                >
                  -
                </button>
                <span className="text-xs font-bold text-foreground">
                  {rooms}
                </span>
                <button
                  type="button"
                  disabled={rooms >= adults || rooms >= 5}
                  onClick={onRoomsIncrease}
                  className="size-6 rounded-md bg-card border border-input flex items-center justify-center text-foreground/80 font-bold hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed text-xs cursor-pointer "
                  title={
                    rooms >= adults
                      ? "O número de quartos não pode ser maior que o de hóspedes"
                      : ""
                  }
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold text-foreground/80 tracking-wide">
              Preço por noite
            </label>
            <span className="text-xs font-semibold text-primary">
              Até R$ {priceMax}
            </span>
          </div>
          <input
            type="range"
            min="200"
            max="8000"
            step="50"
            value={priceMax}
            onChange={(e) => onPriceMaxChange(Number(e.target.value))}
            className="w-full accent-primary cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
            <span>R$ 200</span>
            <span>R$ 8.000+</span>
          </div>
        </div>

        <div className="space-y-3 pt-3 border-t border-border/60">
          <p className="text-xs font-bold text-foreground/80 tracking-wide">
            Vantagens Mais Buscadas
          </p>
          <label className="flex items-center gap-2.5 text-xs text-foreground/80 cursor-pointer hover:text-primary">
            <input
              type="checkbox"
              checked={freeCancellation}
              onChange={(e) => onFreeCancellationChange(e.target.checked)}
              className="size-4 rounded-md accent-primary"
            />
            <span>Cancelamento Grátis</span>
          </label>

          <label className="flex items-center gap-2.5 text-xs text-foreground/80 cursor-pointer hover:text-primary">
            <input
              type="checkbox"
              checked={breakfastOnly}
              onChange={(e) => onBreakfastOnlyChange(e.target.checked)}
              className="size-4 rounded-md accent-primary"
            />
            <span>Café da Manhã Incluso</span>
          </label>
        </div>

        <div className="space-y-2 pt-3 border-t border-border/60">
          <p className="text-xs font-bold text-foreground/80 tracking-wide">
            Avaliação dos Hóspedes
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { label: "Todas", val: 0 },
              { label: "8.5+", val: 8.5 },
              { label: "9.0+", val: 9.0 },
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => onMinRatingChange(item.val)}
                className={`py-1.5 text-xs font-semibold rounded-lg border transition ${
                  minRating === item.val
                    ? "bg-primary text-white border-primary"
                    : "border-border text-foreground/70 hover:bg-muted"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2 pt-3 border-t border-border/60">
          <p className="text-xs font-bold text-foreground/80 tracking-wide">
            Classificação por Estrelas
          </p>
          <div className="flex flex-col gap-2">
            {[5, 4, 3].map((star) => (
              <label
                key={star}
                className="flex items-center gap-2.5 text-xs text-foreground/80 cursor-pointer hover:text-primary"
              >
                <input
                  type="checkbox"
                  checked={selectedStars.includes(star)}
                  onChange={() => onToggleStar(star)}
                  className="size-4 rounded-md accent-primary"
                />
                <span className="flex items-center gap-1 font-medium">
                  {Array.from({ length: star }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                  <span className="ml-1 text-muted-foreground">({star} estrelas)</span>
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
