import Link from "next/link";
import { CheckCircle2, Printer, Share2 } from "lucide-react";
import { Booking } from "@/types/booking";

interface BookingSuccessBannerProps {
  booking: Booking;
  isPix: boolean;
  primaryEmail: string;
  whatsapp: string;
}

export function BookingSuccessBanner({
  booking,
  isPix,
  primaryEmail,
  whatsapp,
}: BookingSuccessBannerProps) {
  return (
    <div className="bg-card rounded-3xl p-6 md:p-8 border border-border  text-center relative overflow-hidden print:border-none print:shadow-none">
      <div className="size-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
        <CheckCircle2 className="size-10" />
      </div>

      <span className="text-xs font-bold text-emerald-600 tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
        {isPix
          ? "Reserva Registrada • Aguardando Pix"
          : "Pagamento Aprovado • Reserva Confirmada"}
      </span>

      <h1 className="text-2xl md:text-3xl font-black text-foreground mt-3">
        {isPix
          ? "Quase tudo pronto para sua viagem!"
          : "Parabéns! Sua viagem está confirmada!"}
      </h1>

      <p className="text-sm text-muted-foreground max-w-lg mx-auto mt-2 leading-relaxed">
        Enviamos os detalhes da reserva e seu voucher para o e-mail{" "}
        <strong className="text-foreground">{primaryEmail}</strong>.
      </p>

      <div className="mt-6 inline-block bg-muted border-2 border-dashed border-primary/40 rounded-2xl px-8 py-3">
        <p className="text-[11px] font-bold text-muted-foreground tracking-wide">
          Código Localizador Zarpou (PNR)
        </p>
        <p className="text-2xl font-black text-primary font-mono tracking-widest mt-0.5">
          {booking.locatorCode}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-6 print:hidden">
        <button
          type="button"
          onClick={() => window.print()}
          className="px-5 py-2.5 bg-muted hover:bg-muted text-foreground/80 font-bold text-xs rounded-xl flex items-center gap-2 transition cursor-pointer"
        >
          <Printer className="size-4" />
          Imprimir Voucher / Salvar PDF
        </button>

        <Link
          href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(
            `Olá! Acabei de fazer a reserva com o localizador ${booking.locatorCode} e gostaria de confirmar.`,
          )}`}
          target="_blank"
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition "
        >
          <Share2 className="size-4" />
          Falar com a Zarpou no WhatsApp
        </Link>
      </div>
    </div>
  );
}
