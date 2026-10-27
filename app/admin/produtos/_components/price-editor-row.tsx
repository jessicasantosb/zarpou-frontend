import type { ReactNode } from "react";
import { Check, Save } from "lucide-react";
import { cn } from "@/lib/utils";

interface PriceEditorRowProps {
  icon: ReactNode;
  badge: string;
  title: string;
  description: string;
  porLabel: ReactNode;
  deValue: number;
  porValue: number;
  onDeChange: (value: number) => void;
  onPorChange: (value: number) => void;
  isSaved: boolean;
  onSave: () => void;
}

export function PriceEditorRow({
  icon,
  badge,
  title,
  description,
  porLabel,
  deValue,
  porValue,
  onDeChange,
  onPorChange,
  isSaved,
  onSave,
}: PriceEditorRowProps) {
  return (
    <div className="bg-card rounded-3xl p-5 border border-border  flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
      <div className="flex items-center gap-4">
        {icon}
        <div>
          <span className="text-[10px] font-bold text-primary uppercase bg-primary/10 px-2 py-0.5 rounded-md">
            {badge}
          </span>
          <h3 className="text-base font-bold text-foreground mt-1">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-muted-foreground tracking-wide block">
            Preço &quot;De&quot; (Riscado)
          </label>
          <div className="relative">
            <span className="text-xs text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 font-semibold">
              R$
            </span>
            <input
              type="number"
              value={deValue}
              onChange={(event) => onDeChange(Number(event.target.value))}
              className="w-28 h-10 pl-8 pr-2 text-xs font-semibold rounded-xl border border-input outline-hidden focus:border-primary"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-primary tracking-wide block">
            {porLabel}
          </label>
          <div className="relative">
            <span className="text-xs text-primary font-bold absolute left-3 top-1/2 -translate-y-1/2">
              R$
            </span>
            <input
              type="number"
              value={porValue}
              onChange={(event) => onPorChange(Number(event.target.value))}
              className="w-32 h-10 pl-8 pr-2 text-sm font-bold text-primary rounded-xl border border-primary/50 outline-hidden focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={onSave}
          className={cn(
            "h-10 px-5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition self-end cursor-pointer ",
            isSaved
              ? "bg-emerald-600 text-white"
              : "bg-secondary hover:bg-secondary/90 text-primary",
          )}
        >
          {isSaved ? (
            <>
              <Check className="size-4" />
              Salvo!
            </>
          ) : (
            <>
              <Save className="size-4" />
              Salvar Preço
            </>
          )}
        </button>
      </div>
    </div>
  );
}
