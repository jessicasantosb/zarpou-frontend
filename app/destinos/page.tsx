import { Suspense } from "react";
import { LoadingScreen } from "@/components/shared/loading-screen";
import { DestinosContent } from "./_components/destinos-content";

export default function DestinosPage() {
  return (
    <Suspense
      fallback={
        <LoadingScreen
          title="Carregando Lugares Imperdíveis..."
          subtitle="Sincronizando destinos e pacotes da Zarpou"
          type="package"
          fullScreen={true}
        />
      }
    >
      <DestinosContent />
    </Suspense>
  );
}
