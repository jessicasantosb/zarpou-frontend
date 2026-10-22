import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  FileText,
  Loader2,
  QrCode,
  ShieldCheck,
  Ticket,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AppliedCoupon, PriceSummary } from "@/types/checkout";

interface InstallmentOptionItem {
  num: number;
  amount: string;
}

interface PaymentStepProps {
  pricing: PriceSummary;
  selectedMethod: string;
  installments: number;
  installmentOptions: InstallmentOptionItem[];
  cardNumber: string;
  cardHolder: string;
  cardExpiry: string;
  cardCvv: string;
  isSubmitting: boolean;
  couponInput: string;
  appliedCoupon: AppliedCoupon | null;
  isApplyingCoupon: boolean;
  onSelectMethod: (method: "credit_card" | "pix" | "boleto") => void;
  onCardNumberChange: (value: string) => void;
  onCardHolderChange: (value: string) => void;
  onCardExpiryChange: (value: string) => void;
  onCardCvvChange: (value: string) => void;
  onInstallmentsChange: (value: number) => void;
  onCouponInputChange: (value: string) => void;
  onApplyCoupon: () => void;
  onRemoveCoupon: () => void;
  onBack: () => void;
  onFinalize: () => void;
}

export function PaymentStep({
  pricing,
  selectedMethod,
  installments,
  installmentOptions,
  cardNumber,
  cardHolder,
  cardExpiry,
  cardCvv,
  isSubmitting,
  couponInput,
  appliedCoupon,
  isApplyingCoupon,
  onSelectMethod,
  onCardNumberChange,
  onCardHolderChange,
  onCardExpiryChange,
  onCardCvvChange,
  onInstallmentsChange,
  onCouponInputChange,
  onApplyCoupon,
  onRemoveCoupon,
  onBack,
  onFinalize,
}: PaymentStepProps) {
  return (
    <div className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-xs space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-border/60">
        <div>
          <h2 className="text-xl font-extrabold text-foreground">
            3. Escolha a Forma de Pagamento
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Transação 100% segura com criptografia SSL 256-bit e checkout
            transparente.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
          <ShieldCheck className="size-4" />
          Ambiente Protegido
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <button
          type="button"
          onClick={() => onSelectMethod("credit_card")}
          className={cn(
            "p-4 rounded-2xl border-2 flex flex-col items-center justify-center text-center transition cursor-pointer",
            selectedMethod === "credit_card"
              ? "border-primary bg-primary/5 text-primary font-bold shadow-xs"
              : "border-border hover:border-input text-muted-foreground",
          )}
        >
          <CreditCard className="size-6 mb-1 text-primary" />
          <span className="text-xs font-bold">Cartão de Crédito</span>
          <span className="text-[10px] text-emerald-600 font-semibold mt-0.5">
            Até 12x s/ juros
          </span>
        </button>

        <button
          type="button"
          onClick={() => onSelectMethod("pix")}
          className={cn(
            "p-4 rounded-2xl border-2 flex flex-col items-center justify-center text-center transition cursor-pointer relative overflow-hidden",
            selectedMethod === "pix"
              ? "border-primary bg-primary/5 text-primary font-bold shadow-xs"
              : "border-border hover:border-input text-muted-foreground",
          )}
        >
          <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[9px] font-black px-2 py-0.5 rounded-bl-lg uppercase">
            5% OFF
          </div>
          <QrCode className="size-6 mb-1 text-emerald-600" />
          <span className="text-xs font-bold">Pix Instantâneo</span>
          <span className="text-[10px] text-muted-foreground font-semibold mt-0.5">
            Liberação na hora
          </span>
        </button>

        <button
          type="button"
          onClick={() => onSelectMethod("boleto")}
          className={cn(
            "p-4 rounded-2xl border-2 flex flex-col items-center justify-center text-center transition cursor-pointer",
            selectedMethod === "boleto"
              ? "border-primary bg-primary/5 text-primary font-bold shadow-xs"
              : "border-border hover:border-input text-muted-foreground",
          )}
        >
          <FileText className="size-6 mb-1 text-foreground/80" />
          <span className="text-xs font-bold">Boleto Bancário</span>
          <span className="text-[10px] text-muted-foreground font-semibold mt-0.5">
            À vista
          </span>
        </button>
      </div>

      <div className="rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-4 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-foreground">
          <Ticket className="size-4 text-primary" />
          Tem um cupom de desconto?
        </div>

        {appliedCoupon ? (
          <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5">
            <div className="flex items-center gap-2 text-xs min-w-0">
              <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
              <span className="font-mono font-black text-emerald-700 tracking-wide truncate">
                {appliedCoupon.code}
              </span>
              {(pricing.couponDiscount ?? 0) > 0 && (
                <span className="text-emerald-700 font-semibold shrink-0">
                  - R$ {(pricing.couponDiscount ?? 0).toFixed(2)}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={onRemoveCoupon}
              className="flex items-center gap-1 text-[11px] font-semibold text-muted-foreground hover:text-foreground transition cursor-pointer shrink-0"
            >
              <X className="size-3.5" />
              Remover
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              maxLength={50}
              placeholder="Digite seu cupom"
              value={couponInput}
              onChange={(event) => onCouponInputChange(event.target.value.toUpperCase())}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  onApplyCoupon();
                }
              }}
              className="flex-1 h-11 px-3.5 rounded-xl border border-input text-xs font-mono font-bold uppercase tracking-wide outline-hidden focus:border-primary bg-card"
            />
            <button
              type="button"
              onClick={onApplyCoupon}
              disabled={isApplyingCoupon}
              className="px-4 h-11 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover transition disabled:opacity-60 cursor-pointer shrink-0"
            >
              {isApplyingCoupon ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Aplicar"
              )}
            </button>
          </div>
        )}
      </div>

      {selectedMethod === "credit_card" && (
        <div className="space-y-4 pt-2">
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground/80 tracking-wide">
              Número do Cartão *
            </label>
            <input
              type="text"
              maxLength={19}
              placeholder="0000 0000 0000 0000"
              value={cardNumber}
              onChange={(event) => onCardNumberChange(event.target.value)}
              className="w-full h-12 px-4 rounded-xl border border-input text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-hidden"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground/80 tracking-wide">
              Nome impresso no Cartão *
            </label>
            <input
              type="text"
              placeholder="NOME COMO NO CARTÃO"
              value={cardHolder}
              onChange={(event) => onCardHolderChange(event.target.value)}
              className="w-full h-12 px-4 rounded-xl border border-input text-sm font-medium uppercase focus:ring-2 focus:ring-primary/20 focus:border-primary outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground/80 tracking-wide">
                Validade (MM/AA) *
              </label>
              <input
                type="text"
                maxLength={5}
                placeholder="12/29"
                value={cardExpiry}
                onChange={(event) => onCardExpiryChange(event.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-input text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-hidden"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground/80 tracking-wide">
                Código CVV *
              </label>
              <input
                type="password"
                maxLength={4}
                placeholder="123"
                value={cardCvv}
                onChange={(event) => onCardCvvChange(event.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-input text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-hidden"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground/80 tracking-wide">
              Número de Parcelas *
            </label>
            <select
              value={installments}
              onChange={(event) =>
                onInstallmentsChange(Number(event.target.value))
              }
              className="w-full h-12 px-4 rounded-xl border border-input text-sm font-medium bg-card focus:ring-2 focus:ring-primary/20 focus:border-primary outline-hidden"
            >
              {installmentOptions.map((option) => (
                <option key={option.num} value={option.num}>
                  {option.num}x de R$ {option.amount} sem juros (Total: R${" "}
                  {pricing.finalAmount.toFixed(2)})
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {selectedMethod === "pix" && (
        <div className="p-6 bg-muted rounded-2xl border border-border text-center space-y-3">
          <div className="size-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <QrCode className="size-6" />
          </div>
          <h3 className="font-bold text-foreground text-base">
            Pague com Pix e Ganhe 5% de Desconto
          </h3>
          <p className="text-xs text-foreground/70 max-w-md mx-auto leading-relaxed">
            Ao clicar em finalizar reserva, geraremos o QR Code dinâmico e o
            código copia-e-cola. O pagamento é confirmado instantaneamente e
            seu voucher é liberado na hora.
          </p>
          <div className="inline-block bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-emerald-200">
            Economia no Pix: R$ {pricing.discountAmount.toFixed(2)}
          </div>
        </div>
      )}

      {selectedMethod === "boleto" && (
        <div className="p-6 bg-muted rounded-2xl border border-border text-center space-y-3">
          <div className="size-12 rounded-full bg-muted text-foreground/80 flex items-center justify-center mx-auto">
            <FileText className="size-6" />
          </div>
          <h3 className="font-bold text-foreground text-base">
            Pagamento por Boleto Bancário
          </h3>
          <p className="text-xs text-foreground/70 max-w-md mx-auto leading-relaxed">
            O boleto será gerado com vencimento para 2 dias úteis. A confirmação
            da reserva ocorre após a compensação bancária (1 a 2 dias úteis).
          </p>
        </div>
      )}

      <div className="pt-4 border-t border-border/60 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-3 border border-input text-foreground/80 font-semibold text-xs rounded-xl hover:bg-muted/50 transition flex items-center gap-1.5"
        >
          <ArrowLeft className="size-4" />
          Voltar
        </button>

        <button
          type="button"
          disabled={isSubmitting}
          onClick={onFinalize}
          className="px-8 py-4 bg-secondary hover:bg-secondary/90 text-primary font-black text-base rounded-xl flex items-center gap-2 shadow-xl shadow-secondary/30 transition transform hover:scale-102 disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? (
            "Processando Reserva..."
          ) : (
            <>
              Confirmar e Pagar R$ {pricing.finalAmount.toFixed(2)}
              <CheckCircle2 className="size-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
