import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z.string().trim().min(1, "Informe o e-mail de acesso."),
  password: z.string().min(1, "Informe a senha."),
});

export type AdminLoginValues = z.infer<typeof adminLoginSchema>;
