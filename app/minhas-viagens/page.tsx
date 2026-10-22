import { Suspense } from "react";
import { LoadingScreen } from "@/components/shared/loading-screen";
import { MinhasViagensContent } from "./_components/minhas-viagens-content";

export default function MinhasViagensPage() {
  return (
    <Suspense
      fallback={
        <LoadingScreen
          title="Acessando Área do Viajante..."
          subtitle="Buscando suas reservas e vouchers de viagem..."
          fullScreen={true}
        />
      }
    >
      <MinhasViagensContent />
    </Suspense>
  );
}
