"use client";

import { ReservasHeader } from "./_components/reservas-header";
import { ReservasTable } from "./_components/reservas-table";
import { useReservas } from "./_hooks/use-reservas";

export default function AdminReservasPage() {
  const {
    mounted,
    search,
    statusFilter,
    onSearchChange,
    onStatusFilterChange,
    filtered,
  } = useReservas();

  if (!mounted) {
    return (
      <div className="p-12 text-center text-muted-foreground text-xs">
        Carregando reservas...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ReservasHeader
        search={search}
        statusFilter={statusFilter}
        onSearchChange={onSearchChange}
        onStatusFilterChange={onStatusFilterChange}
      />

      <ReservasTable bookings={filtered} />
    </div>
  );
}
