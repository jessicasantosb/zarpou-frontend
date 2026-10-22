import { cn } from "@/lib/utils";
import { PASSAGENS_TABS, type PassagensTabId } from "../_constants";

interface FlightFormTabsProps {
  activeTab: PassagensTabId;
  isRoundTrip: boolean;
  onChange: (tab: PassagensTabId) => void;
}

export function FlightFormTabs({
  activeTab,
  isRoundTrip,
  onChange,
}: FlightFormTabsProps) {
  return (
    <div className="flex border-b border-border bg-card px-5 pt-2 gap-2 overflow-x-auto shrink-0">
      {PASSAGENS_TABS.map((tab) => {
        const Icon = tab.icon;
        const label =
          tab.id === "return"
            ? `${tab.label} (${isRoundTrip ? "Ida & Volta" : "Só Ida"})`
            : tab.label;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition cursor-pointer whitespace-nowrap",
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground/80",
            )}
          >
            <Icon className="size-3.5" />
            {label}
          </button>
        );
      })}
    </div>
  );
}
