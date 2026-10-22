import { Luggage, ShieldCheck, Users } from "lucide-react";

export function DestinosBenefits() {
  return (
    <div className="mt-16 bg-card rounded-3xl p-8 border border-border shadow-xs grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
      <div className="space-y-2">
        <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
          <Luggage className="size-6" />
        </div>
        <h4 className="font-bold text-foreground text-sm">Economia Combinada</h4>
        <p className="text-xs text-muted-foreground">
          Passagens aéreas e hotéis contratados em bloco com desconto de até
          30% em relação a compras avulsas.
        </p>
      </div>

      <div className="space-y-2">
        <div className="size-12 rounded-2xl bg-secondary/20 text-secondary flex items-center justify-center mx-auto">
          <ShieldCheck className="size-6" />
        </div>
        <h4 className="font-bold text-foreground text-sm">Garantia Zarpou</h4>
        <p className="text-xs text-muted-foreground">
          Vouchers emitidos no mesmo instante com todas as políticas de
          cancelamento e suporte 24 horas.
        </p>
      </div>

      <div className="space-y-2">
        <div className="size-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
          <Users className="size-6" />
        </div>
        <h4 className="font-bold text-foreground text-sm">
          Consultoria Especializada
        </h4>
        <p className="text-xs text-muted-foreground">
          Precisa de ajuda com passeios, ingressos ou datas flexíveis? Fale
          diretamente com nossa equipe via WhatsApp.
        </p>
      </div>
    </div>
  );
}
