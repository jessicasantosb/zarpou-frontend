"use client";

import { Loader2 } from "lucide-react";
import { AuthPageShell } from "@/components/shared/auth-page-shell";
import { TwoFactorChallenge } from "@/components/auth/two-factor-challenge";
import { useCustomerLogin } from "../_hooks/use-customer-login";
import { LoginCard } from "./login-card";

export function CustomerLoginContent() {
  const {
    form,
    submit,
    isRegister,
    onSwitchMode,
    showPassword,
    onToggleShowPassword,
    error,
    onClearError,
    successMessage,
    loading,
    isVerifyingOtp,
    pendingTwoFactor,
    onSwitchTwoFactorMethod,
    onVerifyTwoFactor,
    onResendTwoFactorEmailCode,
    onCancelTwoFactor,
    cpf,
    passwordCriteria,
    fulfilledCount,
  } = useCustomerLogin();

  return (
    <AuthPageShell>
      {isVerifyingOtp ? (
        <div className="py-12 flex flex-col items-center justify-center space-y-4 animate-in fade-in">
          <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <Loader2 className="size-8 animate-spin text-primary" />
          </div>
          <div className="text-center space-y-1">
            <h3 className="font-extrabold text-foreground text-lg">
              Acesso autorizado!
            </h3>
            <p className="text-xs text-muted-foreground font-medium">
              Carregando sua conta e entrando...
            </p>
          </div>
        </div>
      ) : pendingTwoFactor ? (
        <TwoFactorChallenge
          email={pendingTwoFactor.email}
          maskedEmail={pendingTwoFactor.maskedEmail}
          availableMethods={pendingTwoFactor.availableMethods}
          currentMethod={pendingTwoFactor.currentMethod}
          onSwitchMethod={onSwitchTwoFactorMethod}
          onVerify={onVerifyTwoFactor}
          onResendEmailCode={onResendTwoFactorEmailCode}
          onCancel={onCancelTwoFactor}
        />
      ) : (
        <LoginCard
          form={form}
          onSubmit={submit}
          isRegister={isRegister}
          loading={loading}
          showPassword={showPassword}
          successMessage={successMessage}
          error={error}
          passwordCriteria={passwordCriteria}
          fulfilledCount={fulfilledCount}
          cpf={cpf}
          onSwitchMode={onSwitchMode}
          onToggleShowPassword={onToggleShowPassword}
          onClearError={onClearError}
        />
      )}
    </AuthPageShell>
  );
}