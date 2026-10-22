import { zodResolver } from "@hookform/resolvers/zod";
import { useWatch, useForm, type SubmitErrorHandler } from "react-hook-form";
import { Users } from "lucide-react";
import { toast } from "react-toastify";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { formatCPF, isValidCPF } from "@/lib/format-cpf";
import { formatCellphone } from "@/lib/format-cellphone";
import {
  buildCustomerFormValues,
  customerFormSchema,
  type CustomerFormValues,
} from "@/schemas/customer-form";
import { useCustomerManagementStore } from "@/stores/customer-management-store";
import { CustomerUser } from "@/types/user";
import { CustomerFormField } from "./customer-form-field";

interface CustomerFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: CustomerUser | null;
}

export function CustomerFormDialog({
  open,
  onOpenChange,
  customer,
}: CustomerFormDialogProps) {
  const { createCustomer, updateCustomer } = useCustomerManagementStore();

  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: buildCustomerFormValues(customer ?? undefined),
  });

  const { isSubmitting } = form.formState;

  const watchedCpf =
    useWatch({ control: form.control, name: "cpf" }) ?? "";
  const cpfDigits = watchedCpf.replace(/\D/g, "");
  const cpfTouched = cpfDigits.length === 11;
  const cpfValid = cpfTouched && isValidCPF(watchedCpf);

  const handleError: SubmitErrorHandler<CustomerFormValues> = (errors) => {
    if (errors.name || errors.email) {
      toast.error("Por favor, preencha o nome e o e-mail.");
    }
  };

  const onSubmit = async (values: CustomerFormValues) => {
    const cleanPhone = values.phone.replace(/\D/g, "");
    const cleanCpf = values.cpf.replace(/\D/g, "");

    if (cleanCpf && !isValidCPF(cleanCpf)) {
      toast.error(
        "O CPF informado é inválido. Por favor, confira os números digitados.",
      );
      return;
    }

    if (customer) {
      const res = await updateCustomer(customer.id, {
        name: values.name,
        email: values.email,
        phone: cleanPhone,
        cpf: cleanCpf,
        isActive: values.active,
      });

      if (res.success) {
        toast.success("Dados do cliente atualizados com sucesso!");
        onOpenChange(false);
      } else {
        toast.error(res.message || "Erro ao atualizar cliente.");
      }
    } else {
      const res = await createCustomer({
        name: values.name,
        email: values.email,
        phone: cleanPhone,
        cpf: cleanCpf,
        isActive: values.active,
      });

      if (res.success) {
        toast.success("Novo cliente cadastrado com sucesso!");
        onOpenChange(false);
      } else {
        toast.error(res.message || "Erro ao cadastrar cliente.");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        aria-describedby={undefined}
        className="grid max-h-[90vh] grid-rows-[auto_minmax(0,1fr)] gap-0 overflow-hidden rounded-3xl border-border bg-card p-0 shadow-xl sm:max-w-md"
      >
        <div className="p-6 border-b border-border/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 text-primary rounded-xl">
              <Users className="size-5" />
            </div>
            <div>
              <DialogTitle className="font-black text-foreground text-base">
                {customer
                  ? "Editar Dados do Cliente"
                  : "Novo Cliente Viajante"}
              </DialogTitle>
              <p className="text-xs text-muted-foreground">
                {customer
                  ? "Atualize as informações do viajante"
                  : "Cadastre um novo viajante no sistema Zarpou"}
              </p>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, handleError)}
            className="p-6 space-y-4 overflow-y-auto"
          >
            <CustomerFormField
              control={form.control}
              name="name"
              label="Nome Completo"
              required
              placeholder="Ex: Amanda Silva"
            />

            <CustomerFormField
              control={form.control}
              name="email"
              label="E-mail do Cliente"
              required
              type="email"
              placeholder="amanda.silva@exemplo.com"
            />

            <div className="grid grid-cols-2 gap-3">
              <CustomerFormField
                control={form.control}
                name="phone"
                label="Telefone / Celular"
                placeholder="(11) 98765-4321"
                maxLength={15}
                transform={formatCellphone}
              />

              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem className="gap-0 space-y-1">
                    <div className="flex items-center justify-between mb-1">
                      <FormLabel className="block text-xs font-bold text-foreground/80">
                        CPF
                      </FormLabel>
                      {cpfTouched && (
                        cpfValid ? (
                          <span className="text-[10px] font-bold text-emerald-600">
                            ✓ Válido
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-destructive">
                            ✕ Inválido
                          </span>
                        )
                      )}
                    </div>
                    <FormControl>
                      <input
                        type="text"
                        name={field.name}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        value={String(field.value ?? "")}
                        placeholder="000.000.000-00"
                        maxLength={14}
                        onChange={(event) =>
                          field.onChange(formatCPF(event.target.value))
                        }
                        className={`w-full px-3 py-2 text-xs bg-muted border rounded-xl focus:bg-card focus:outline-hidden focus:ring-2 ${
                          cpfTouched && !cpfValid
                            ? "border-destructive/30 focus:ring-destructive/20 text-destructive"
                            : "border-border focus:ring-secondary"
                        }`}
                      />
                    </FormControl>
                    {cpfTouched && !cpfValid && (
                      <p className="text-[10px] text-destructive font-medium mt-1">
                        Dígitos verificadores do CPF não conferem.
                      </p>
                    )}
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2 space-y-0">
                    <FormControl>
                      <input
                        type="checkbox"
                        id="formActiveCustomer"
                        checked={field.value}
                        onChange={(event) =>
                          field.onChange(event.target.checked)
                        }
                        className="size-4 rounded text-primary focus:ring-secondary cursor-pointer"
                      />
                    </FormControl>
                    <FormLabel
                      htmlFor="formActiveCustomer"
                      className="text-xs font-bold text-foreground/80 cursor-pointer !mt-0"
                    >
                      Conta de cliente ativa no portal Minhas Viagens
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>

            <div className="pt-4 flex items-center justify-end gap-2 border-t border-border/60">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="px-4 py-2 text-xs font-semibold text-foreground/70 bg-muted hover:bg-border rounded-xl transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 text-xs font-bold text-white bg-primary hover:bg-primary/90 rounded-xl transition shadow-sm cursor-pointer disabled:opacity-50"
              >
                {isSubmitting
                  ? "Salvando..."
                  : customer
                    ? "Salvar Alterações"
                    : "Cadastrar Cliente"}
              </button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
