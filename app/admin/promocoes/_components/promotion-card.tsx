import Image from "next/image";
import {
  Bell,
  CheckCheck,
  CheckCircle2,
  Image as ImageIcon,
  Pencil,
  Tag,
  Trash2,
  XCircle,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Promotion } from "@/types/promotion";

interface PromotionCardProps {
  promo: Promotion;
  onEdit: (promo: Promotion) => void;
  onDelete: (promo: Promotion) => void;
  onToggleActive: (promo: Promotion) => void;
  onNotify: (promo: Promotion) => void;
}

export function PromotionCard({
  promo,
  onEdit,
  onDelete,
  onToggleActive,
  onNotify,
}: PromotionCardProps) {
  return (
    <div
      className={cn(
        "group bg-card rounded-3xl border overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between",
        promo.active
          ? "border-border"
          : "border-border opacity-60 bg-muted/60",
      )}
    >
      <div>
        <div className="relative h-52 w-full bg-muted overflow-hidden">
          {promo.imageUrl ? (
            <Image
              src={promo.imageUrl}
              alt={promo.title}
              fill
              unoptimized={promo.imageUrl.startsWith("data:")}
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <ImageIcon className="size-8" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-foreground/25 pointer-events-none" />

          <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 z-10">
            <div className="bg-secondary text-primary text-[10px] font-black px-2.5 py-1 rounded-full uppercase shadow-xs flex items-center gap-1">
              <Zap className="size-3 fill-primary text-primary" />
              <span>{promo.badge}</span>
            </div>

            <div className="bg-emerald-600 text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-xs flex items-center gap-1 border border-emerald-400/30">
              <Tag className="size-3" />
              <span>{promo.discountText}</span>
            </div>
          </div>

          <div className="absolute bottom-3 left-3 right-3 z-10 text-white">
            <h3 className="font-extrabold text-base leading-snug text-white drop-shadow-md line-clamp-1">
              {promo.title}
            </h3>
          </div>
        </div>

        <div className="p-4 space-y-2">
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {promo.subtitle}
          </p>
          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-border/60">
            <span className="text-muted-foreground font-medium">Destino:</span>
            <span className="text-primary font-bold truncate max-w-[200px]">
              {promo.link}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 pt-0 border-t border-border/60 flex items-center justify-between mt-2 pt-3 bg-muted/50">
        <button
          type="button"
          onClick={() => onToggleActive(promo)}
          className={cn(
            "text-xs font-bold flex items-center gap-1.5 cursor-pointer",
            promo.active ? "text-emerald-600" : "text-muted-foreground",
          )}
        >
          {promo.active ? (
            <>
              <CheckCircle2 className="size-4" />
              Ativa no Site
            </>
          ) : (
            <>
              <XCircle className="size-4" />
              Pausada
            </>
          )}
        </button>

        <div className="flex items-center gap-1">
          {promo.notificationSent ? (
            <span
              className="p-2 text-emerald-700 bg-emerald-100/70 rounded-lg cursor-not-allowed flex items-center"
              title={`Notificação já enviada anteriormente${promo.notificationSentAt ? ` (${new Date(promo.notificationSentAt).toLocaleDateString("pt-BR")})` : ""}`}
            >
              <CheckCheck className="size-4 text-emerald-600" />
            </span>
          ) : (
            <button
              type="button"
              onClick={() => onNotify(promo)}
              className="p-2 text-muted-foreground hover:text-emerald-600 transition rounded-lg hover:bg-emerald-50 cursor-pointer"
              title="Disparar Notificações (WhatsApp e E-mail) - Válido 1 única vez"
            >
              <Bell className="size-4" />
            </button>
          )}

          <button
            type="button"
            onClick={() => onEdit(promo)}
            className="p-2 text-muted-foreground hover:text-primary transition rounded-lg hover:bg-muted cursor-pointer"
            title="Editar Promoção"
          >
            <Pencil className="size-4" />
          </button>

          <button
            type="button"
            onClick={() => onDelete(promo)}
            className="p-2 text-muted-foreground hover:text-destructive transition rounded-lg hover:bg-destructive/20 cursor-pointer"
            title="Excluir Promoção"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
