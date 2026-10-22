import { z } from "zod";
import { isValidCPF } from "@/lib/format-cpf";

export const passwordValidationSchema = z
  .string()
  .min(8, "A senha deve conter no mínimo 8 caracteres.")
  .regex(/[A-Z]/, "A senha deve conter ao menos 1 letra maiúscula.")
  .regex(/[0-9]/, "A senha deve conter ao menos 1 número.")
  .regex(
    /[^A-Za-z0-9]/,
    "A senha deve conter ao menos 1 caractere especial (ex: !@#$%&*).",
  );

export const userRegistrationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Nome completo deve ter ao menos 3 caracteres."),
  email: z.string().trim().email("Informe um e-mail válido."),
  phone: z
    .string()
    .trim()
    .refine((val) => {
      if (!val) return true;
      const digits = val.replace(/\D/g, "");
      return digits.length >= 10 && digits.length <= 11;
    }, "Informe um número de celular válido com DDD (ex: (31) 99999-9999).")
    .optional()
    .or(z.literal("")),
  cpf: z
    .string()
    .trim()
    .refine((val) => {
      if (!val) return true;
      return isValidCPF(val);
    }, "O CPF informado é inválido. Verifique os dígitos.")
    .optional()
    .or(z.literal("")),
  password: passwordValidationSchema,
});

export const customerLoginSchema = z.object({
  name: z.string().optional(),
  email: z.string().min(1, "Informe seu e-mail e senha para entrar."),
  phone: z.string().optional(),
  cpf: z.string().optional(),
  password: z.string().min(1, "Informe seu e-mail e senha para entrar."),
});
