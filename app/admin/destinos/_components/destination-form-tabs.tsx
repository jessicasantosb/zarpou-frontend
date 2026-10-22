import { DESTINATION_TABS, type DestinationTabId } from "../_constants";
import { cn } from "@/lib/utils";

interface DestinationFormTabsProps {
  activeTab: DestinationTabId;
  onChange: (tab: DestinationTabId) => void;
}

export function DestinationFormTabs({
  activeTab,
  onChange,
}: DestinationFormTabsProps) {
  return (
    <div className="flex shrink-0 gap-2 overflow-x-auto border-b border-border bg-card px-5 pt-2">
      {DESTINATION_TABS.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              "flex cursor-pointer items-center gap-2 whitespace-nowrap border-b-2 px-4 py-2.5 text-xs font-bold transition",
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground/80",
            )}
          >
            <Icon className="size-3.5" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
