"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Loader2, Mail, MailCheck } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForgotPassword } from "../_hooks/use-forgot-password";

export function ForgotPasswordCard() {
  const { form, loading, sentTo, error, onSubmit, sendToAnotherEmail } =
    useForgotPassword();

  return (
    <>
    <div className="text-center space-y-2">
      <div className="relative size-16 mx-auto mb-1">
        <Image src="/logo/logo.svg" alt="Zarpou" fill className="object-contain" />
      </div>
      {sentTo ? (
        <>
          <h1 className="text-2xl font-black text-foreground">Link enviado!</h1>
          <p className="text-xs text-muted-foreground">
            Se o e-mail informado estiver cadastrado, você receberá o link de
            recuperação em instantes.
          </p>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-black text-foreground">
            Recuperar sua senha
          </h1>
          <p className="text-xs text-muted-foreground">
            Informe o e-mail da sua conta Zarpou e enviaremos um link seguro
            para criar uma nova senha
          </p>
        </>
      )}
    </div>

    {sentTo ? (
      <div className="space-y-5">
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-2xl flex items-start gap-2.5">
          <MailCheck className="size-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>
            Confira sua caixa de entrada (e também a pasta de spam) do e-mail{" "}
            <strong>{sentTo}</strong>. O link é de uso único e válido por 30
            minutos.
          </span>
        </div>
        <button
          type="button"
          onClick={sendToAnotherEmail}
          className="w-full h-12 bg-primary hover:bg-primary-hover text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition cursor-pointer"
        >
          <Mail className="size-4" />
          Enviar para outro e-mail
        </button>
        <div className="text-center">
          <Link
            href="/login"
            className="text-xs text-primary font-bold hover:underline inline-flex items-center gap-1"
          >
            <ArrowLeft className="size-3.5" />
            Voltar para o login
          </Link>
        </div>
      </div>
    ) : (
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-xs font-semibold rounded-xl text-center">
              {error}
            </div>
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="gap-0 space-y-1">
                <label className="text-xs font-bold text-foreground tracking-wide">
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
                      className="w-full h-11 pl-10 pr-4 rounded-xl border border-input bg-background text-sm font-medium outline-hidden focus:border-primary transition"
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-primary hover:bg-primary-hover text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                Enviar link de recuperação
                <Mail className="size-4 text-secondary" />
              </>
            )}
          </button>
        </form>
      </Form>
    )}

    <div className="pt-2 text-center border-t border-border flex flex-col gap-2">
      <Link
        href="/login"
        className="text-xs text-primary font-bold hover:underline inline-flex items-center gap-1 justify-center"
      >
        <ArrowLeft className="size-3.5" />
        Lembrou a senha? Voltar para o login
      </Link>
      <Link
        href="/"
        className="text-xs text-muted-foreground hover:text-foreground transition"
      >
        ← Voltar para o início
      </Link>
    </div>
    </>
  );
}
