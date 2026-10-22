"use client";

import { useEffect, useState } from "react";
import { useBookingStore } from "@/stores/booking-store";
import { useConfigStore } from "@/stores/config-store";
import { Booking } from "@/types/booking";
import { TravelerInfo } from "@/types/checkout";

export type BookingPrimaryTraveler = TravelerInfo;

export function useBookingConfirmed(bookingId: string) {
  const { bookings } = useBookingStore();
  const { config } = useConfigStore();

  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const booking: Booking | undefined =
    bookings.find((b) => b.id === bookingId) || bookings[0];

  const isPix = booking?.paymentMethod === "pix";

  const primaryTraveler = (booking?.travelers[0] || {
    fullName: "Viajante Zarpou",
    documentNumber: "000.000.000-00",
    email: "cliente@zarpouviagens.com.br",
    phone: "(31) 98421-0000",
  }) as BookingPrimaryTraveler;

  const handleCopyPix = () => {
    if (booking?.pixCode) {
      navigator.clipboard.writeText(booking.pixCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return {
    mounted,
    booking,
    config,
    copied,
    isPix,
    primaryTraveler,
    onCopyPix: handleCopyPix,
  };
}
