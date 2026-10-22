import { Loader2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConfiguracoesHeaderProps {
  isLoading: boolean;
  isSaving: boolean;
  onReset: () => void;
}

export function ConfiguracoesHeader({
  isLoading,
  isSaving,
  onReset,
}: ConfiguracoesHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-black text-foreground">
            Configurações Gerais & Integrações
          </h1>
          {isLoading && (
            <span className="inline-flex animate-pulse items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
              <Loader2 className="size-3 animate-spin" /> Sincronizando com o
              banco...
            </span>
          )}
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Gerencie dados cadastrais, chaves das APIs de Pagamento, token do
          WhatsApp e políticas da agência
        </p>
      </div>

      <Button
        type="button"
        onClick={onReset}
        disabled={isSaving}
        variant="outline"
        className="h-auto self-start rounded-xl border-border bg-card px-4 py-2 text-xs font-semibold text-foreground/70 hover:bg-muted sm:self-auto"
      >
        <RotateCcw className="size-3.5" />
        Restaurar Padrão
      </Button>
    </div>
  );
}
