import Link from "next/link";
import { Calendar, Compass, Printer, Sparkles } from "lucide-react";
import type { Booking } from "@/types/booking";

interface NextTripBannerProps {
  nextTrip: { booking: Booking; diffDays: number } | null;
}

export function NextTripBanner({ nextTrip }: NextTripBannerProps) {
  if (!nextTrip) return null;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-primary via-primary-light to-primary text-white p-6 md:p-7  border border-white/10">
      <div className="absolute -top-16 -right-16 size-48 rounded-full bg-secondary/10 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 size-48 rounded-full bg-primary/30 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary border border-secondary/30 text-[11px] font-black tracking-wide">
            <Sparkles className="size-3.5 text-secondary animate-spin" />
            <span>Próxima Viagem Confirmada</span>
          </div>

          <h3 className="text-xl md:text-2xl font-black text-white leading-tight">
            {nextTrip.diffDays === 0 ? (
              "🎉 Sua viagem é HOJE! Prepare as malas e boa viagem!"
            ) : nextTrip.diffDays === 1 ? (
              "✈️ Falta apenas 1 dia para o seu embarque!"
            ) : (
              <>
                Faltam apenas{" "}
                <span className="text-secondary">{nextTrip.diffDays} dias</span>{" "}
                para sua viagem!
              </>
            )}
          </h3>

          <p className="text-xs md:text-sm text-white/90 flex items-center gap-2">
            <Compass className="size-4 text-secondary shrink-0" />
            <span>
              {nextTrip.booking.productType === "hotel"
                ? `${nextTrip.booking.hotel?.name} • ${nextTrip.booking.hotel?.city}, ${nextTrip.booking.hotel?.state}`
                : `${nextTrip.booking.flight?.outbound.originCity} → ${nextTrip.booking.flight?.outbound.destinationCity}`}
            </span>
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-white/90">
            <span className="flex items-center gap-1.5 bg-card/10 px-3 py-1 rounded-lg backdrop-blur-xs">
              <Calendar className="size-3.5 text-secondary" />
              Check-in: <strong>{nextTrip.booking.checkInDate}</strong>
            </span>
            <span className="flex items-center gap-1.5 bg-card/10 px-3 py-1 rounded-lg backdrop-blur-xs font-mono">
              Localizador: <strong>{nextTrip.booking.locatorCode}</strong>
            </span>
          </div>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
          <div className="bg-card/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-center sm:text-right">
            <div className="text-2xl md:text-3xl font-black text-secondary leading-none">
              {nextTrip.diffDays}
            </div>
            <span className="text-[10px] font-bold tracking-wide text-white/90">
              {nextTrip.diffDays === 1 ? "dia restante" : "dias restantes"}
            </span>
          </div>

          <div className="flex gap-2">
            <Link
              href={`/reserva/confirmada/${nextTrip.booking.id}`}
              className="px-4 py-2 bg-secondary hover:bg-secondary/90 text-primary font-black text-xs rounded-xl flex items-center gap-1.5  transition whitespace-nowrap cursor-pointer"
            >
              <Printer className="size-3.5" />
              Ver Voucher
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
