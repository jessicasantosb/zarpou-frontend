import { z } from "zod";
import { Coupon } from "@/types/coupon";

export const COUPON_CODE_PATTERN = /^[A-Z0-9_-]{3,50}$/;

export const couponFormSchema = z
  .object({
    code: z
      .string()
      .trim()
      .min(3, "Informe o código do cupom (mínimo 3 caracteres).")
      .max(50, "O código do cupom pode ter no máximo 50 caracteres."),
    description: z.string().trim(),
    discountType: z.enum(["percent", "fixed"]),
    discountValue: z
      .string()
      .trim()
      .min(1, "Informe o valor do desconto.")
      .refine((v) => Number(v) > 0, "O valor do desconto deve ser maior que zero."),
    minOrderAmount: z.string().trim(),
    maxUses: z.string().trim(),
    perCustomerLimit: z.string().trim().min(1, "Informe o limite de usos por cliente."),
    validFrom: z.string().trim(),
    validTo: z.string().trim(),
    active: z.boolean(),
    notifyOnCreate: z.boolean(),
  })
  .superRefine((values, ctx) => {
    const code = values.code.trim().toUpperCase();
    if (!COUPON_CODE_PATTERN.test(code)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["code"],
        message: "Use de 3 a 50 caracteres: apenas letras, números, '-' ou '_'.",
      });
    }

    if (!(Number(values.discountValue) > 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["discountValue"],
        message: "O valor do desconto deve ser maior que zero.",
      });
    } else if (values.discountType === "percent" && Number(values.discountValue) > 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["discountValue"],
        message: "O desconto percentual não pode ser maior que 100%.",
      });
    }

    if (values.minOrderAmount !== "" && !(Number(values.minOrderAmount) >= 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["minOrderAmount"],
        message: "Informe um valor mínimo válido ou deixe em branco.",
      });
    }

    if (
      values.maxUses !== "" &&
      (!Number.isInteger(Number(values.maxUses)) || Number(values.maxUses) < 1)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["maxUses"],
        message: "O limite total de usos deve ser um número inteiro maior que zero.",
      });
    }

    if (
      !Number.isInteger(Number(values.perCustomerLimit)) ||
      Number(values.perCustomerLimit) < 1
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["perCustomerLimit"],
        message: "O limite por cliente deve ser um número inteiro maior que zero.",
      });
    }

    if (values.validFrom && values.validTo && values.validTo < values.validFrom) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["validTo"],
        message: "A data de término não pode ser anterior à data de início.",
      });
    }
  });

export type CouponFormValues = z.infer<typeof couponFormSchema>;

export function buildCouponFormValues(coupon?: Coupon): CouponFormValues {
  return {
    code: coupon?.code ?? "",
    description: coupon?.description ?? "",
    discountType: coupon?.discountType ?? "percent",
    discountValue: coupon ? String(coupon.discountValue) : "",
    minOrderAmount:
      coupon?.minOrderAmount !== null && coupon?.minOrderAmount !== undefined
        ? String(coupon.minOrderAmount)
        : "",
    maxUses: coupon?.maxUses !== null && coupon?.maxUses !== undefined ? String(coupon.maxUses) : "",
    perCustomerLimit: String(coupon?.perCustomerLimit ?? 1),
    validFrom: coupon?.validFrom ?? "",
    validTo: coupon?.validTo ?? "",
    active: coupon?.active ?? true,
    notifyOnCreate: false,
  };
}
