import Image from "next/image";
import type { UseFormReturn } from "react-hook-form";
import { Eye, MessageCircle } from "lucide-react";
import type { HeroConfigFormValues } from "@/schemas/hero-config";
import { cn } from "@/lib/utils";

interface HeroPreviewCardProps {
  form: UseFormReturn<HeroConfigFormValues>;
}

export function HeroPreviewCard({ form }: HeroPreviewCardProps) {
  const values = form.watch();

  const hasTitle = Boolean(
    (values.titlePrefix || "").trim() ||
      (values.titleHighlight || "").trim() ||
      (values.titleSuffix || "").trim(),
  );
  const hasSubtitle = Boolean((values.subtitle || "").trim());
  const hasText = hasTitle || hasSubtitle;

  return (
    <div className="space-y-3 rounded-3xl border border-white/10 bg-surface-dark p-6 text-white ">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs font-bold tracking-wide text-secondary">
          <Eye className="size-4 text-secondary" />
          Prévia em Tempo Real na Home
        </span>
        <span className="text-[10px] text-muted-foreground">
          Fundo atual: {values.bgType === "image" ? "Imagem" : "Vídeo"}
        </span>
      </div>

      <div
        className={cn(
          "relative flex h-64 w-full flex-col items-center overflow-hidden rounded-2xl border border-white/10 p-6 text-center  sm:h-72",
          hasText ? "justify-center" : "justify-end pb-6",
        )}
      >
        {values.bgType === "image" && values.bgImageUrl ? (
          <Image
            src={values.bgImageUrl}
            alt="Prévia Hero"
            fill
            unoptimized={values.bgImageUrl.startsWith("data:")}
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-card/10">
            <span className="text-xs text-muted-foreground">
              🎥 Vídeo de Fundo ({values.bgVideoUrl || "/hero.mp4"})
            </span>
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-black/65" />

        {!hasText && (
          <div className="absolute top-3 left-3 z-20">
            <span className="rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-[10px] font-semibold text-secondary backdrop-blur-xs">
              Modo Fundo Limpo • Botão na parte inferior
            </span>
          </div>
        )}

        <div className={cn("relative z-10 max-w-lg", hasText && "space-y-3")}>
          {hasTitle && (
            <h2 className="text-2xl font-black leading-tight sm:text-3xl">
              {values.titlePrefix && `${values.titlePrefix} `}
              {values.titleHighlight && (
                <span className="text-secondary underline decoration-secondary/50">
                  {values.titleHighlight}
                </span>
              )}
              {values.titleSuffix && ` ${values.titleSuffix}`}
            </h2>
          )}

          {hasSubtitle && (
            <p className="text-xs leading-relaxed text-white/80 line-clamp-2 sm:text-sm">
              {values.subtitle}
            </p>
          )}

          <div className={hasText ? "pt-2" : ""}>
            <span className="inline-flex items-center gap-2 rounded-xl bg-secondary px-6 py-2.5 text-xs font-black text-primary  ">
              <MessageCircle className="size-3.5" />
              {values.ctaText || "Falar com um Especialista"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
