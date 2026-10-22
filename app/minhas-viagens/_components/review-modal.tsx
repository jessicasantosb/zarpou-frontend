import type React from "react";
import { Loader2, Star, X } from "lucide-react";
import type { Booking } from "@/types/booking";

const ratingDescriptions: Record<number, string> = {
  1: "Péssimo 😞 - Deixou muito a desejar",
  2: "Ruim 😕 - Vários aspectos a melhorar",
  3: "Razoável 😐 - Atendeu ao básico prometido",
  4: "Muito Bom 😊 - Excelente experiência de viagem",
  5: "Incrível / Excelente 🤩 - Superou todas as expectativas!",
};

interface ReviewModalProps {
  booking: Booking;
  ratingStars: number;
  hoverStars: number;
  reviewComment: string;
  isSubmittingReview: boolean;
  onRatingStarsChange: (stars: number) => void;
  onHoverStarsChange: (stars: number) => void;
  onReviewCommentChange: (comment: string) => void;
  onClose: () => void;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export function ReviewModal({
  booking,
  ratingStars,
  hoverStars,
  reviewComment,
  isSubmittingReview,
  onRatingStarsChange,
  onHoverStarsChange,
  onReviewCommentChange,
  onClose,
  onSubmit,
}: ReviewModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="bg-card rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-xl border border-border/60 space-y-6 relative animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          onClick={onClose}
          disabled={isSubmittingReview}
          className="absolute top-5 right-5 p-2 rounded-xl text-muted-foreground hover:text-foreground/80 hover:bg-muted transition cursor-pointer disabled:opacity-50"
        >
          <X className="size-5" />
        </button>

        <div className="space-y-1">
          <span className="text-[11px] font-bold text-primary tracking-wide">
            Feedback do Viajante
          </span>
          <h3 className="text-xl font-black text-foreground">
            Avaliar Experiência de Viagem
          </h3>
          <p className="text-xs text-muted-foreground">
            {booking.productType === "hotel"
              ? booking.hotel?.name
              : `${booking.flight?.outbound.originCity} → ${booking.flight?.outbound.destinationCity}`}
            {" • "}
            {booking.checkInDate}
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div className="space-y-2 text-center bg-muted/50 p-5 rounded-2xl border border-border/60">
            <span className="text-xs font-bold text-foreground/80 block">
              Quantas estrelas você daria para esta experiência?
            </span>

            <div className="flex items-center justify-center gap-2 py-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const activeScore = hoverStars || ratingStars;
                const isFilled = star <= activeScore;

                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => onRatingStarsChange(star)}
                    onMouseEnter={() => onHoverStarsChange(star)}
                    onMouseLeave={() => onHoverStarsChange(0)}
                    className="p-1 hover:scale-115 transition-transform duration-150 cursor-pointer focus:outline-hidden"
                  >
                    <Star
                      className={`size-8 transition-colors ${
                        isFilled
                          ? "fill-amber-400 text-amber-400 drop-shadow-xs"
                          : "text-white/90 hover:text-amber-200"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <p className="text-xs font-bold text-primary transition-all">
              {ratingDescriptions[hoverStars || ratingStars]}
            </p>
          </div>

          <div className="space-y-1.5 text-xs">
            <label className="font-bold text-foreground/80 block">
              Comentário ou Dica para outros viajantes (opcional)
            </label>
            <textarea
              rows={4}
              value={reviewComment}
              onChange={(e) => onReviewCommentChange(e.target.value)}
              placeholder="Conte o que mais gostou (café da manhã, conforto do quarto, atendimento da recepção, pontualidade do voo)..."
              className="w-full p-3.5 rounded-2xl border border-border text-xs text-foreground outline-hidden focus:border-primary focus:ring-1 focus:ring-primary/20 transition resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmittingReview}
              className="px-5 py-2.5 rounded-xl border border-border text-foreground/70 hover:bg-muted font-bold text-xs transition cursor-pointer disabled:opacity-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isSubmittingReview}
              className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmittingReview ? (
                <>
                  <Loader2 className="size-4 animate-spin text-white" />
                  <span>Salvando...</span>
                </>
              ) : (
                <>
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                  <span>Enviar Avaliação</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
