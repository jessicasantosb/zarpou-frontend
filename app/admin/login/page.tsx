"use client";

import { Form } from "@/components/ui/form";
import { AdminLoginForm } from "./_components/admin-login-form";
import { TwoFactorPanel } from "./_components/two-factor-panel";
import { VerifyingOtpPanel } from "./_components/verifying-otp-panel";
import { useAdminLogin } from "./_hooks/use-admin-login";

export default function AdminLoginPage() {
  const {
    form,
    error,
    loading,
    isVerifyingOtp,
    pendingTwoFactor,
    onSubmit,
    onVerifyTwoFactor,
    onCancelTwoFactor,
    onResendTwoFactorEmailCode,
    onSwitchTwoFactorMethod,
  } = useAdminLogin();

  return (
    <div className="min-h-screen bg-surface-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card rounded-3xl p-8  border border-white/10 space-y-6">
        {isVerifyingOtp ? (
          <VerifyingOtpPanel />
        ) : pendingTwoFactor ? (
          <TwoFactorPanel
            pending={pendingTwoFactor}
            onVerify={onVerifyTwoFactor}
            onResend={onResendTwoFactorEmailCode}
            onCancel={onCancelTwoFactor}
            onSwitchMethod={onSwitchTwoFactorMethod}
          />
        ) : (
          <Form {...form}>
            <AdminLoginForm
              form={form}
              error={error}
              loading={loading}
              onSubmit={onSubmit}
            />
          </Form>
        )}
      </div>
    </div>
  );
}
