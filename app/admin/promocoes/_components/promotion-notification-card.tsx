import {
  BellRing,
  CheckCheck,
  Mail,
  MessageSquare,
} from "lucide-react";

interface PromotionNotificationCardProps {
  alreadySent: boolean;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function PromotionNotificationCard({
  alreadySent,
  checked,
  onCheckedChange,
}: PromotionNotificationCardProps) {
  if (alreadySent) {
    return (
      <div className="p-4 bg-muted border border-border rounded-2xl flex items-center justify-between gap-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <CheckCheck className="size-4" />
          </div>
          <div>
            <p className="font-bold text-foreground">
              Notificação já enviada anteriormente aos viajantes
            </p>
            <p className="text-[11px] text-muted-foreground">
              Esta promoção já teve seu disparo único realizado e não pode ser
              reenviada.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="size-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 ">
            <BellRing className="size-4.5" />
          </div>
          <div>
            <h4 className="font-bold text-foreground text-xs sm:text-sm">
              Disparar notificação aos clientes cadastrados
            </h4>
            <p className="text-[11px] text-foreground/70">
              Envia alerta no WhatsApp e e-mail automático aos viajantes
              (permitido apenas 1 disparo).
            </p>
          </div>
        </div>

        <label className="relative inline-flex items-center cursor-pointer shrink-0">
          <input
            type="checkbox"
            checked={checked}
            onChange={(event) => onCheckedChange(event.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-border peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-card after:border-input after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
        </label>
      </div>

      <div className="flex items-center gap-4 text-[10px] text-muted-foreground pt-1.5 border-t border-emerald-200/60">
        <span className="flex items-center gap-1 font-semibold text-emerald-800">
          <MessageSquare className="size-3 text-emerald-600" />
          WhatsApp Opt-in
        </span>
        <span className="flex items-center gap-1 font-semibold text-blue-800">
          <Mail className="size-3 text-blue-600" />
          E-mail Promocional
        </span>
      </div>
    </div>
  );
}
