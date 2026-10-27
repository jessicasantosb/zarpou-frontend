"use client";

import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  ArrowRight,
  Sparkles,
  Hotel,
  Tag,
  Compass,
  CheckCircle2,
} from "lucide-react";
import { Container } from "@/components/shared/container";
import { DestinationItem } from "@/types/destination";
import { useTopDestination } from "../_hooks/use-top-destination";

const CATEGORY_OPTIONS = [
  { value: "all", label: "Todos os Destinos" },
  { value: "national", label: "Destinos Nacionais 🇧🇷" },
  { value: "international", label: "Destinos Internacionais 🌎" },
] as const;

export function TopDestination() {
  const { destinations, selectedCategory, onCategoryChange } =
    useTopDestination();

  return (
    <section className="py-16 bg-card select-none">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/15 text-primary text-[11px] font-black tracking-wide mb-2.5">
              <Compass className="size-3 text-secondary fill-secondary" />
              Roteiros Mais Desejados
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
              Lugares Imperdíveis
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground mt-1 max-w-xl">
              Cidades fascinantes e roteiros inesquecíveis selecionados para
              inspirar sua próxima aventura pelo Brasil e pelo mundo.
            </p>
          </div>

          <Link
            href="/destinos"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition group self-start md:self-auto pb-1"
          >
            <span>Ver todos os destinos &amp; pacotes</span>
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          <span className="text-[11px] font-bold text-muted-foreground tracking-wide shrink-0 mr-1">
            Categorias:
          </span>
          {CATEGORY_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onCategoryChange(option.value)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === option.value
                  ? "bg-primary text-white  font-bold"
                  : "bg-muted text-foreground/70 hover:bg-muted"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest: DestinationItem) => {
            const destinationLink = `/destinos?cidade=${encodeURIComponent(dest.title)}`;

            return (
              <Link
                key={dest.id}
                href={destinationLink}
                className="group relative h-[420px] rounded-3xl overflow-hidden   transition-all duration-500 border border-border/90 flex flex-col justify-between p-5 cursor-pointer"
              >
                <Image
                  src={
                    dest.image_url ||
                    "https://images.pexels.com/photos/12039523/pexels-photo-12039523.jpeg"
                  }
                  alt={dest.title}
                  fill
                  unoptimized={Boolean(dest.image_url?.startsWith("data:"))}
                  className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/45 to-foreground/30 pointer-events-none" />

                <div className="relative z-10 flex items-start justify-between gap-2">
                  <div className="bg-card/95 backdrop-blur-xs text-foreground text-[10px] font-black px-2.5 py-1 rounded-full uppercase  flex items-center gap-1.5">
                    <span>{dest.flag}</span>
                    <span>{dest.country}</span>
                  </div>

                  <div className="bg-secondary text-primary text-[9px] font-black px-2 py-0.5 rounded-md tracking-wide ">
                    {dest.tag}
                  </div>
                </div>

                <div className="relative z-10 space-y-2.5 text-white">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-secondary flex items-center gap-1">
                      <MapPin className="size-3" />
                      {dest.bestTimeToVisit
                        ? `Época: ${dest.bestTimeToVisit}`
                        : "Destino em Destaque"}
                    </span>
                    <h3 className="text-2xl font-black leading-tight drop-shadow-md group-hover:text-secondary transition-colors">
                      {dest.title}
                      {dest.state ? `, ${dest.state}` : ""}
                    </h3>
                  </div>

                  <p className="text-xs text-primary-foreground/90 line-clamp-2 leading-relaxed drop-shadow-xs font-normal">
                    {dest.description}
                  </p>

                  <div className="pt-2 border-t border-white/15 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-[11px] text-white/90 font-medium">
                      <Hotel className="size-3.5 text-secondary" />+
                      {dest.accommodationsCount} opções
                    </span>

                    <span className="flex items-center gap-1 text-[11px] font-extrabold text-emerald-400">
                      <Tag className="size-3" />A partir de R${" "}
                      {dest.startingPrice}
                    </span>
                  </div>

                  <div className="pt-2">
                    <span className="w-full py-2.5 px-4 bg-card/15 hover:bg-secondary hover:text-primary backdrop-blur-xs text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition border border-white/20 group-hover:bg-secondary group-hover:text-primary group-hover:border-transparent">
                      <span>Explorar {dest.title}</span>
                      <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground font-medium">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="size-4 text-emerald-600" />
            Roteiros completos com aéreo e hotel integrados
          </span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="size-4 text-secondary" />
            Parcelamento de pacotes em até 12x sem juros
          </span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="flex items-center gap-1.5">
            <Compass className="size-4 text-primary" />
            Consultoria humanizada para planejar seu roteiro
          </span>
        </div>
      </Container>
    </section>
  );
}
