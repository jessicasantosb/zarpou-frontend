"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useBookingStore } from "@/stores/booking-store";
import { useProductStore } from "@/stores/product-store";
import { Flight } from "@/types/product";

export type FlightSort = "recommended" | "price_asc" | "price_desc";

export function usePassagens() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { flights, fetchFlights } = useProductStore();
  const { startFlightBooking } = useBookingStore();

  useEffect(() => {
    if (flights.length === 0) {
      fetchFlights();
    }
  }, [flights.length, fetchFlights]);

  const initialDepartureDate =
    searchParams.get("departureDate") || "2026-11-20";
  const initialReturnDate = searchParams.get("returnDate") || "2026-11-27";
  const initialAdults = Number(searchParams.get("adults") || 2);
  const initialChildren = Number(searchParams.get("children") || 0);

  const [departureDate, setDepartureDate] = useState(initialDepartureDate);
  const [returnDate, setReturnDate] = useState(initialReturnDate);
  const [adults, setAdults] = useState(initialAdults);
  const [children, setChildren] = useState(initialChildren);
  const totalTravelers = adults + children;

  const todayStr = useMemo(() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  const [directOnly, setDirectOnly] = useState(false);
  const [baggageOnly, setBaggageOnly] = useState(false);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState<number>(15000);
  const [sortBy, setSortBy] = useState<FlightSort>("recommended");

  const availableAirlines = useMemo(() => {
    const set = new Set<string>();
    flights.forEach((f) => set.add(f.outbound.airline));
    return Array.from(set);
  }, [flights]);

  const toggleAirline = (airline: string) => {
    setSelectedAirlines((prev) =>
      prev.includes(airline)
        ? prev.filter((a) => a !== airline)
        : [...prev, airline],
    );
  };

  const filteredFlights = useMemo(() => {
    return flights
      .filter((f) => {
        if (f.price > priceMax) return false;
        if (directOnly && f.outbound.stops > 0) return false;
        if (baggageOnly && !f.outbound.baggageIncluded) return false;
        if (
          selectedAirlines.length > 0 &&
          !selectedAirlines.includes(f.outbound.airline)
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price_asc") return a.price - b.price;
        if (sortBy === "price_desc") return b.price - a.price;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [flights, priceMax, directOnly, baggageOnly, selectedAirlines, sortBy]);

  const handleClearFilters = () => {
    setPriceMax(15000);
    setDirectOnly(false);
    setBaggageOnly(false);
    setSelectedAirlines([]);
    setDepartureDate(initialDepartureDate);
    setReturnDate(initialReturnDate);
    setAdults(initialAdults);
    setChildren(initialChildren);
  };

  const handleSelectFlight = (flight: Flight) => {
    startFlightBooking(flight, departureDate, returnDate, adults, children);
    router.push("/checkout");
  };

  return {
    departureDate,
    onDepartureDateChange: setDepartureDate,
    returnDate,
    onReturnDateChange: setReturnDate,
    adults,
    onAdultsChange: setAdults,
    children,
    onChildrenChange: setChildren,
    totalTravelers,
    todayStr,
    directOnly,
    onDirectOnlyChange: setDirectOnly,
    baggageOnly,
    onBaggageOnlyChange: setBaggageOnly,
    selectedAirlines,
    onToggleAirline: toggleAirline,
    priceMax,
    onPriceMaxChange: setPriceMax,
    sortBy,
    onSortByChange: setSortBy,
    availableAirlines,
    onClearFilters: handleClearFilters,
    filteredFlights,
    onSelectFlight: handleSelectFlight,
  };
}
