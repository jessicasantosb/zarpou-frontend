import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroHeaderProps {
  isSaving: boolean;
  onReset: () => void;
}

export function HeroHeader({ isSaving, onReset }: HeroHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-2xl font-black text-foreground">
          Gestão do Hero Principal
        </h1>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Personalize os títulos, textos de destaque, imagem de fundo ou vídeo e
          botões da primeira dobra do site
        </p>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={onReset}
        disabled={isSaving}
        className="h-auto cursor-pointer self-start rounded-xl border-border bg-card px-4 py-2 text-xs font-semibold text-foreground/70 transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50 sm:self-auto"
      >
        <RotateCcw className="size-3.5" />
        Restaurar Padrão
      </Button>
    </div>
  );
}
