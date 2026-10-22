export interface Coupon {
  id: string;
  code: string;
  description: string | null;
  discountType: "percent" | "fixed";
  discountValue: number;
  minOrderAmount: number | null;
  maxUses: number | null;
  usedCount: number;
  perCustomerLimit: number;
  validFrom: string | null;
  validTo: string | null;
  active: boolean;
  notificationSent: boolean;
  notificationSentAt: string | null;
  createdBy: string | null;
  createdAt: string;
}
