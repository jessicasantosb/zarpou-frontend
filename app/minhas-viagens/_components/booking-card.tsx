import Link from "next/link";
import type React from "react";
import {
  BadgeCheck,
  Calendar,
  Check,
  Clock,
  Copy,
  Hotel,
  MapPin,
  MessageCircle,
  Plane,
  Printer,
  Star,
} from "lucide-react";
import type { Booking } from "@/types/booking";

interface BookingCardProps {
  booking: Booking;
  copiedPnr: string | null;
  isTripCompleted: boolean;
  onCopyPnr: (locator: string) => void;
  onOpenReview: (booking: Booking) => void;
}

export function BookingCard({
  booking,
  copiedPnr,
  isTripCompleted,
  onCopyPnr,
  onOpenReview,
}: BookingCardProps) {
  const b = booking;
  const isHotel = b.productType === "hotel";
  const title = isHotel
    ? b.hotel?.name || "Hospedagem Zarpou"
    : b.flight?.outbound.originCity + " → " + b.flight?.outbound.destinationCity;

  const whatsappMessage = encodeURIComponent(
    `Olá, equipe Zarpou! Preciso de suporte para a minha reserva com código localizador ${b.locatorCode} (${title}).`,
  );
  const whatsappUrl = `https://wa.me/5511999999999?text=${whatsappMessage}`;

  return (
    <div className="bg-card rounded-3xl p-6 border border-border shadow-sm hover:shadow-md transition-all duration-300 space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-border/60">
        <div className="flex items-center gap-3">
          <div className="size-11 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            {isHotel ? (
              <Hotel className="size-5" />
            ) : (
              <Plane className="size-5" />
            )}
          </div>
          <div>
            <span className="text-[10px] font-bold text-muted-foreground tracking-wide">
              Código Localizador (PNR)
            </span>
            <div className="flex items-center gap-2">
              <p className="text-base font-black text-primary font-mono tracking-tight">
                {b.locatorCode}
              </p>
              <button
                type="button"
                onClick={() => onCopyPnr(b.locatorCode)}
                title="Copiar código localizador"
                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-muted hover:bg-muted text-foreground/70 text-[11px] font-semibold transition cursor-pointer"
              >
                {copiedPnr === b.locatorCode ? (
                  <>
                    <Check className="size-3 text-emerald-600 stroke-[3]" />
                    <span className="text-emerald-700 font-bold">
                      Copiado!
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {b.status === "confirmada" && isTripCompleted && (
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-muted text-foreground/80 border border-border flex items-center gap-1">
              <BadgeCheck className="size-3.5 text-primary" />
              Viagem Concluída
            </span>
          )}

          {b.status === "confirmada" && !isTripCompleted && (
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              ✓ Confirmada
            </span>
          )}

          {b.status === "pendente_pagamento" && (
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
              <Clock className="size-3 text-amber-600" />
              Aguardando Pagamento
            </span>
          )}

          {b.status === "concluida" && (
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-muted text-foreground/80 border border-border flex items-center gap-1">
              <BadgeCheck className="size-3.5 text-primary" />
              Viagem Concluída
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
        <div className="sm:col-span-8 space-y-1.5">
          <h3 className="font-bold text-foreground text-lg leading-snug">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            <MapPin className="size-3.5 text-primary shrink-0" />
            {isHotel
              ? `${b.hotel?.neighborhood || "Centro"}, ${b.hotel?.city} - ${b.hotel?.state}`
              : `Voo ${b.flight?.outbound.airline} (${b.flight?.outbound.originIata} - ${b.flight?.outbound.destinationIata})`}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-foreground/70 pt-1">
            <span className="flex items-center gap-1 bg-muted px-2.5 py-1 rounded-lg">
              <Calendar className="size-3.5 text-primary" />
              {b.checkInDate} até {b.checkOutDate}
            </span>
            {b.nights && (
              <span className="flex items-center gap-1 bg-muted px-2.5 py-1 rounded-lg">
                <Clock className="size-3.5 text-primary" />
                {b.nights} {b.nights === 1 ? "noite" : "noites"}
              </span>
            )}
          </div>
        </div>

        <div className="sm:col-span-4 sm:text-right space-y-2">
          <div>
            <span className="text-[11px] text-muted-foreground">Total pago:</span>
            <p className="text-xl font-black text-primary">
              R$ {b.pricing.finalAmount.toFixed(2)}
            </p>
          </div>

          <div className="flex flex-wrap sm:justify-end gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Falar com especialista sobre esta reserva"
              className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs transition"
            >
              <MessageCircle className="size-3.5 text-emerald-600" />
              <span>Ajuda WhatsApp</span>
            </a>

            <Link
              href={`/reserva/confirmada/${b.id}`}
              className="px-3.5 py-2 bg-primary hover:bg-primary/90 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition"
            >
              <Printer className="size-3.5" />
              <span>Voucher</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {b.review ? (
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-bold text-foreground/80">
              Sua avaliação da viagem:
            </span>
            <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-lg">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`size-3.5 ${
                      star <= b.review!.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-white/90"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-black text-amber-800 ml-1">
                {b.review.rating}.0
              </span>
            </div>
            {b.review.comment && (
              <span className="text-xs text-muted-foreground italic max-w-md truncate">
                &ldquo;{b.review.comment}&rdquo;
              </span>
            )}
            <button
              type="button"
              onClick={() => onOpenReview(b)}
              className="text-[11px] font-bold text-primary hover:underline cursor-pointer ml-1"
            >
              Editar Avaliação
            </button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2">
            <div className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Star className="size-3.5 text-amber-500 fill-amber-400" />
              <span>
                {isTripCompleted
                  ? "Como foi sua viagem? Avalie a experiência com estrelas e comente."
                  : "Já viajou ou utilizou o serviço? Compartilhe sua avaliação."}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onOpenReview(b)}
              className="px-3.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto shadow-xs"
            >
              <Star className="size-3.5 fill-amber-400 text-amber-400" />
              <span>Avaliar Viagem</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
