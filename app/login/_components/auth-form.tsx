import { ArrowRight, IdCard, Mail, Phone, User } from "lucide-react";
import type React from "react";
import Link from "next/link";
import { UseFormReturn } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { InputPassword } from "@/components/ui/input-password";
import { formatCellphone } from "@/lib/format-cellphone";
import { formatCpf, isValidCPF } from "@/lib/format-cpf";
import { CustomerLoginValues } from "../_hooks/use-customer-login";
import { PasswordChecklist, PasswordCriteria } from "@/components/shared/password-checklist";

interface AuthFormProps {
  form: UseFormReturn<CustomerLoginValues>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  isRegister: boolean;
  loading: boolean;
  showPassword: boolean;
  error: string;
  passwordCriteria: PasswordCriteria;
  fulfilledCount: number;
  cpf: string;
  onToggleShowPassword: () => void;
  onClearError: () => void;
}

export function AuthForm({
  form,
  onSubmit,
  isRegister,
  loading,
  showPassword,
  error,
  passwordCriteria,
  fulfilledCount,
  cpf,
  onToggleShowPassword,
  onClearError,
}: AuthFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        {isRegister && (
          <>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="gap-0 space-y-1">
                  <label className="text-xs font-bold text-foreground/80 tracking-wide">
                    Nome Completo *
                  </label>
                  <div className="relative">
                    <User className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                    <FormControl>
                      <input
                        type="text"
                        required
                        placeholder="Seu nome"
                        value={field.value}
                        onChange={field.onChange}
                        className="w-full h-11 pl-10 pr-4 rounded-xl border border-input text-sm font-medium outline-hidden focus:border-primary transition"
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="gap-0 space-y-1">
                  <label className="text-xs font-bold text-foreground/80 tracking-wide">
                    WhatsApp / Celular
                  </label>
                  <div className="relative">
                    <Phone className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                    <FormControl>
                      <input
                        type="tel"
                        placeholder="(31) 99999-9999"
                        value={field.value}
                        maxLength={15}
                        onChange={(e) =>
                          field.onChange(formatCellphone(e.target.value))
                        }
                        className="w-full h-11 pl-10 pr-4 rounded-xl border border-input text-sm font-medium outline-hidden focus:border-primary transition"
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem className="gap-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-foreground/80 tracking-wide">
                      CPF (opcional)
                    </label>
                    {cpf.replace(/\D/g, "").length === 11 &&
                      (isValidCPF(cpf) ? (
                        <span className="text-[10px] font-bold text-emerald-600">
                          ✓ Válido
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-destructive">
                          ✕ CPF Inválido
                        </span>
                      ))}
                  </div>
                  <div className="relative">
                    <IdCard className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                    <FormControl>
                      <input
                        type="text"
                        placeholder="000.000.000-00"
                        maxLength={14}
                        value={field.value}
                        onChange={(e) =>
                          field.onChange(formatCpf(e.target.value))
                        }
                        className={`w-full h-11 pl-10 pr-4 rounded-xl border text-sm font-medium outline-hidden transition ${
                          cpf.replace(/\D/g, "").length === 11 &&
                          !isValidCPF(cpf)
                            ? "border-destructive/40 focus:border-destructive text-destructive bg-destructive/10"
                            : "border-input focus:border-primary"
                        }`}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
          </>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="gap-0 space-y-1">
              <label className="text-xs font-bold text-foreground/80 tracking-wide">
                E-mail *
              </label>
              <div className="relative">
                <Mail className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <FormControl>
                  <input
                    type="email"
                    required
                    placeholder="seu@email.com"
                    value={field.value}
                    onChange={field.onChange}
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-input text-sm font-medium outline-hidden focus:border-primary transition"
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="gap-0 space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-foreground/80 tracking-wide">
                  Senha *
                </label>
                {!isRegister && (
                  <Link
                    href="/esqueci-senha"
                    className="text-[11px] text-primary font-bold hover:underline"
                  >
                    Esqueceu a senha?
                  </Link>
                )}
              </div>
              <InputPassword
                isRegister={isRegister}
                error={error}
                setError={onClearError}
                password={field.value}
                setPassword={field.onChange}
                showPassword={showPassword}
                setShowPassword={onToggleShowPassword}
                className="h-11 rounded-xl border border-input text-sm font-medium shadow-none outline-hidden transition focus:border-primary focus-visible:border-primary focus-visible:ring-0"
              />
            </FormItem>
          )}
        />

        {isRegister && (
          <PasswordChecklist
            passwordCriteria={passwordCriteria}
            fulfilledCount={fulfilledCount}
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2   transition cursor-pointer disabled:opacity-50 mt-2"
        >
          {loading ? (
            "Acessando..."
          ) : isRegister ? (
            <>
              Cadastrar e Acessar
              <ArrowRight className="size-4 text-secondary" />
            </>
          ) : (
            <>
              Entrar
              <ArrowRight className="size-4 text-secondary" />
            </>
          )}
        </button>
      </form>
    </Form>
  );
}
