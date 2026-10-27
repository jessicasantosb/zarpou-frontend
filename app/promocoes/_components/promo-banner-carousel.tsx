"use client";

import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/shared/container";
import { usePromoBannerCarousel } from "../_hooks/use-promo-banner-carousel";
import { PromoBannerCard } from "./promo-banner-card";

export function PromoBannerCarousel() {
  const {
    mounted,
    emblaRef,
    emblaApi,
    canScrollPrev,
    canScrollNext,
    activePromos,
  } = usePromoBannerCarousel();

  if (!mounted || activePromos.length === 0) return null;

  return (
    <section className="py-14 bg-muted/70 select-none overflow-hidden">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/15 text-primary text-[11px] font-black tracking-wide mb-2.5">
              <Sparkles className="size-3 text-secondary fill-secondary" />
              Oportunidades Imperdíveis
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
              Ofertas & Promoções Zarpou
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground mt-1 max-w-xl">
              Condições exclusivas com até 35% de desconto e parcelamento em
              até 12x sem juros para os destinos mais desejados.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            {activePromos.length > 3 && (
              <div className="flex items-center gap-1.5 bg-card p-1 rounded-2xl border border-border ">
                <button
                  type="button"
                  onClick={() => emblaApi?.scrollPrev()}
                  disabled={!canScrollPrev}
                  className="size-9 rounded-xl flex items-center justify-center text-foreground/80 hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                  title="Ofertas anteriores"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => emblaApi?.scrollNext()}
                  disabled={!canScrollNext}
                  className="size-9 rounded-xl flex items-center justify-center text-foreground/80 hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                  title="Próximas ofertas"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            )}

            <Link
              href="/promocoes"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition group pb-1"
            >
              <span>Ver todas as promoções</span>
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {activePromos.length <= 3 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activePromos.map((promo) => (
              <PromoBannerCard key={promo.id} promo={promo} />
            ))}
          </div>
        ) : (
          <div className="overflow-hidden -mx-4 px-4" ref={emblaRef}>
            <div className="flex gap-6">
              {activePromos.map((promo) => (
                <div
                  key={promo.id}
                  className="min-w-0 shrink-0 grow-0 basis-full sm:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)]"
                >
                  <PromoBannerCard promo={promo} />
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
