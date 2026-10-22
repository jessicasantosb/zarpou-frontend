import { Loader2 } from "lucide-react";

export function VerifyingOtpPanel() {
  return (
    <div className="animate-in flex flex-col items-center justify-center space-y-4 py-12 fade-in">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
      <div className="space-y-1 text-center">
        <h3 className="text-lg font-extrabold text-foreground">
          Acesso autorizado!
        </h3>
        <p className="text-xs font-medium text-muted-foreground">
          Carregando painel administrativo...
        </p>
      </div>
    </div>
  );
}
