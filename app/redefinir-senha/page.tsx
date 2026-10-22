import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { AuthPageShell } from "@/components/shared/auth-page-shell";
import { ResetPasswordCard } from "./_components/reset-password-card";

export default function RedefinirSenhaPage() {
  return (
    <AuthPageShell>
      <Suspense
        fallback={
          <div className="py-16 flex flex-col items-center gap-3">
            <Loader2 className="size-8 animate-spin text-primary" />
            <span className="text-xs font-semibold text-muted-foreground">
              Validando seu link...
            </span>
          </div>
        }
      >
        <ResetPasswordCard />
      </Suspense>
    </AuthPageShell>
  );
}
