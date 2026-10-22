import { create } from "zustand";
import { Coupon } from "@/types/coupon";
import { api } from "@/lib/api";

/** Campos de um cupom novinho, prontos para envio ao backend. */
export type CouponDraftInput = Omit<
  Coupon,
  "id" | "createdAt" | "usedCount" | "notificationSent" | "notificationSentAt" | "createdBy"
>;

function mapCoupon(p: any): Coupon {
  return {
    id: p.id,
    code: p.code,
    description: p.description ?? null,
    discountType: (p.discount_type ?? p.discountType ?? "percent") as Coupon["discountType"],
    discountValue: Number(p.discount_value ?? p.discountValue ?? 0),
    minOrderAmount:
      p.min_order_amount !== undefined && p.min_order_amount !== null
        ? Number(p.min_order_amount)
        : p.minOrderAmount ?? null,
    maxUses: p.max_uses !== undefined && p.max_uses !== null ? Number(p.max_uses) : p.maxUses ?? null,
    usedCount: Number(p.used_count ?? p.usedCount ?? 0),
    perCustomerLimit: Number(p.per_customer_limit ?? p.perCustomerLimit ?? 1),
    validFrom: p.valid_from ?? p.validFrom ?? null,
    validTo: p.valid_to ?? p.validTo ?? null,
    active: p.active ?? true,
    notificationSent: p.notification_sent ?? p.notificationSent ?? false,
    notificationSentAt: p.notification_sent_at ?? p.notificationSentAt ?? null,
    createdBy: p.created_by ?? p.createdBy ?? null,
    createdAt: p.created_at ?? p.createdAt ?? new Date().toISOString(),
  };
}

function serializeCouponPayload(coupon: CouponDraftInput) {
  return {
    code: coupon.code,
    description: coupon.description || null,
    discount_type: coupon.discountType,
    discount_value: coupon.discountValue,
    min_order_amount: coupon.minOrderAmount ?? null,
    max_uses: coupon.maxUses ?? null,
    per_customer_limit: coupon.perCustomerLimit,
    valid_from: coupon.validFrom || null,
    valid_to: coupon.validTo || null,
    active: coupon.active,
  };
}

function serializeCouponUpdatePayload(updated: Partial<Coupon>) {
  const payload: Record<string, any> = {};
  if (updated.code !== undefined) payload.code = updated.code;
  if (updated.description !== undefined) payload.description = updated.description || null;
  if (updated.discountType !== undefined) payload.discount_type = updated.discountType;
  if (updated.discountValue !== undefined) payload.discount_value = updated.discountValue;
  if (updated.minOrderAmount !== undefined) payload.min_order_amount = updated.minOrderAmount;
  if (updated.maxUses !== undefined) payload.max_uses = updated.maxUses;
  if (updated.perCustomerLimit !== undefined) payload.per_customer_limit = updated.perCustomerLimit;
  if (updated.validFrom !== undefined) payload.valid_from = updated.validFrom || null;
  if (updated.validTo !== undefined) payload.valid_to = updated.validTo || null;
  if (updated.active !== undefined) payload.active = updated.active;
  return payload;
}

interface CouponStore {
  coupons: Coupon[];
  isLoading: boolean;
  fetchCoupons: () => Promise<void>;
  addCoupon: (coupon: CouponDraftInput) => Promise<Coupon>;
  updateCoupon: (id: string, coupon: Partial<Coupon>) => Promise<void>;
  deleteCoupon: (id: string) => Promise<void>;
  toggleCouponActive: (id: string) => Promise<void>;
  markNotificationSent: (id: string) => void;
  generateCode: (prefix?: string, length?: number) => Promise<string>;
  resetCoupons: () => void;
}

export const useCouponStore = create<CouponStore>()((set, get) => ({
  coupons: [],
  isLoading: false,

  fetchCoupons: async () => {
    set({ isLoading: true });
    try {
      const list = await api.get<any[]>("/coupons");
      if (Array.isArray(list)) {
        set({ coupons: list.map(mapCoupon), isLoading: false });
        return;
      }
    } catch {
      // ignore
    }
    set({ isLoading: false });
  },

  addCoupon: async (coupon) => {
    const created = await api.post<any>("/coupons", serializeCouponPayload(coupon));
    const mapped = mapCoupon(created);
    set((state) => ({ coupons: [mapped, ...state.coupons] }));
    return mapped;
  },

  updateCoupon: async (id, updated) => {
    set((state) => ({
      coupons: state.coupons.map((c) => (c.id === id ? { ...c, ...updated } : c)),
    }));

    try {
      const saved = await api.put<any>(`/coupons/${id}`, serializeCouponUpdatePayload(updated));
      const mapped = mapCoupon(saved);
      set((state) => ({
        coupons: state.coupons.map((c) => (c.id === id ? mapped : c)),
      }));
    } catch (err) {
      console.error("Falha ao atualizar cupom na API:", err);
      // Reconcilia com o servidor em caso de erro
      get().fetchCoupons();
      throw err;
    }
  },

  deleteCoupon: async (id) => {
    set((state) => ({
      coupons: state.coupons.filter((c) => c.id !== id),
    }));

    try {
      await api.delete(`/coupons/${id}`);
    } catch (err) {
      console.error("Falha ao excluir cupom na API:", err);
      throw err;
    }
  },

  toggleCouponActive: async (id) => {
    set((state) => ({
      coupons: state.coupons.map((c) => (c.id === id ? { ...c, active: !c.active } : c)),
    }));

    try {
      const saved = await api.patch<any>(`/coupons/${id}/toggle`);
      const mapped = mapCoupon(saved);
      set((state) => ({
        coupons: state.coupons.map((c) => (c.id === id ? mapped : c)),
      }));
    } catch (err) {
      console.warn("Falha ao alternar cupom na API:", err);
      get().fetchCoupons();
    }
  },

  markNotificationSent: (id) =>
    set((state) => ({
      coupons: state.coupons.map((c) =>
        c.id === id
          ? { ...c, notificationSent: true, notificationSentAt: new Date().toISOString() }
          : c
      ),
    })),

  generateCode: async (prefix, length = 10) => {
    const res = await api.post<{ code: string }>("/coupons/generate-code", {
      prefix: prefix || null,
      length,
    });
    return res.code;
  },

  resetCoupons: () => {
    get().fetchCoupons();
  },
}));
