import Image from "next/image";
import { Tag, Zap } from "lucide-react";

interface PromotionPreviewCardProps {
  imageUrl: string;
  badge: string;
  discountText: string;
  title: string;
  subtitle: string;
  buttonText: string;
}

export function PromotionPreviewCard({
  imageUrl,
  badge,
  discountText,
  title,
  subtitle,
  buttonText,
}: PromotionPreviewCardProps) {
  return (
    <div className="space-y-1.5 pt-2 border-t border-border/60">
      <label className="font-bold text-foreground/80 text-[10px]">
        Prévia ao vivo no site (Padrão Home):
      </label>
      <div className="relative h-48 w-full rounded-2xl overflow-hidden  border border-border p-4 flex flex-col justify-between">
        <Image
          src={imageUrl}
          alt="Prévia do banner"
          fill
          unoptimized={imageUrl.startsWith("data:")}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-foreground/30 pointer-events-none" />

        <div className="relative z-10 flex items-start justify-between gap-2">
          <div className="bg-secondary text-primary text-[9px] font-black px-2.5 py-1 rounded-full uppercase  flex items-center gap-1">
            <Zap className="size-2.5 fill-primary text-primary" />
            <span>{badge || "OFERTA EXCLUSIVA"}</span>
          </div>
          <div className="bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md  flex items-center gap-1">
            <Tag className="size-2.5" />
            <span>{discountText || "Até 30% OFF"}</span>
          </div>
        </div>

        <div className="relative z-10 text-white space-y-1">
          <h4 className="font-black text-base leading-snug drop-shadow-md line-clamp-1">
            {title || "Título da sua promoção"}
          </h4>
          {subtitle && (
            <p className="text-[10px] text-white/80 line-clamp-1">{subtitle}</p>
          )}
          <div className="pt-1.5 flex items-center justify-between">
            <span className="inline-block px-3 py-1 bg-secondary text-primary text-[10px] font-black rounded-lg ">
              {buttonText || "Aproveitar Oferta"} →
            </span>
            <span className="text-[9px] text-muted-foreground/60">
              ✦ Em até 12x s/ juros
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
