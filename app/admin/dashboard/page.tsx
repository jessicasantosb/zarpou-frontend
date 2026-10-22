"use client";

import { DashboardHeader } from "./_components/dashboard-header";
import { MetricCards } from "./_components/metric-cards";
import { RecentBookingsCard } from "./_components/recent-bookings-card";
import { useDashboard } from "./_hooks/use-dashboard";

export default function AdminDashboardPage() {
  const {
    mounted,
    totalRevenue,
    totalBookings,
    activePromos,
    totalProducts,
    recentBookings,
  } = useDashboard();

  if (!mounted) {
    return (
      <div className="p-12 text-center text-muted-foreground text-xs">
        Carregando painel administrativo...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <DashboardHeader />

      <MetricCards
        totalRevenue={totalRevenue}
        totalBookings={totalBookings}
        activePromos={activePromos}
        totalProducts={totalProducts}
      />

      <RecentBookingsCard bookings={recentBookings} />
    </div>
  );
}
