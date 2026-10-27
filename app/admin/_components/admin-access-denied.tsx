import { ShieldAlert, Loader2 } from "lucide-react";

export function AdminAccessDenied() {
  return (
    <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-150 select-none">
      <div className="bg-card p-8 rounded-3xl border border-border  flex flex-col items-center max-w-sm">
        <div className="size-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mb-4">
          <ShieldAlert className="size-7" />
        </div>
        <h3 className="text-base font-black text-foreground">
          Acesso Restrito
        </h3>
        <p className="text-xs text-muted-foreground mt-2 mb-6 leading-relaxed">
          Você não possui permissão para acessar esta tela. Redirecionando...
        </p>
        <div className="flex items-center gap-2 text-xs font-bold text-primary">
          <Loader2 className="size-4 animate-spin" />
          <span>Redirecionando...</span>
        </div>
      </div>
    </div>
  );
}
