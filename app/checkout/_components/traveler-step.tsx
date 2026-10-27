import { zodResolver } from "@hookform/resolvers/zod";
import { useWatch, useForm, type SubmitErrorHandler } from "react-hook-form";
import { ArrowRight, Lock } from "lucide-react";
import { toast } from "react-toastify";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { formatCpf, isValidCPF } from "@/lib/format-cpf";
import { formatCellphone } from "@/lib/format-cellphone";
import {
  travelerFormSchema,
  type TravelerFormValues,
} from "@/schemas/checkout-traveler";
import { TravelerInfo } from "@/types/checkout";
import { CheckoutFormField } from "./checkout-form-field";

const REQUIRED_MESSAGE =
  "Por favor, preencha todos os campos obrigatórios do titular da reserva.";

const INPUT_CLASS =
  "w-full h-12 px-4 rounded-xl border border-input text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-hidden";

interface TravelerStepProps {
  initialTraveler: TravelerInfo;
  onComplete: (traveler: TravelerInfo) => void;
}

export function TravelerStep({
  initialTraveler,
  onComplete,
}: TravelerStepProps) {
  const form = useForm<TravelerFormValues>({
    resolver: zodResolver(travelerFormSchema),
    defaultValues: {
      fullName: initialTraveler.fullName,
      documentType: initialTraveler.documentType,
      documentNumber: initialTraveler.documentNumber,
      birthDate: initialTraveler.birthDate,
      gender: initialTraveler.gender,
      email: initialTraveler.email,
      phone: initialTraveler.phone,
    },
  });

  const documentType = useWatch({
    control: form.control,
    name: "documentType",
  });
  const documentNumber =
    useWatch({ control: form.control, name: "documentNumber" }) ?? "";

  const documentDigits = documentNumber.replace(/\D/g, "");
  const documentTouched =
    documentType === "CPF" && documentDigits.length === 11;
  const documentValid = documentTouched && isValidCPF(documentNumber);

  const handleError: SubmitErrorHandler<TravelerFormValues> = (errors) => {
    if (
      errors.fullName ||
      errors.documentNumber ||
      errors.email ||
      errors.phone ||
      errors.birthDate
    ) {
      toast.error(REQUIRED_MESSAGE);
    }
  };

  const onSubmit = (values: TravelerFormValues) => {
    if (values.documentType === "CPF") {
      const cleanDoc = values.documentNumber.replace(/\D/g, "");
      if (!isValidCPF(cleanDoc)) {
        toast.error(
          "O CPF informado é inválido. Por favor, confira os números digitados.",
        );
        return;
      }
    }

    onComplete({
      ...initialTraveler,
      ...values,
      phone: values.phone ? values.phone.replace(/\D/g, "") : "",
      documentNumber:
        values.documentType === "CPF"
          ? values.documentNumber.replace(/\D/g, "")
          : values.documentNumber.trim().toUpperCase(),
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, handleError)}
        className="bg-card rounded-3xl p-6 md:p-8 border border-border  space-y-6"
      >
        <div className="flex items-center justify-between pb-4 border-b border-border/60">
          <div>
            <h2 className="text-xl font-extrabold text-foreground">
              1. Dados do Hóspede Titular / Passageiro
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Estes dados serão utilizados para emissão formal do voucher e
              bilhete.
            </p>
          </div>
          <Lock className="size-5 text-emerald-600" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <CheckoutFormField
              control={form.control}
              name="fullName"
              label="Nome Completo (como no documento) *"
              required
              placeholder="Ex: Carlos Eduardo de Oliveira"
            />
          </div>

          <FormField
            control={form.control}
            name="documentType"
            render={({ field }) => (
              <FormItem className="gap-0 space-y-1">
                <FormLabel className="text-xs font-bold text-foreground/80 tracking-wide">
                  Tipo de Documento *
                </FormLabel>
                <select
                  value={field.value}
                  onChange={(event) =>
                    field.onChange(
                      event.target.value as "CPF" | "Passaporte",
                    )
                  }
                  className={`bg-card ${INPUT_CLASS}`}
                >
                  <option value="CPF">
                    CPF (Viagens Nacionais e Mercosul)
                  </option>
                  <option value="Passaporte">
                    Passaporte (Viagens Internacionais)
                  </option>
                </select>
                <FormMessage className="text-[10px]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="documentNumber"
            render={({ field }) => (
              <FormItem className="gap-0 space-y-1">
                <div className="flex items-center justify-between">
                  <FormLabel className="text-xs font-bold text-foreground/80 tracking-wide">
                    Número do Documento *
                  </FormLabel>
                  {documentTouched &&
                    (documentValid ? (
                      <span className="text-[10px] font-bold text-emerald-600">
                        ✓ CPF Válido
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-destructive">
                        ✕ CPF Inválido
                      </span>
                    ))}
                </div>
                <FormControl>
                  <input
                    type="text"
                    required
                    name={field.name}
                    ref={field.ref}
                    onBlur={field.onBlur}
                    placeholder={
                      documentType === "CPF"
                        ? "000.000.000-00"
                        : "Ex: PA123456"
                    }
                    maxLength={documentType === "CPF" ? 14 : 20}
                    value={String(field.value ?? "")}
                    onChange={(event) => {
                      const value =
                        documentType === "CPF"
                          ? formatCpf(event.target.value)
                          : event.target.value.toUpperCase();
                      field.onChange(value);
                    }}
                    className={`w-full h-12 px-4 rounded-xl border text-sm font-medium focus:ring-2 outline-hidden transition ${
                      documentTouched && !documentValid
                        ? "border-destructive/40 focus:ring-destructive/20 text-destructive bg-destructive/10"
                        : "border-input focus:ring-primary/20 focus:border-primary"
                    }`}
                  />
                </FormControl>
                {documentTouched && !documentValid && (
                  <p className="text-[10px] text-destructive font-medium">
                    Dígitos verificadores do CPF não conferem.
                  </p>
                )}
                <FormMessage className="text-[10px]" />
              </FormItem>
            )}
          />

          <CheckoutFormField
            control={form.control}
            name="birthDate"
            label="Data de Nascimento *"
            required
            type="date"
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="gap-0 space-y-1">
                <FormLabel className="text-xs font-bold text-foreground/80 tracking-wide">
                  Gênero
                </FormLabel>
                <select
                  value={field.value}
                  onChange={(event) =>
                    field.onChange(event.target.value as "M" | "F" | "Outro")
                  }
                  className={`bg-card ${INPUT_CLASS}`}
                >
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                  <option value="Outro">Outro</option>
                </select>
                <FormMessage className="text-[10px]" />
              </FormItem>
            )}
          />

          <CheckoutFormField
            control={form.control}
            name="email"
            label="E-mail para envio do Voucher *"
            required
            type="email"
            placeholder="seuemail@exemplo.com"
          />

          <CheckoutFormField
            control={form.control}
            name="phone"
            label="Celular / WhatsApp *"
            required
            type="tel"
            placeholder="(31) 99999-9999"
            maxLength={15}
            transform={formatCellphone}
          />
        </div>

        <div className="pt-4 border-t border-border/60 flex justify-end">
          <button
            type="submit"
            className="px-8 py-3.5 bg-secondary hover:bg-secondary/90 text-primary font-bold text-sm rounded-xl flex items-center gap-2   transition cursor-pointer"
          >
            Continuar para Opcionais
            <ArrowRight className="size-4" />
          </button>
        </div>
      </form>
    </Form>
  );
}
