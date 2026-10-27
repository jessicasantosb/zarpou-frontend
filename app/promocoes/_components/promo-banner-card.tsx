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

interface PromoBannerCardProps {
  promo: Promotion;
}

export function PromoBannerCard({ promo }: PromoBannerCardProps) {
  const router = useRouter();
  const [isLoadingOffer, setIsLoadingOffer] = useState(false);

  const handleAproveitarOferta = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoadingOffer(true);
    router.push(promo.link);
  };

  return (
    <>
      <div className="group relative h-[380px] w-full rounded-3xl overflow-hidden   transition-all duration-500 border border-border/80 flex flex-col justify-between p-6">
        <Image
          src={promo.imageUrl}
          alt={promo.title}
          fill
          unoptimized={promo.imageUrl?.startsWith("data:")}
          className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/60 to-foreground/35 pointer-events-none" />

        <div className="relative z-10 flex items-start justify-between gap-3">
          <div className="bg-secondary text-primary text-[10px] font-black px-3 py-1.5 rounded-full tracking-wide  flex items-center gap-1.5 backdrop-blur-xs">
            <Zap className="size-3 fill-primary text-primary" />
            <span>{promo.badge}</span>
          </div>

          <div className="bg-emerald-600/95 text-white text-[11px] font-black px-3 py-1.5 rounded-xl  flex items-center gap-1.5 backdrop-blur-xs border border-emerald-400/30">
            <Tag className="size-3" />
            <span>{promo.discountText}</span>
          </div>
        </div>

        <div className="relative z-10 space-y-3">
          <span className="text-[10px] font-extrabold tracking-widest text-secondary flex items-center gap-1">
            ✦ Válido para reserva imediata
          </span>

          <h3 className="font-black text-xl md:text-2xl text-white leading-tight drop-shadow-md group-hover:text-secondary transition-colors line-clamp-2">
            {promo.title}
          </h3>

          <p className="text-xs text-primary-foreground/90 leading-relaxed line-clamp-2 drop-shadow-xs font-normal">
            {promo.subtitle}
          </p>

          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleAproveitarOferta}
              disabled={isLoadingOffer}
              className="w-full sm:w-auto px-5 py-3 bg-secondary hover:bg-secondary/90 text-primary font-black text-xs rounded-xl flex items-center justify-center gap-2.5   transition-transform group-hover:translate-x-1 cursor-pointer disabled:opacity-80"
            >
              {isLoadingOffer ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  <span>Carregando Oferta...</span>
                </>
              ) : (
                <>
                  <span>{promo.buttonText}</span>
                  <ArrowRight className="size-3.5" />
                </>
              )}
            </button>

            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-white/80 font-semibold drop-shadow-xs">
              <ShieldCheck className="size-3.5 text-secondary" />
              Até 12x s/ juros
            </span>
          </div>
        </div>
      </div>

      {isLoadingOffer && (
        <div className="fixed inset-0 z-50 animate-in fade-in duration-200">
          <LoadingScreen
            title="Aproveitando Oferta Exclusiva..."
            subtitle={`Carregando as melhores condições e detalhes para "${promo.title}"`}
            type="hotel"
            fullScreen={true}
          />
        </div>
      )}
    </>
  );
}
