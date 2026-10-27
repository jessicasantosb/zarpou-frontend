"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Star,
  MapPin,
  Coffee,
  Waves,
  Wifi,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/shared/container";
import { calculateHotelRating } from "@/lib/rating-utils";
import { Hotel } from "@/types/product";
import { useTopHotels } from "../_hooks/use-top-hotels";

export function TopHotels() {
  const { bookings, cities, selectedCity, onCityChange, filteredHotels } =
    useTopHotels();

  return (
    <section className="py-16 bg-white select-none">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/15 text-primary text-[11px] font-black tracking-wide mb-2.5">
              <Sparkles className="size-3 text-secondary fill-secondary" />
              Curadoria Premium Zarpou
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Hospede-se com Estilo
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground mt-1 max-w-xl">
              Acomodações selecionadas a dedo com alto padrão de conforto,
              localização privilegiada e as melhores avaliações de hóspedes.
            </p>
          </div>

          <Link
            href="/hospedagens"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition group self-start md:self-auto pb-1"
          >
            <span>Ver todas as hospedagens</span>
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          <span className="text-[11px] font-bold text-muted-foreground tracking-wide shrink-0 mr-1">
            Destinos:
          </span>
          {cities.map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => onCityChange(city)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCity === city
                  ? "bg-primary text-white  font-bold"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {city === "all" ? "Todos os Destaques" : city}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredHotels.map((hotel: Hotel) => {
            const installmentValue = (
              hotel.basePricePerNight / (hotel.maxInstallments || 12)
            ).toFixed(2);

            return (
              <div
                key={hotel.id}
                className="group bg-card rounded-3xl border border-border/90 overflow-hidden   transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={hotel.imageUrl}
                      alt={hotel.name}
                      fill
                      unoptimized={hotel.imageUrl?.startsWith("data:")}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-foreground/30" />

                    <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 items-start">
                      {hotel.badges && hotel.badges[0] && (
                        <span className="bg-secondary text-primary text-[10px] font-black px-2.5 py-1 rounded-full tracking-wide ">
                          {hotel.badges[0]}
                        </span>
                      )}
                    </div>

                    {(() => {
                      const ratingInfo = calculateHotelRating(
                        hotel,
                        bookings,
                      );
                      if (!ratingInfo.shouldShow || !ratingInfo.rating)
                        return null;
                      return (
                        <div className="absolute top-3.5 right-3.5 bg-primary/95 text-white backdrop-blur-xs px-2.5 py-1 rounded-xl  flex items-center gap-1.5 text-xs font-black">
                          <Star className="size-3 fill-secondary text-secondary" />
                          <span>{ratingInfo.rating.toFixed(1)}</span>
                        </div>
                      );
                    })()}

                    <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
                      <span className="flex items-center gap-1 font-semibold drop-shadow-xs truncate">
                        <MapPin className="size-3.5 text-secondary shrink-0" />
                        {hotel.neighborhood || hotel.city}, {hotel.state}
                      </span>
                      {(() => {
                        const ratingInfo = calculateHotelRating(
                          hotel,
                          bookings,
                        );
                        if (
                          !ratingInfo.shouldShow ||
                          ratingInfo.reviewCount <= 0
                        )
                          return null;
                        return (
                          <span className="text-[11px] text-white/90 font-medium shrink-0">
                            {ratingInfo.reviewCount} avaliações
                          </span>
                        );
                      })()}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: hotel.stars }).map((_, i) => (
                        <Star
                          key={i}
                          className="size-3.5 fill-amber-400 text-amber-400"
                        />
                      ))}
                      <span className="text-[11px] font-semibold text-muted-foreground ml-1">
                        Hotel {hotel.stars} estrelas
                      </span>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-primary transition line-clamp-1">
                      {hotel.name}
                    </h3>

                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {hotel.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-semibold">
                        <Coffee className="size-3 text-amber-600" />
                        Café Incluso
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-semibold">
                        <Waves className="size-3 text-sky-600" />
                        Piscina
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-semibold">
                        <Wifi className="size-3 text-emerald-600" />
                        Wi-Fi
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-3 border-t border-border/60 bg-muted/50 flex items-end justify-between gap-3">
                  <div>
                    {hotel.originalPricePerNight &&
                      hotel.originalPricePerNight > hotel.basePricePerNight && (
                        <p className="text-[11px] text-muted-foreground line-through">
                          De R${" "}
                          {hotel.originalPricePerNight.toLocaleString("pt-BR")}
                        </p>
                      )}
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs font-bold text-muted-foreground">
                        Por
                      </span>
                      <span className="text-xl font-black text-primary">
                        R$ {hotel.basePricePerNight.toLocaleString("pt-BR")}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-semibold">
                        / noite
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground font-medium">
                      ou até {hotel.maxInstallments}x de R${" "}
                      {Number(installmentValue).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}{" "}
                      s/ juros
                    </p>
                  </div>

                  <Link
                    href={`/hospedagens/${hotel.id}`}
                    className="px-4 py-2.5 bg-primary hover:bg-primary/90 text-white font-bold text-xs rounded-xl flex items-center gap-1.5  transition shrink-0 group-hover:bg-primary"
                  >
                    <span>Ver Quartos</span>
                    <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground font-medium">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="size-4 text-emerald-600" />
            Cancelamento Grátis em hotéis selecionados
          </span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="size-4 text-secondary" />
            Parcelamento facilitado em até 12x sem juros
          </span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="flex items-center gap-1.5">
            <Star className="size-4 text-amber-500 fill-amber-500" />
            Avaliações 100% de hóspedes reais
          </span>
        </div>
      </Container>
    </section>
  );
}
