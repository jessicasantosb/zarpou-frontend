import { Loader2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestConnectionRowProps {
  onTest: () => void;
  isTesting: boolean;
  status: string | null;
  label: string;
  testingLabel: string;
  iconClassName?: string;
  statusVariant?: "success" | "warning";
}

export function TestConnectionRow({
  onTest,
  isTesting,
  status,
  label,
  testingLabel,
  iconClassName = "text-emerald-600",
  statusVariant = "success",
}: TestConnectionRowProps) {
  return (
    <div className="flex flex-col justify-between gap-3 pt-2 sm:flex-row sm:items-center">
      <button
        type="button"
        disabled={isTesting}
        onClick={onTest}
        className="flex cursor-pointer items-center gap-2 self-start rounded-xl bg-muted px-4 py-2 text-xs font-bold text-foreground/80 transition hover:bg-border disabled:opacity-60"
      >
        {isTesting ? (
          <Loader2 className={cn("size-3.5 animate-spin", iconClassName)} />
        ) : (
          <Zap className={cn("size-3.5", iconClassName)} />
        )}
        {isTesting ? testingLabel : label}
      </button>

      {status && (
        <span
          className={cn(
            "rounded-lg border px-3 py-1.5 text-xs font-bold",
            statusVariant === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-amber-200 bg-amber-50 text-amber-700",
          )}
        >
          {status}
        </span>
      )}
    </div>
  );
}
