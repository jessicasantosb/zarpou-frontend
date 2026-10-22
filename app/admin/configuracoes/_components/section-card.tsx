import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  icon: LucideIcon;
  title: string;
  iconClassName?: string;
  headerExtra?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
}

export function SectionCard({
  icon: Icon,
  title,
  iconClassName = "text-primary",
  headerExtra,
  description,
  children,
}: SectionCardProps) {
  return (
    <section className="space-y-4 rounded-3xl border border-border bg-card p-6 shadow-xs">
      <div className="flex flex-col gap-3 border-b border-border/60 pb-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm font-bold text-foreground">
          <Icon className={cn("size-4", iconClassName)} />
          {title}
        </div>
        {headerExtra}
      </div>

      {description && <p className="text-xs text-muted-foreground">{description}</p>}

      {children}
    </section>
  );
}
