"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useBookingStore } from "@/stores/booking-store";
import { useProductStore } from "@/stores/product-store";
import { Room } from "@/types/product";

export function useHotelDetail(hotelId: string) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { hotels, fetchHotels } = useProductStore();
  const { startHotelBooking, bookings } = useBookingStore();

  useEffect(() => {
    if (hotels.length === 0) {
      fetchHotels();
    }
  }, [hotels.length, fetchHotels]);

  const hotel = useMemo(
    () =>
      hotels.find((h) => h.id === hotelId) ||
      (hotels.length > 0 ? hotels[0] : null),
    [hotels, hotelId],
  );

  const checkIn = searchParams.get("checkIn") || "2026-11-20";
  const checkOut = searchParams.get("checkOut") || "2026-11-23";
  const adults = Number(searchParams.get("adults") || 2);
  const children = Number(searchParams.get("children") || 0);

  const nights = useMemo(() => {
    try {
      const d1 = new Date(checkIn);
      const d2 = new Date(checkOut);
      const diff = Math.ceil(
        Math.abs(d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24),
      );
      return diff > 0 ? diff : 3;
    } catch {
      return 3;
    }
  }, [checkIn, checkOut]);

  const [activePhoto, setActivePhoto] = useState<string>("");

  useEffect(() => {
    if (hotel?.imageUrl) {
      setActivePhoto(hotel.imageUrl);
    }
  }, [hotel?.imageUrl]);

  const handleSelectRoom = (room: Room) => {
    if (!hotel) return;
    startHotelBooking(hotel, room, checkIn, checkOut, adults, children);
    router.push("/checkout");
  };

  const handleShare = () => {
    if (!hotel) return;
    if (navigator.share) {
      navigator.share({
        title: hotel.name,
        text: `Confira ${hotel.name} na Zarpou Viagens!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copiado para a área de transferência!");
    }
  };

  return {
    hotel,
    bookings,
    checkIn,
    checkOut,
    adults,
    children,
    nights,
    activePhoto,
    onSelectPhoto: setActivePhoto,
    onSelectRoom: handleSelectRoom,
    onShare: handleShare,
  };
}
