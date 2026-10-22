import { Suspense } from "react";
import { CustomerLoginContent } from "./_components/customer-login-content";

export default function CustomerLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-32 pb-16 text-center">Carregando acesso...</div>
      }
    >
      <CustomerLoginContent />
    </Suspense>
  );
}
