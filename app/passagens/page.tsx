import { Suspense } from "react";
import { LoadingScreen } from "@/components/shared/loading-screen";
import { PassagensContent } from "./_components/passagens-content";

export default function PassagensPage() {
  return (
    <Suspense
      fallback={
        <LoadingScreen
          title="Pesquisando Tarifas Aéreas..."
          subtitle="Conectando com companhias aéreas nacionais e internacionais com taxas inclusas"
          type="flight"
          fullScreen={true}
        />
      }
    >
      <PassagensContent />
    </Suspense>
  );
}
