import { z } from "zod";
import { formatCPF } from "@/lib/format-cpf";
import { formatCellphone } from "@/lib/format-cellphone";
import { CustomerUser } from "@/types/user";

export const customerFormSchema = z.object({
  name: z.string().trim().min(1, "Por favor, preencha o nome e o e-mail."),
  email: z.string().trim().min(1, "Por favor, preencha o nome e o e-mail."),
  phone: z.string(),
  cpf: z.string(),
  active: z.boolean(),
});

export type CustomerFormValues = z.infer<typeof customerFormSchema>;

export const buildCustomerFormValues = (
  customer?: CustomerUser,
): CustomerFormValues => {
  if (!customer) {
    return {
      name: "",
      email: "",
      phone: "",
      cpf: "",
      active: true,
    };
  }

  return {
    name: customer.name,
    email: customer.email,
    phone: customer.phone ? formatCellphone(customer.phone) : "",
    cpf: customer.cpf ? formatCPF(customer.cpf) : "",
    active: customer.isActive ?? true,
  };
};
