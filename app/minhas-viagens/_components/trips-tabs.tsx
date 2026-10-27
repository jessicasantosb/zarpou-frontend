import Link from "next/link";
import { ArrowRight, BellRing, Calendar } from "lucide-react";

interface TripsTabsProps {
  activeTab: "reservas" | "perfil";
  bookingsCount: number;
  onTabChange: (tab: "reservas" | "perfil") => void;
}

export function TripsTabs({
  activeTab,
  bookingsCount,
  onTabChange,
}: TripsTabsProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
      <div className="inline-flex p-1 bg-muted/80 rounded-2xl gap-1">
        <button
          type="button"
          onClick={() => onTabChange("reservas")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer ${
            activeTab === "reservas"
              ? "bg-card text-primary "
              : "text-foreground/70 hover:text-foreground"
          }`}
        >
          <Calendar className="size-4 text-primary" />
          <span>Minhas Viagens</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
              activeTab === "reservas"
                ? "bg-secondary text-primary"
                : "bg-border text-foreground/80"
            }`}
          >
            {bookingsCount}
          </span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange("perfil")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer ${
            activeTab === "perfil"
              ? "bg-card text-primary "
              : "text-foreground/70 hover:text-foreground"
          }`}
        >
          <BellRing className="size-4 text-primary" />
          <span>Meu Perfil & Notificações</span>
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
        </button>
      </div>

      {activeTab === "reservas" && (
        <Link
          href="/hospedagens"
          className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
        >
          Planejar Nova Viagem
          <ArrowRight className="size-3.5 text-secondary" />
        </Link>
      )}
    </div>
  );
}
