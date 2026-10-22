import { Calendar, ShieldCheck } from "lucide-react";
import { formatDateBR } from "@/lib/format-date";

interface StaySummarySidebarProps {
  checkIn: string;
  checkOut: string;
  nights: number;
  adults: number;
  childCount: number;
}

export function StaySummarySidebar({
  checkIn,
  checkOut,
  nights,
  adults,
  childCount,
}: StaySummarySidebarProps) {
  return (
    <aside className="lg:col-span-4 space-y-6">
      <div className="bg-card rounded-3xl p-6 border border-border shadow-xs sticky top-24 space-y-6">
        <h3 className="font-bold text-foreground text-base pb-3 border-b border-border/60 flex items-center gap-2">
          <Calendar className="size-4 text-primary" />
          Resumo da Estadia
        </h3>

        <div className="space-y-3 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground font-medium">Check-in:</span>
            <span className="font-bold text-foreground">
              {formatDateBR(checkIn)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground font-medium">Check-out:</span>
            <span className="font-bold text-foreground">
              {formatDateBR(checkOut)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground font-medium">Duração:</span>
            <span className="font-bold text-foreground">
              {nights} {nights === 1 ? "noite" : "noites"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground font-medium">Hóspedes:</span>
            <span className="font-bold text-foreground">
              {adults} adultos
              {childCount > 0 && `, ${childCount} crianças`}
            </span>
          </div>
        </div>

        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 space-y-1.5">
          <p className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
            <ShieldCheck className="size-4 text-emerald-600" />
            Garantia de Melhor Preço Zarpou
          </p>
          <p className="text-[11px] text-emerald-700 leading-relaxed">
            Sem taxas ocultas. Pagamento seguro pelo próprio app em até 12x ou
            Pix com 5% de desconto.
          </p>
        </div>

        <div className="pt-2">
          <p className="text-xs text-muted-foreground text-center">
            Dúvidas sobre o hotel? Fale com a equipe Zarpou pelo WhatsApp.
          </p>
        </div>
      </div>
    </aside>
  );
}
