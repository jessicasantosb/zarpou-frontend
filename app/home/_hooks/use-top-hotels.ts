"use client";

import { useEffect, useState } from "react";
import { useBookingStore } from "@/stores/booking-store";
import { useProductStore } from "@/stores/product-store";

export function useTopHotels() {
  const { hotels, fetchHotels } = useProductStore();
  const { bookings } = useBookingStore();
  const [mounted, setMounted] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>("all");

  useEffect(() => {
    setMounted(true);
    if (hotels.length === 0) {
      fetchHotels();
    }
  }, [hotels.length, fetchHotels]);

  const safeHotels = mounted ? hotels : [];

  const cities = ["all", ...Array.from(new Set(safeHotels.map((h) => h.city)))];

  const filteredHotels =
    selectedCity === "all"
      ? safeHotels.slice(0, 3)
      : safeHotels.filter((h) => h.city === selectedCity).slice(0, 3);

  return {
    bookings,
    cities,
    selectedCity,
    onCityChange: setSelectedCity,
    filteredHotels,
  };
}
