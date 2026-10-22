import { Clock, Copy, QrCode } from "lucide-react";
import { Booking } from "@/types/booking";

interface PixPaymentPanelProps {
  booking: Booking;
  copied: boolean;
  onCopyPix: () => void;
}

export function PixPaymentPanel({
  booking,
  copied,
  onCopyPix,
}: PixPaymentPanelProps) {
  return (
    <div className="bg-amber-50/60 rounded-3xl p-6 md:p-8 border border-amber-200 shadow-sm print:hidden">
      <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-amber-800 font-bold text-sm">
            <Clock className="size-4" />
            Pague agora para garantir sua reserva
          </div>
          <h3 className="text-lg font-black text-foreground">
            Chave Pix Copia e Cola
          </h3>
          <p className="text-xs text-foreground/70 max-w-md">
            Abra o aplicativo do seu banco, escolha{" "}
            <strong>Pix Copia e Cola</strong> e cole o código abaixo. A
            aprovação é imediata!
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            Valor com 5% de desconto:{" "}
            <strong>R$ {booking.pricing.finalAmount.toFixed(2)}</strong>
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 shrink-0">
          <div className="size-36 bg-card p-2 rounded-2xl border border-border shadow-xs flex items-center justify-center">
            <QrCode className="size-28 text-foreground" />
          </div>
          <button
            type="button"
            onClick={onCopyPix}
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm transition cursor-pointer"
          >
            <Copy className="size-3.5" />
            {copied ? "Código Pix Copiado!" : "Copiar Código Pix"}
          </button>
        </div>
      </div>
    </div>
  );
}
