import { HOTEL_TABS, type HotelTabId } from "../_constants";
import { cn } from "@/lib/utils";

interface HotelFormTabsProps {
  activeTab: HotelTabId;
  roomsCount: number;
  amenitiesCount: number;
  onChange: (tab: HotelTabId) => void;
}

const getLabel = (
  tab: (typeof HOTEL_TABS)[number],
  roomsCount: number,
  amenitiesCount: number,
) => {
  if (tab.id === "quartos") {
    return `${tab.label} (${roomsCount})`;
  }
  if (tab.id === "comodidades") {
    return `${tab.label} (${amenitiesCount})`;
  }
  return tab.label;
};

export function HotelFormTabs({
  activeTab,
  roomsCount,
  amenitiesCount,
  onChange,
}: HotelFormTabsProps) {
  return (
    <div className="flex shrink-0 gap-2 overflow-x-auto border-b border-border bg-muted/80 px-4 pt-2">
      {HOTEL_TABS.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              "flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-t-xl px-4 py-2.5 text-xs font-bold transition",
              activeTab === tab.id
                ? "border-t-2 border-primary bg-card text-primary "
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon className={cn("size-3.5", tab.id === "quartos" && "text-secondary")} />
            {getLabel(tab, roomsCount, amenitiesCount)}
          </button>
        );
      })}
    </div>
  );
}
