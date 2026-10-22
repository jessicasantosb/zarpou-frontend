import { Suspense } from "react";
import { LoadingScreen } from "@/components/shared/loading-screen";
import { HospedagensContent } from "./_components/hospedagens-content";

export default function HospedagensPage() {
  return (
    <Suspense
      fallback={
        <LoadingScreen
          title="Buscando Hotéis e Resorts..."
          subtitle="Filtrando acomodações exclusivas, cancelamento grátis e café da manhã incluso"
          type="hotel"
          fullScreen={true}
        />
      }
    >
      <HospedagensContent />
    </Suspense>
  );
}
