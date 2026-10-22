import { TwoFactorChallenge } from "@/components/auth/two-factor-challenge";
import type { PendingTwoFactorAuth } from "@/stores/auth-store";

interface TwoFactorPanelProps {
  pending: PendingTwoFactorAuth;
  onVerify: (code: string) => Promise<{ success: boolean; message?: string }>;
  onResend: () => Promise<{ success: boolean; message?: string }>;
  onCancel: () => void;
  onSwitchMethod: (method: "email" | "authenticator") => void;
}

export function TwoFactorPanel({
  pending,
  onVerify,
  onResend,
  onCancel,
  onSwitchMethod,
}: TwoFactorPanelProps) {
  return (
    <TwoFactorChallenge
      email={pending.email}
      maskedEmail={pending.maskedEmail}
      availableMethods={pending.availableMethods}
      currentMethod={pending.currentMethod}
      onSwitchMethod={onSwitchMethod}
      onVerify={onVerify}
      onResendEmailCode={onResend}
      onCancel={onCancel}
    />
  );
}
