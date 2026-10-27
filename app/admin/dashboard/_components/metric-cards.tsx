import Link from "next/link";
import type { ReactNode } from "react";
import {
  CalendarCheck,
  DollarSign,
  Hotel,
  Tag,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

interface MetricCardsProps {
  totalRevenue: number;
  totalBookings: number;
  activePromos: number;
  totalProducts: number;
}

interface MetricCardConfig {
  label: string;
  value: string;
  valueClassName?: string;
  footer: ReactNode;
  icon: LucideIcon;
  iconClassName: string;
}

export function MetricCards({
  totalRevenue,
  totalBookings,
  activePromos,
  totalProducts,
}: MetricCardsProps) {
  const cards: MetricCardConfig[] = [
    {
      label: "Faturamento Total",
      value: `R$ ${totalRevenue.toFixed(2)}`,
      valueClassName: "text-primary",
      footer: (
        <span className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
          <TrendingUp className="size-3" />
          100% no app próprio
        </span>
      ),
      icon: DollarSign,
      iconClassName: "bg-primary/10 text-primary",
    },
    {
      label: "Reservas Realizadas",
      value: String(totalBookings),
      footer: (
        <span className="mt-1 block text-[11px] font-semibold text-muted-foreground">
          Comprovantes gerados
        </span>
      ),
      icon: CalendarCheck,
      iconClassName: "bg-secondary/20 text-primary",
    },
    {
      label: "Promoções Ativas",
      value: String(activePromos),
      footer: (
        <Link
          href="/admin/promocoes"
          className="mt-1 block text-[11px] font-semibold text-primary hover:underline"
        >
          Gerenciar Banners →
        </Link>
      ),
      icon: Tag,
      iconClassName: "bg-amber-100 text-amber-700",
    },
    {
      label: "Catálogo Ativo",
      value: String(totalProducts),
      footer: (
        <Link
          href="/admin/produtos"
          className="mt-1 block text-[11px] font-semibold text-primary hover:underline"
        >
          Ajustar Preços →
        </Link>
      ),
      icon: Hotel,
      iconClassName: "bg-muted text-foreground/80",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="flex items-center justify-between rounded-3xl border border-border bg-card p-6 "
          >
            <div>
              <span className="text-[11px] font-bold tracking-wide text-muted-foreground">
                {card.label}
              </span>
              <p
                className={`mt-1 text-2xl font-black ${
                  card.valueClassName ?? "text-foreground"
                }`}
              >
                {card.value}
              </p>
              {card.footer}
            </div>
            <div
              className={`flex size-12 items-center justify-center rounded-2xl ${card.iconClassName}`}
            >
              <Icon className="size-6" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
