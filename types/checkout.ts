export interface TravelerInfo {
  id: string;
  fullName: string;
  documentType: "CPF" | "Passaporte";
  documentNumber: string;
  birthDate: string;
  gender: "M" | "F" | "Outro";
  email: string;
  phone: string;
  isPrimary: boolean;
}

export interface AddonItem {
  id: string;
  title: string;
  description: string;
  price: number;
  category: "seguro" | "bagagem" | "traslado" | "outro";
  selected: boolean;
}

export type PaymentMethod = "credit_card" | "pix" | "boleto" | "corporate_invoice";

export interface CreditCardData {
  cardNumber: string;
  holderName: string;
  expirationDate: string; // MM/AA
  cvv: string;
  installments: number;
}

export interface InstallmentOption {
  installments: number;
  installmentAmount: number;
  totalAmount: number;
  hasInterest: boolean;
  interestRate?: number;
}

export interface PriceSummary {
  baseAmount: number;
  taxesAndFees: number;
  addonsAmount: number;
  discountAmount: number;
  finalAmount: number;
  /** Desconto do cupom de desconto (se houver) — separado do desconto Pix. */
  couponDiscount?: number;
  /** Código do cupom aplicado (se houver). */
  couponCode?: string;
  /** Total do pedido antes da aplicação do cupom (usado para revalidar no backend). */
  preCouponAmount?: number;
}

export interface AppliedCoupon {
  code: string;
  description?: string | null;
  discountType: "percent" | "fixed";
  discountValue: number;
  discountAmount: number;
}

/** Resposta de POST /coupons/validate (backend: CouponValidateResponse). */
export interface CouponValidateResponse {
  valid: boolean;
  code: string;
  description?: string | null;
  discount_type: "percent" | "fixed";
  discount_value: number;
  discount_amount: number;
  min_order_amount?: number | null;
  valid_to?: string | null;
}
