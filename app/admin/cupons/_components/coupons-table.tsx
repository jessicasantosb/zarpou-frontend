"use client";

import { Bell, CheckCheck, Pencil, Ticket, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { Coupon } from "@/types/coupon";

interface CouponsTableProps {
  coupons: Coupon[];
  isLoading: boolean;
  onEdit: (coupon: Coupon) => void;
  onToggleActive: (coupon: Coupon) => void;
  onNotify: (coupon: Coupon) => void;
  onDelete: (coupon: Coupon) => void;
}

function formatDate(value: string | null): string | null {
  if (!value) return null;
  const date = new Date(`${value.slice(0, 10)}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("pt-BR");
}

function discountLabel(coupon: Coupon): string {
  return coupon.discountType === "percent"
    ? `${coupon.discountValue}% de desconto`
    : `R$ ${coupon.discountValue.toFixed(2)} de desconto`;
}

function validityInfo(coupon: Coupon): { label: string; tone: "neutral" | "danger" | "info" } {
  const today = new Date().toISOString().slice(0, 10);
  const from = coupon.validFrom?.slice(0, 10) ?? null;
  const to = coupon.validTo?.slice(0, 10) ?? null;

  if (to && to < today) return { label: "Expirado", tone: "danger" };
  if (from && from > today) return { label: `Válido a partir de ${formatDate(from)}`, tone: "info" };
  if (from && to) return { label: `${formatDate(from)} — ${formatDate(to)}`, tone: "neutral" };
  if (to) return { label: `Até ${formatDate(to)}`, tone: "neutral" };
  if (from) return { label: `Desde ${formatDate(from)}`, tone: "neutral" };
  return { label: "Sem prazo de validade", tone: "neutral" };
}

export function CouponsTable({
  coupons,
  isLoading,
  onEdit,
  onToggleActive,
  onNotify,
  onDelete,
}: CouponsTableProps) {
  if (isLoading && coupons.length === 0) {
    return (
      <div className="bg-card rounded-3xl border border-border p-12 text-center text-sm text-muted-foreground">
        Carregando cupons...
      </div>
    );
  }

  if (coupons.length === 0) {
    return (
      <div className="bg-card rounded-3xl border border-border p-12 text-center space-y-3">
        <div className="size-14 rounded-full bg-muted flex items-center justify-center mx-auto">
          <Ticket className="size-6 text-muted-foreground" />
        </div>
        <p className="font-bold text-foreground text-sm">Nenhum cupom encontrado</p>
        <p className="text-xs text-muted-foreground">
          Crie seu primeiro cupom de desconto para premiar clientes ou impulsionar vendas.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-3xl border border-border shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border bg-muted/60 text-muted-foreground text-left">
              <th className="px-5 py-3.5 font-bold">Cupom</th>
              <th className="px-5 py-3.5 font-bold">Desconto</th>
              <th className="px-5 py-3.5 font-bold">Usos</th>
              <th className="px-5 py-3.5 font-bold">Validade</th>
              <th className="px-5 py-3.5 font-bold">Status</th>
              <th className="px-5 py-3.5 font-bold text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => {
              const validity = validityInfo(coupon);
              return (
                <tr
                  key={coupon.id}
                  className="border-b border-border/60 last:border-b-0 hover:bg-muted/40 transition"
                >
                  <td className="px-5 py-4">
                    <span className="font-mono font-black text-sm text-foreground tracking-wide">
                      {coupon.code}
                    </span>
                    {coupon.description && (
                      <p className="text-[11px] text-muted-foreground mt-0.5 max-w-56 truncate">
                        {coupon.description}
                      </p>
                    )}
                  </td>
                  <td className="px-5 py-4 font-semibold text-foreground/80 whitespace-nowrap">
                    {discountLabel(coupon)}
                    {coupon.minOrderAmount !== null && (
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        Pedido mínimo R$ {coupon.minOrderAmount.toFixed(2)}
                      </p>
                    )}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="font-bold text-foreground/80">
                      {coupon.usedCount}
                      {coupon.maxUses !== null && ` / ${coupon.maxUses}`}
                    </span>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {coupon.perCustomerLimit}x por cliente
                    </p>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span
                      className={
                        validity.tone === "danger"
                          ? "text-destructive font-semibold"
                          : validity.tone === "info"
                            ? "text-amber-600 font-semibold"
                            : "text-foreground/80"
                      }
                    >
                      {validity.label}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                        coupon.active
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-muted text-muted-foreground border-border"
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${coupon.active ? "bg-emerald-500" : "bg-muted-foreground/50"}`}
                      />
                      {coupon.active ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        title={
                          coupon.notificationSent
                            ? "Notificação já enviada — clique para reenviar"
                            : "Enviar notificação do cupom"
                        }
                        onClick={() => onNotify(coupon)}
                        className={`p-2 rounded-lg hover:bg-muted transition cursor-pointer ${
                          coupon.notificationSent
                            ? "text-emerald-600"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {coupon.notificationSent ? (
                          <CheckCheck className="size-4" />
                        ) : (
                          <Bell className="size-4" />
                        )}
                      </button>
                      <button
                        type="button"
                        title={coupon.active ? "Desativar cupom" : "Ativar cupom"}
                        onClick={() => onToggleActive(coupon)}
                        className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition cursor-pointer"
                      >
                        {coupon.active ? (
                          <ToggleRight className="size-4 text-emerald-600" />
                        ) : (
                          <ToggleLeft className="size-4" />
                        )}
                      </button>
                      <button
                        type="button"
                        title="Editar cupom"
                        onClick={() => onEdit(coupon)}
                        className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition cursor-pointer"
                      >
                        <Pencil className="size-4" />
                      </button>
                      <button
                        type="button"
                        title="Excluir cupom"
                        onClick={() => onDelete(coupon)}
                        className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-destructive transition cursor-pointer"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
