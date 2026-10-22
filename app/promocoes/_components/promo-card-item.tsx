"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Loader2,
  ShieldCheck,
  Tag,
  Zap,
} from "lucide-react";
import { LoadingScreen } from "@/components/shared/loading-screen";
import { Promotion } from "@/types/promotion";

interface PromoCardItemProps {
  promo: Promotion;
}

export function PromoCardItem({ promo }: PromoCardItemProps) {
  const router = useRouter();
  const [isLoadingOffer, setIsLoadingOffer] = useState(false);

  const handleAproveitarOferta = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoadingOffer(true);
    router.push(promo.link);
  };

  return (
    <>
      <article className="group relative h-[420px] w-full rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-border flex flex-col justify-between p-7 bg-surface-dark">
        <Image
          src={promo.imageUrl}
          alt={promo.title}
          fill
          unoptimized={promo.imageUrl?.startsWith("data:")}
          className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/65 to-foreground/30 pointer-events-none" />

        <div className="relative z-10 flex items-start justify-between gap-3">
          {promo.badge && (
            <div className="bg-secondary text-primary text-[10px] font-black px-3 py-1.5 rounded-full tracking-wide shadow-md flex items-center gap-1.5 backdrop-blur-xs">
              <Zap className="size-3 fill-primary text-primary" />
              <span>{promo.badge}</span>
            </div>
          )}

          {promo.discountText && (
            <div className="bg-emerald-600/95 text-white text-[11px] font-black px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1.5 backdrop-blur-xs border border-emerald-400/30">
              <Tag className="size-3" />
              <span>{promo.discountText}</span>
            </div>
          )}
        </div>

        <div className="relative z-10 space-y-3">
          <span className="text-[10px] font-extrabold tracking-widest text-secondary flex items-center gap-1">
            ✦ Válido para reserva imediata
          </span>

          <h2 className="font-black text-2xl text-white leading-tight drop-shadow-md group-hover:text-secondary transition-colors line-clamp-2">
            {promo.title}
          </h2>

          {promo.subtitle && (
            <p className="text-xs text-primary-foreground/90 leading-relaxed line-clamp-2 drop-shadow-xs">
              {promo.subtitle}
            </p>
          )}

          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleAproveitarOferta}
              disabled={isLoadingOffer}
              className="w-full sm:w-auto px-5 py-3 bg-secondary hover:bg-secondary/90 text-primary font-black text-xs rounded-xl flex items-center justify-center gap-2.5 shadow-lg shadow-secondary/30 transition-transform group-hover:translate-x-1 cursor-pointer disabled:opacity-80"
            >
              {isLoadingOffer ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  <span>Carregando Oferta...</span>
                </>
              ) : (
                <>
                  <span>{promo.buttonText || "Aproveitar Oferta"}</span>
                  <ArrowRight className="size-3.5" />
                </>
              )}
            </button>

            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-white/80 font-semibold">
              <ShieldCheck className="size-3.5 text-secondary" />
              Até 12x s/ juros
            </span>
          </div>
        </div>
      </article>

      {isLoadingOffer && (
        <div className="fixed inset-0 z-50 animate-in fade-in duration-200">
          <LoadingScreen
            title="Aproveitando Oferta Exclusiva..."
            subtitle={`Carregando as melhores condições e tarifas para "${promo.title}"`}
            type="hotel"
            fullScreen={true}
          />
        </div>
      )}
    </>
  );
}
