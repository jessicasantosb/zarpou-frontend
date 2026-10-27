"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Plane,
  ArrowRight,
  Luggage,
  Sparkles,
  ShieldCheck,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Container } from "@/components/shared/container";
import { useTopAirTicket } from "../_hooks/use-top-air-ticket";

const REGION_OPTIONS = [
  { value: "all", label: "Todos os Destinos" },
  { value: "usa", label: "Estados Unidos 🇺🇸" },
  { value: "europe", label: "Europa 🇪🇺" },
] as const;

export function TopAirTicket() {
  const { selectedRegion, onRegionChange, displayedFlights } =
    useTopAirTicket();

  return (
    <section className="py-16 bg-muted/70 select-none">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/15 text-primary text-[11px] font-black tracking-wide mb-2.5">
              <Sparkles className="size-3 text-secondary fill-secondary" />
              Tarifas Internacionais Negociadas
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Passagens para o Exterior
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground mt-1 max-w-xl">
              Descubra o mundo com as maiores companhias aéreas, tarifas
              promocionais com taxas inclusas e parcelamento em até 12x sem
              juros.
            </p>
          </div>

          <Link
            href="/passagens"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition group self-start md:self-auto pb-1"
          >
            <span>Ver todas as passagens</span>
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          <span className="text-[11px] font-bold text-muted-foreground tracking-wide shrink-0 mr-1">
            Regiões:
          </span>
          {REGION_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onRegionChange(option.value)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedRegion === option.value
                  ? "bg-primary text-white  font-bold"
                  : "bg-card text-foreground/70 hover:bg-muted border border-border"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {displayedFlights.map(({ meta, flight }) => {
            const installmentValue = (
              flight.price / (flight.maxInstallments || 12)
            ).toFixed(2);

            const outbound = flight.outbound;

            return (
              <div
                key={flight.id}
                className="group bg-card rounded-3xl border border-border/90 overflow-hidden   transition-all duration-300 flex flex-col sm:flex-row"
              >
                <div className="relative w-full sm:w-52 md:w-56 h-48 sm:h-auto shrink-0 overflow-hidden bg-muted">
                  <Image
                    src={meta.imageUrl}
                    alt={outbound.destinationCity}
                    fill
                    unoptimized={meta.imageUrl.startsWith("data:")}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-foreground/35 sm:bg-gradient-to-r sm:from-transparent sm:to-foreground/30 pointer-events-none" />

                  <div className="absolute top-3 left-3 bg-card/95 backdrop-blur-xs text-slate-900 text-[10px] font-black px-2.5 py-1 rounded-full uppercase  flex items-center gap-1.5">
                    <span>{meta.flag}</span>
                    <span>{meta.country}</span>
                  </div>

                  {flight.discountPercent && flight.discountPercent > 0 && (
                    <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-lg ">
                      {flight.discountPercent}% OFF
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-secondary">
                      Destino Internacional
                    </span>
                    <h3 className="text-xl font-black drop-shadow-md leading-tight">
                      {outbound.destinationCity}
                    </h3>
                  </div>
                </div>

                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between gap-2 pb-3 border-b border-border/60">
                      <div className="flex items-center gap-2">
                        <div className="size-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                          <Plane className="size-4" />
                        </div>
                        <div>
                          <p className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                            <span>{outbound.originIata}</span>
                            <ArrowRight className="size-3 text-muted-foreground" />
                            <span className="text-primary">
                              {outbound.destinationIata}
                            </span>
                          </p>
                          <p className="text-[10px] text-muted-foreground font-medium">
                            Saindo de {outbound.originCity}
                          </p>
                        </div>
                      </div>

                      <span className="text-[10px] font-bold bg-primary/8 text-primary px-2.5 py-1 rounded-lg shrink-0 uppercase">
                        Ida e Volta
                      </span>
                    </div>

                    <div className="pt-3 space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                        <span className="flex items-center gap-1.5">
                          {outbound.airline}
                        </span>
                        <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <Clock className="size-3 text-muted-foreground" />
                          {outbound.stops === 0
                            ? "Voo Direto"
                            : `${outbound.stops} parada (${outbound.stopCity || ""})`}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-muted text-slate-700 px-2 py-0.5 rounded-md">
                          <Luggage className="size-3 text-emerald-600" />
                          Bagagem inclusa
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-muted text-slate-700 px-2 py-0.5 rounded-md">
                          <CheckCircle2 className="size-3 text-primary" />
                          Taxas inclusas
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border/60 flex items-end justify-between gap-3">
                    <div>
                      {flight.originalPrice &&
                        flight.originalPrice > flight.price && (
                          <p className="text-[11px] text-muted-foreground line-through">
                            De R${" "}
                            {flight.originalPrice.toLocaleString("pt-BR")}
                          </p>
                        )}
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs font-bold text-muted-foreground">
                          Por
                        </span>
                        <span className="text-xl font-black text-primary">
                          R$ {flight.price.toLocaleString("pt-BR")}
                        </span>
                      </div>
                      <p className="text-[10px] text-muted-foreground font-medium">
                        ou 12x de R${" "}
                        {Number(installmentValue).toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}{" "}
                        s/ juros
                      </p>
                    </div>

                    <Link
                      href={`/passagens?from=${outbound.originIata}&to=${outbound.destinationIata}`}
                      className="px-4 py-2.5 bg-primary hover:bg-primary/90 text-white font-bold text-xs rounded-xl flex items-center gap-1.5  transition shrink-0 group-hover:bg-primary"
                    >
                      <span>Ver Voos</span>
                      <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground font-medium">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="size-4 text-emerald-600" />
            Todas as taxas e impostos de embarque inclusos
          </span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="size-4 text-secondary" />
            Parcelamento internacional em até 12x sem juros
          </span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="size-4 text-primary" />
            Suporte humanizado em português antes e durante a viagem
          </span>
        </div>
      </Container>
    </section>
  );
}
