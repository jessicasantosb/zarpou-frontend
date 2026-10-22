import { z } from "zod";

const requiredMessage =
  "Por favor, preencha todos os campos obrigatórios do titular da reserva.";

export const travelerFormSchema = z.object({
  fullName: z.string().trim().min(1, requiredMessage),
  documentType: z.enum(["CPF", "Passaporte"]),
  documentNumber: z.string().trim().min(1, requiredMessage),
  birthDate: z.string().min(1, requiredMessage),
  gender: z.enum(["M", "F", "Outro"]),
  email: z.string().trim().min(1, requiredMessage),
  phone: z.string(),
});

export type TravelerFormValues = z.infer<typeof travelerFormSchema>;
