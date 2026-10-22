import { z } from "zod";
import { getFailedPasswordRules } from "@/lib/password-rules";

export const adminUserFormSchema = (isEditing: boolean) =>
  z
    .object({
      name: z
        .string()
        .trim()
        .min(3, "Nome deve ter no mínimo 3 caracteres")
        .max(100, "Limite de 100 caracteres excedido"),
      email: z.email("E-mail inválido").max(150, "Limite de 150 caracteres excedido"),
      password: z.string(),
      confirmPassword: z.string(),
      isGeneralAdmin: z.boolean(),
      allowedScreens: z.array(z.string()),
      isActive: z.boolean(),
      twoFactorEnabled: z.boolean(),
    })
    .superRefine((values, ctx) => {
      if (!isEditing && !values.password.trim()) {
        ctx.addIssue({
          code: "custom",
          path: ["password"],
          message: "Informe uma senha para o novo administrador.",
        });
      }

      if (values.password) {
        const failedRules = getFailedPasswordRules(values.password);
        if (failedRules.length > 0) {
          ctx.addIssue({
            code: "custom",
            path: ["password"],
            message: `A senha não atende aos requisitos: ${failedRules.join(", ")}.`,
          });
        }
        if (values.password !== values.confirmPassword) {
          ctx.addIssue({
            code: "custom",
            path: ["confirmPassword"],
            message: "A confirmação de senha não confere com a senha digitada.",
          });
        }
      }

      if (!values.isGeneralAdmin && values.allowedScreens.length === 0) {
        ctx.addIssue({
          code: "custom",
          path: ["allowedScreens"],
          message: "Selecione ao menos uma tela de acesso.",
        });
      }
    });

export type AdminUserFormValues = z.infer<
  ReturnType<typeof adminUserFormSchema>
>;
