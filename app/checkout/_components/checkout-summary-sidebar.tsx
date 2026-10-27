import { Hotel, Plane, ShieldCheck } from "lucide-react";
import { PriceSummary } from "@/types/checkout";

interface CheckoutBookingSummary {
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  adults: number;
  children: number;
  selectedRoom?: { name: string };
}

interface CheckoutSummarySidebarProps {
  booking: CheckoutBookingSummary;
  pricing: PriceSummary;
  isHotel: boolean;
  title: string;
  selectedMethod: string;
  installments: number;
}

export function CheckoutSummarySidebar({
  booking,
  pricing,
  isHotel,
  title,
  selectedMethod,
  installments,
}: CheckoutSummarySidebarProps) {
  return (
    <aside className="lg:col-span-4 space-y-6">
      <div className="bg-card rounded-3xl p-6 border border-border  sticky top-24 space-y-5">
        <h3 className="font-bold text-foreground text-base pb-3 border-b border-border/60">
          Resumo da Sua Compra
        </h3>

        <div className="flex items-start gap-3">
          <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            {isHotel ? (
              <Hotel className="size-6" />
            ) : (
              <Plane className="size-6" />
            )}
          </div>
          <div>
            <h4 className="font-bold text-foreground text-sm leading-snug">
              {title}
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              {isHotel
                ? booking.selectedRoom?.name || "Acomodação Standard"
                : "Trecho Aéreo Ida e Volta"}
            </p>
          </div>
        </div>

        <div className="space-y-2.5 text-xs text-muted-foreground border-t border-border/60 pt-3">
          <div className="flex justify-between">
            <span>Datas:</span>
            <span className="font-semibold text-foreground">
              {booking.checkInDate} até {booking.checkOutDate}
            </span>
          </div>
          {isHotel && (
            <div className="flex justify-between">
              <span>Diárias:</span>
              <span className="font-semibold text-foreground">
                {booking.nights} noites
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Hóspedes/Passageiros:</span>
            <span className="font-semibold text-foreground">
              {booking.adults} adultos
              {booking.children > 0 && `, ${booking.children} crianças`}
            </span>
          </div>
        </div>

        <div className="space-y-2 text-xs border-t border-border/60 pt-3">
          <div className="flex justify-between text-foreground/70">
            <span>Subtotal da tarifa:</span>
            <span>R$ {pricing.baseAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-foreground/70">
            <span>Taxas de serviço e turismo:</span>
            <span>R$ {pricing.taxesAndFees.toFixed(2)}</span>
          </div>
          {pricing.addonsAmount > 0 && (
            <div className="flex justify-between text-foreground/70">
              <span>Opcionais selecionados:</span>
              <span>+ R$ {pricing.addonsAmount.toFixed(2)}</span>
            </div>
          )}
          {pricing.discountAmount > 0 && (
            <div className="flex justify-between text-emerald-600 font-semibold">
              <span>Desconto Pix (5%):</span>
              <span>- R$ {pricing.discountAmount.toFixed(2)}</span>
            </div>
          )}
          {(pricing.couponDiscount ?? 0) > 0 && (
            <div className="flex justify-between text-emerald-600 font-semibold">
              <span className="truncate">
                Cupom{" "}
                <span className="font-mono font-bold">{pricing.couponCode}</span>:
              </span>
              <span>- R$ {(pricing.couponDiscount ?? 0).toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between items-baseline pt-2 border-t border-border/60">
            <span className="text-sm font-bold text-foreground">
              Total a pagar:
            </span>
            <span className="text-2xl font-black text-primary">
              R$ {pricing.finalAmount.toFixed(2)}
            </span>
          </div>

          {selectedMethod === "credit_card" && (
            <p className="text-right text-[11px] font-bold text-emerald-600">
              Em até {installments}x de R${" "}
              {(pricing.finalAmount / installments).toFixed(2)} sem juros
            </p>
          )}
        </div>

        <div className="p-3 bg-muted rounded-xl border border-border space-y-1 text-[11px] text-muted-foreground">
          <p className="font-bold text-foreground/80 flex items-center gap-1">
            <ShieldCheck className="size-3.5 text-emerald-600" />
            Compra Segura Zarpou
          </p>
          <p>
            Voucher emitido instantaneamente após a confirmação do pagamento.
          </p>
        </div>
      </div>
    </aside>
  );
}
