import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface HeroSectionCardProps {
  icon: LucideIcon;
  title: string;
  headerExtra?: ReactNode;
  children: ReactNode;
}

export function HeroSectionCard({
  icon: Icon,
  title,
  headerExtra,
  children,
}: HeroSectionCardProps) {
  return (
    <section className="space-y-4 rounded-3xl border border-border bg-card p-6 ">
      <div className="flex flex-col gap-2 border-b border-border/60 pb-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm font-bold text-foreground">
          <Icon className="size-4 text-primary" />
          {title}
        </div>
        {headerExtra}
      </div>

      {children}
    </section>
  );
}
