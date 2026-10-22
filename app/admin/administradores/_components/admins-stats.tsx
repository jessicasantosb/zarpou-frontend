import { Shield, UserCheck, UserX } from "lucide-react";

export interface AdminsStatsValues {
  total: number;
  active: number;
  inactive: number;
}

interface AdminsStatsProps {
  stats: AdminsStatsValues;
}

const cards = [
  {
    key: "total",
    label: "Total de Membros",
    labelClassName: "text-muted-foreground",
    valueClassName: "text-foreground",
    icon: Shield,
    iconWrapperClassName: "bg-muted text-foreground/80",
  },
  {
    key: "active",
    label: "Contas Ativas",
    labelClassName: "text-emerald-600",
    valueClassName: "text-emerald-700",
    icon: UserCheck,
    iconWrapperClassName: "bg-emerald-50 text-emerald-600",
  },
  {
    key: "inactive",
    label: "Contas Inativas",
    labelClassName: "text-muted-foreground",
    valueClassName: "text-muted-foreground",
    icon: UserX,
    iconWrapperClassName: "bg-muted text-muted-foreground",
  },
] as const;

export function AdminsStats({ stats }: AdminsStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.key}
            className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-2xs"
          >
            <div>
              <p
                className={`text-xs font-semibold tracking-wide ${card.labelClassName}`}
              >
                {card.label}
              </p>
              <p
                className={`mt-1 text-2xl font-black ${card.valueClassName}`}
              >
                {stats[card.key]}
              </p>
            </div>
            <div
              className={`rounded-xl p-3 ${card.iconWrapperClassName}`}
            >
              <Icon className="size-5" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
