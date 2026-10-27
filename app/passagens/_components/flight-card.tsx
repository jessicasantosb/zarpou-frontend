import { ArrowRight, Clock, Luggage, Plane } from "lucide-react";
import { Flight } from "@/types/product";
import { formatDateBR } from "@/lib/format-date";

interface FlightCardProps {
  flight: Flight;
  totalTravelers: number;
  departureDate: string;
  returnDate: string;
  onSelect: (flight: Flight) => void;
}

function FlightSegment({
  leg,
  date,
  badgeLabel,
  badgeClassName,
  planeClassName,
}: {
  leg: NonNullable<Flight["returnFlight"]>;
  date: string;
  badgeLabel: string;
  badgeClassName: string;
  planeClassName: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 text-xs font-bold text-foreground/80 mb-1">
        <span className={badgeClassName}>{badgeLabel}</span>
        <span>{date}</span>
        <span className="text-muted-foreground">•</span>
        <span className="text-muted-foreground font-medium">
          {leg.airline} ({leg.flightNumber})
        </span>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="text-left">
          <p className="text-xl font-bold text-foreground">
            {leg.departureTime}
          </p>
          <p className="text-xs font-bold text-primary">{leg.originIata}</p>
          <p className="text-[11px] text-muted-foreground truncate max-w-[120px]">
            {leg.originCity}
          </p>
        </div>

        <div className="flex-1 flex flex-col items-center px-4">
          <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1 mb-1">
            <Clock className="size-3" />
            {leg.duration}
          </span>
          <div className="w-full relative flex items-center justify-center">
            <div className="w-full h-0.5 bg-muted" />
            <Plane className={`size-3.5 absolute rotate-90 ${planeClassName}`} />
          </div>
          <span className="text-[10px] font-semibold text-emerald-600 mt-1">
            {leg.stops === 0
              ? "Voo Direto"
              : `1 escala (${leg.stopCity})`}
          </span>
        </div>

        <div className="text-right">
          <p className="text-xl font-bold text-foreground">{leg.arrivalTime}</p>
          <p className="text-xs font-bold text-primary">{leg.destinationIata}</p>
          <p className="text-[11px] text-muted-foreground truncate max-w-[120px]">
            {leg.destinationCity}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FlightCard({
  flight,
  totalTravelers,
  departureDate,
  returnDate,
  onSelect,
}: FlightCardProps) {
  const totalPrice = flight.price * totalTravelers;
  const installmentValue = (totalPrice / flight.maxInstallments).toFixed(2);

  return (
    <div className="bg-card rounded-2xl border border-border p-5 md:p-6   transition-all duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-border/60">
            <div className="flex items-center gap-2">
              {flight.flag && <span className="text-base">{flight.flag}</span>}
              <span className="text-xs font-bold text-foreground">
                {flight.outbound.destinationCity}
                {flight.country ? ` • ${flight.country}` : ""}
              </span>
            </div>
            <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-muted text-foreground/80 border border-border">
              {flight.outbound.cabinClass || "Classe Econômica"}
            </span>
          </div>

          <FlightSegment
            leg={flight.outbound}
            date={formatDateBR(departureDate || flight.outbound.departureDate)}
            badgeLabel="Ida"
            badgeClassName="bg-primary/10 text-primary px-2 py-0.5 rounded-md"
            planeClassName="text-primary"
          />

          {flight.returnFlight && (
            <div className="pt-3 border-t border-border/60">
              <FlightSegment
                leg={flight.returnFlight}
                date={formatDateBR(
                  returnDate || flight.returnFlight.departureDate,
                )}
                badgeLabel="Volta"
                badgeClassName="bg-secondary/20 text-primary px-2 py-0.5 rounded-md"
                planeClassName="text-secondary"
              />
            </div>
          )}

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 border-t border-border/50">
            <div className="flex items-center gap-1.5 text-xs text-foreground/70">
              <Luggage className="size-3.5 text-emerald-600" />
              <span className="font-medium">
                {flight.outbound.baggageIncluded
                  ? "Inclui bagagem de mão (10kg) + despachada (23kg)"
                  : flight.outbound.handBaggageIncluded
                    ? "Inclui bagagem de mão (10kg)"
                    : "Sem bagagem inclusa"}
              </span>
            </div>

            {flight.highlights && flight.highlights.length > 0 && (
              <div className="flex flex-wrap gap-1.5 items-center">
                {flight.highlights.map((hl) => (
                  <span
                    key={hl}
                    className="text-[10px] font-semibold bg-primary/5 text-primary border border-primary/15 px-2 py-0.5 rounded-md"
                  >
                    {hl}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 lg:border-l lg:border-border/60 lg:pl-6 flex flex-col justify-between h-full pt-4 lg:pt-0 border-t border-border/60 lg:border-t-0">
          <div>
            {flight.originalPrice && (
              <p className="text-xs text-muted-foreground line-through">
                R$ {flight.originalPrice}
              </p>
            )}
            <p className="text-xs text-muted-foreground font-medium">
              Preço por passageiro
            </p>
            <p className="text-2xl font-extrabold text-primary">
              R$ {flight.price}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Total para {totalTravelers}{" "}
              {totalTravelers === 1 ? "pessoa" : "pessoas"}:{" "}
              <strong>R$ {totalPrice}</strong>
            </p>
            <p className="text-xs font-bold text-emerald-600 mt-1">
              Em até {flight.maxInstallments}x de R$ {installmentValue} sem
              juros
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSelect(flight)}
            className="mt-4 w-full py-3 bg-secondary hover:bg-secondary/90 text-primary font-bold text-sm rounded-xl flex items-center justify-center gap-2   transition transform hover:scale-102 cursor-pointer"
          >
            Comprar Voo
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
