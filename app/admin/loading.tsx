import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="w-full h-full min-h-[450px] flex-1 flex flex-col items-center justify-center p-8 bg-muted/75 backdrop-blur-md rounded-3xl border border-border/60 shadow-xs animate-in fade-in duration-200">
      <div className="bg-card/95 border border-border/80 shadow-lg px-8 py-6 rounded-2xl flex flex-col items-center gap-3 backdrop-blur-md">
        <div className="relative size-10 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
          <Loader2 className="size-5 text-primary animate-spin" />
        </div>
        <div className="text-center">
          <p className="text-xs font-bold text-foreground">
            Carregando painel...
          </p>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            Sincronizando dados da tela
          </p>
        </div>
      </div>
    </div>
  );
}
