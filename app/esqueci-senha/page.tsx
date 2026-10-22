import { AuthPageShell } from "@/components/shared/auth-page-shell";
import { ForgotPasswordCard } from "./_components/forgot-password-card";

export default function EsqueciSenhaPage() {
  return (
    <AuthPageShell>
      <ForgotPasswordCard />
    </AuthPageShell>
  );
}
