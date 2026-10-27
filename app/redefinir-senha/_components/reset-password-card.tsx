"use client";

import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, KeyRound, Loader2 } from "lucide-react";
import {
  PasswordChecklist,
} from "@/components/shared/password-checklist";
import { Form } from "@/components/ui/form";
import { InputPassword } from "@/components/ui/input-password";
import { useResetPassword } from "../_hooks/use-reset-password";

export function ResetPasswordCard() {
  const {
    token,
    form,
    showPassword,
    setShowPassword,
    showConfirm,
    setShowConfirm,
    passwordCriteria,
    fulfilledCount,
    error,
    setError,
    loading,
    onSubmit,
  } = useResetPassword();

  if (!token) {
    return (
      <div className="text-center space-y-4 py-4">
        <div className="size-16 mx-auto rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center">
          <AlertTriangle className="size-8 text-destructive" />
        </div>
        <h1 className="text-2xl font-black text-foreground">Link inválido</h1>
        <p className="text-xs text-muted-foreground">
          O link de recuperação está incompleto ou expirado. Solicite um novo
          link para redefinir sua senha.
        </p>
        <Link
          href="/esqueci-senha"
          className="inline-flex h-12 items-center justify-center gap-2 px-6 bg-primary hover:bg-primary-hover text-white font-bold text-sm rounded-xl   transition"
        >
          <KeyRound className="size-4" />
          Solicitar novo link
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="text-center space-y-2">
        <div className="relative size-16 mx-auto mb-1">
          <Image src="/logo/logo.svg" alt="Zarpou" fill className="object-contain" />
        </div>
        <h1 className="text-2xl font-black text-foreground">
          Crie uma nova senha
        </h1>
        <p className="text-xs text-muted-foreground">
          Escolha uma senha forte para proteger sua conta Zarpou. Por segurança,
          o link anterior deixará de funcionar após a alteração.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-xs font-semibold rounded-xl text-center">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground tracking-wide">
              Nova senha *
            </label>
            <InputPassword
              isRegister
              error={error}
              setError={setError}
              password={form.watch("password")}
              setPassword={(value) => form.setValue("password", value)}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              className="h-11 rounded-xl border border-input bg-background text-sm font-medium shadow-none outline-hidden transition focus:border-primary focus-visible:border-primary focus-visible:ring-0"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground tracking-wide">
              Confirmar nova senha *
            </label>
            <InputPassword
              isRegister
              error={error}
              setError={setError}
              password={form.watch("confirmPassword")}
              setPassword={(value) => form.setValue("confirmPassword", value)}
              showPassword={showConfirm}
              setShowPassword={setShowConfirm}
              placeholder="Digite a senha novamente"
              className="h-11 rounded-xl border border-input bg-background text-sm font-medium shadow-none outline-hidden transition focus:border-primary focus-visible:border-primary focus-visible:ring-0"
            />
          </div>

          <PasswordChecklist
            passwordCriteria={passwordCriteria}
            fulfilledCount={fulfilledCount}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-primary hover:bg-primary-hover text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2   transition cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                Redefinir minha senha
                <KeyRound className="size-4 text-secondary" />
              </>
            )}
          </button>
        </form>
      </Form>

      <div className="pt-2 text-center border-t border-border flex flex-col gap-2">
        <Link
          href="/esqueci-senha"
          className="text-xs text-primary font-bold hover:underline"
        >
          O link expirou? Solicite um novo
        </Link>
        <Link
          href="/login"
          className="text-xs text-muted-foreground hover:text-foreground transition inline-flex items-center gap-1 justify-center"
        >
          <ArrowLeft className="size-3.5" />
          Voltar para o login
        </Link>
      </div>
    </>
  );
}
