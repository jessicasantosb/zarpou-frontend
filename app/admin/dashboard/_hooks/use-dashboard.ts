"use client";

import { useEffect, useMemo, useState } from "react";
import { useBookingStore } from "@/stores/booking-store";
import { useProductStore } from "@/stores/product-store";
import { usePromotionStore } from "@/stores/promotion-store";

export function useDashboard() {
  const { bookings } = useBookingStore();
  const { hotels, flights } = useProductStore();
  const { promotions } = usePromotionStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const safeBookings = useMemo(
    () => (Array.isArray(bookings) ? bookings : []),
    [bookings],
  );
  const safeHotels = useMemo(
    () => (Array.isArray(hotels) ? hotels : []),
    [hotels],
  );
  const safeFlights = useMemo(
    () => (Array.isArray(flights) ? flights : []),
    [flights],
  );
  const safePromotions = useMemo(
    () => (Array.isArray(promotions) ? promotions : []),
    [promotions],
  );

  const totalRevenue = useMemo(
    () =>
      safeBookings.reduce(
        (sum, booking) => sum + (booking?.pricing?.finalAmount || 0),
        0,
      ),
    [safeBookings],
  );

  const totalBookings = safeBookings.length;

  const activePromos = useMemo(
    () => safePromotions.filter((promotion) => promotion?.active).length,
    [safePromotions],
  );

  const totalProducts = safeHotels.length + safeFlights.length;

  const recentBookings = useMemo(
    () => safeBookings.slice(0, 5),
    [safeBookings],
  );

  return {
    mounted,
    totalRevenue,
    totalBookings,
    activePromos,
    totalProducts,
    recentBookings,
  };
}
