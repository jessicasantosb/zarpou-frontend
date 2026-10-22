import { Loader2 } from "lucide-react";

export function AdminPageTransitionOverlay() {
  return (
    <div className="absolute inset-0 z-30 bg-muted/75 backdrop-blur-md flex flex-col items-center justify-center p-6 animate-in fade-in duration-150 select-none">
      <div className="bg-card/95 border border-border/80 shadow-xl px-7 py-5 rounded-2xl flex flex-col items-center gap-3 backdrop-blur-lg">
        <div className="relative size-10 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
          <Loader2 className="size-5 text-primary animate-spin" />
        </div>
        <div className="text-center">
          <p className="text-xs font-bold text-foreground">
            Carregando painel...
          </p>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            Atualizando conteúdo da tela
          </p>
        </div>
      </div>
    </div>
  );
}
