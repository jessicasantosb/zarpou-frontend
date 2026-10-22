"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useBookingStore } from "@/stores/booking-store";
import { useProductStore } from "@/stores/product-store";
import { calculateHotelRating } from "@/lib/rating-utils";

export type SortOption =
  | "recommended"
  | "price_asc"
  | "price_desc"
  | "rating_desc";

export function useHospedagens() {
  const searchParams = useSearchParams();
  const { hotels, fetchHotels } = useProductStore();
  const { bookings } = useBookingStore();

  useEffect(() => {
    if (hotels.length === 0) {
      fetchHotels();
    }
  }, [hotels.length, fetchHotels]);

  const initialCity = searchParams.get("city") || "";
  const initialCheckIn = searchParams.get("checkIn") || "2026-11-20";
  const initialCheckOut = searchParams.get("checkOut") || "2026-11-23";
  const initialAdults = Math.max(1, Number(searchParams.get("adults") || 2));
  const initialRooms = Math.min(
    initialAdults,
    Math.max(1, Number(searchParams.get("rooms") || 1)),
  );

  const [searchTerm, setSearchTerm] = useState(initialCity);
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [adults, setAdults] = useState(initialAdults);
  const [rooms, setRooms] = useState(initialRooms);

  useEffect(() => {
    if (rooms > adults) {
      setRooms(adults);
    }
  }, [adults, rooms]);

  const todayStr = useMemo(() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  const nights = useMemo(() => {
    try {
      const d1 = new Date(checkIn);
      const d2 = new Date(checkOut);
      const diff = Math.ceil(
        Math.abs(d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24),
      );
      return diff > 0 ? diff : 1;
    } catch {
      return 1;
    }
  }, [checkIn, checkOut]);

  const [priceMax, setPriceMax] = useState<number>(5000);
  const [freeCancellation, setFreeCancellation] = useState<boolean>(false);
  const [breakfastOnly, setBreakfastOnly] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("recommended");

  const toggleStar = (star: number) => {
    setSelectedStars((prev) =>
      prev.includes(star) ? prev.filter((s) => s !== star) : [...prev, star],
    );
  };

  const handleCheckInChange = (value: string) => {
    setCheckIn(value);
    if (value && checkOut && value > checkOut) {
      setCheckOut(value);
    }
  };

  const handleCheckOutChange = (value: string) => {
    if (checkIn && value < checkIn) {
      setCheckOut(checkIn);
    } else {
      setCheckOut(value);
    }
  };

  const handleAdultsDecrease = () => {
    setAdults((prev) => {
      const next = Math.max(1, prev - 1);
      if (rooms > next) {
        setRooms(next);
      }
      return next;
    });
  };

  const handleAdultsIncrease = () => {
    setAdults((prev) => Math.min(10, prev + 1));
  };

  const handleRoomsDecrease = () => {
    setRooms((prev) => Math.max(1, prev - 1));
  };

  const handleRoomsIncrease = () => {
    setRooms((prev) => Math.min(adults, prev + 1));
  };

  const filteredHotels = useMemo(() => {
    return hotels
      .filter((h) => {
        if (
          searchTerm &&
          !h.city.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !h.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return false;
        }

        if (h.basePricePerNight > priceMax) return false;

        if (minRating > 0) {
          const ratingInfo = calculateHotelRating(h, bookings);
          if (!ratingInfo.shouldShow || (ratingInfo.rating ?? 0) < minRating)
            return false;
        }

        if (selectedStars.length > 0 && !selectedStars.includes(h.stars)) {
          return false;
        }

        if (
          breakfastOnly &&
          !h.amenities.some((a) => a.toLowerCase().includes("café"))
        ) {
          return false;
        }

        if (freeCancellation && !h.rooms.some((r) => r.freeCancellation)) {
          return false;
        }

        if (adults > 0 && h.rooms && h.rooms.length > 0) {
          const requiredCapacityPerRoom = Math.ceil(adults / rooms);
          const hasCapacity = h.rooms.some(
            (r) => (r.maxAdults || 2) >= requiredCapacityPerRoom,
          );
          if (!hasCapacity) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price_asc")
          return a.basePricePerNight - b.basePricePerNight;
        if (sortBy === "price_desc")
          return b.basePricePerNight - a.basePricePerNight;
        if (sortBy === "rating_desc") {
          const rA = calculateHotelRating(a, bookings).rating ?? 0;
          const rB = calculateHotelRating(b, bookings).rating ?? 0;
          return rB - rA;
        }
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [
    hotels,
    bookings,
    searchTerm,
    priceMax,
    minRating,
    selectedStars,
    breakfastOnly,
    freeCancellation,
    adults,
    rooms,
    sortBy,
  ]);

  const resetFilterValues = () => {
    setPriceMax(5000);
    setFreeCancellation(false);
    setBreakfastOnly(false);
    setMinRating(0);
    setSelectedStars([]);
    setCheckIn(initialCheckIn);
    setCheckOut(initialCheckOut);
    setAdults(initialAdults);
    setRooms(initialRooms);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    resetFilterValues();
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", "/hospedagens");
    }
  };

  const handleClearFilters = () => {
    resetFilterValues();
  };

  const handleResetResults = () => {
    setSearchTerm("");
    setPriceMax(5000);
    setFreeCancellation(false);
    setBreakfastOnly(false);
    setMinRating(0);
    setSelectedStars([]);
  };

  return {
    searchTerm,
    onSearchTermChange: setSearchTerm,
    checkIn,
    onCheckInChange: handleCheckInChange,
    checkOut,
    onCheckOutChange: handleCheckOutChange,
    adults,
    onAdultsDecrease: handleAdultsDecrease,
    onAdultsIncrease: handleAdultsIncrease,
    rooms,
    onRoomsDecrease: handleRoomsDecrease,
    onRoomsIncrease: handleRoomsIncrease,
    todayStr,
    nights,
    priceMax,
    onPriceMaxChange: setPriceMax,
    freeCancellation,
    onFreeCancellationChange: setFreeCancellation,
    breakfastOnly,
    onBreakfastOnlyChange: setBreakfastOnly,
    minRating,
    onMinRatingChange: setMinRating,
    selectedStars,
    onToggleStar: toggleStar,
    sortBy,
    onSortChange: setSortBy,
    bookings,
    filteredHotels,
    onClearSearch: handleClearSearch,
    onClearFilters: handleClearFilters,
    onResetResults: handleResetResults,
  };
}
