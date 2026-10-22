import { Suspense } from "react";
import { LoadingScreen } from "@/components/shared/loading-screen";
import { PacotesContent } from "./_components/pacotes-content";

export default function PacotesPage() {
  return (
    <Suspense
      fallback={
        <LoadingScreen
          title="Carregando Pacotes Promocionais..."
          subtitle="Combinando voos e hospedagens com até 25% de economia em 12x sem juros"
          type="package"
          fullScreen={true}
        />
      }
    >
      <PacotesContent />
    </Suspense>
  );
}
