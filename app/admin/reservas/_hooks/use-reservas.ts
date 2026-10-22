"use client";

import { useEffect, useState } from "react";
import { useBookingStore } from "@/stores/booking-store";

export function useReservas() {
  const { bookings, fetchAllBookings } = useBookingStore();

  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

  useEffect(() => {
    setMounted(true);
    fetchAllBookings();
  }, [fetchAllBookings]);

  const safeBookings = Array.isArray(bookings) ? bookings : [];

  const filtered = safeBookings.filter((booking) => {
    if (statusFilter !== "todos" && booking.status !== statusFilter)
      return false;
    if (!search) return true;
    const term = search.toLowerCase();
    return (
      (booking.locatorCode || "").toLowerCase().includes(term) ||
      booking.travelers?.some((traveler) =>
        (traveler.fullName || "").toLowerCase().includes(term),
      ) ||
      (booking.hotel?.name || "").toLowerCase().includes(term)
    );
  });

  return {
    mounted,
    search,
    statusFilter,
    onSearchChange: setSearch,
    onStatusFilterChange: setStatusFilter,
    filtered,
  };
}
