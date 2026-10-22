import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { CustomerLoginValues } from "../_hooks/use-customer-login";
import { AuthForm } from "./auth-form";
import { PasswordCriteria } from "@/components/shared/password-checklist";

interface LoginCardProps {
  form: UseFormReturn<CustomerLoginValues>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  isRegister: boolean;
  loading: boolean;
  showPassword: boolean;
  successMessage: string;
  error: string;
  passwordCriteria: PasswordCriteria;
  fulfilledCount: number;
  cpf: string;
  onSwitchMode: (registerMode: boolean) => void;
  onToggleShowPassword: () => void;
  onClearError: () => void;
}

export function LoginCard({
  form,
  onSubmit,
  isRegister,
  loading,
  showPassword,
  successMessage,
  error,
  passwordCriteria,
  fulfilledCount,
  cpf,
  onSwitchMode,
  onToggleShowPassword,
  onClearError,
}: LoginCardProps) {
  return (
    <>
      <div className="text-center space-y-2">
        <div className="relative size-16 mx-auto mb-1">
          <Image src="/logo/logo.svg" alt="Zarpou" fill className="object-contain" />
        </div>
        <h1 className="text-2xl font-black text-foreground">
          {isRegister ? "Criar sua Conta Zarpou" : "Acesse suas Viagens"}
        </h1>
        <p className="text-xs text-muted-foreground">
          {isRegister
            ? "Cadastre-se para gerenciar reservas e vouchers exclusivos"
            : "Entre com seu e-mail para visualizar seus bilhetes e estadias"}
        </p>
      </div>

      <div className="flex bg-muted p-1 rounded-2xl gap-1">
        <button
          type="button"
          onClick={() => onSwitchMode(false)}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition cursor-pointer ${
            !isRegister
              ? "bg-card text-primary shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Entrar
        </button>
        <button
          type="button"
          onClick={() => onSwitchMode(true)}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition cursor-pointer ${
            isRegister
              ? "bg-card text-primary shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Criar Conta
        </button>
      </div>

      {successMessage && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl text-center flex items-center justify-center gap-2">
          <Check className="size-4 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-xs font-semibold rounded-xl text-center">
          {error}
        </div>
      )}

      <AuthForm
        form={form}
        onSubmit={onSubmit}
        isRegister={isRegister}
        loading={loading}
        showPassword={showPassword}
        error={error}
        passwordCriteria={passwordCriteria}
        fulfilledCount={fulfilledCount}
        cpf={cpf}
        onToggleShowPassword={onToggleShowPassword}
        onClearError={onClearError}
      />

      <div className="pt-2 text-center border-t border-border/60 flex flex-col gap-2">
        <Link
          href="/minhas-viagens?mode=pnr"
          className="text-xs text-primary font-bold hover:underline"
        >
          Quer apenas consultar uma reserva com o código (PNR)?
        </Link>
        <Link
          href="/"
          className="text-xs text-muted-foreground hover:text-foreground/70 transition"
        >
          ← Voltar para o início
        </Link>
      </div>
    </>
  );
}
