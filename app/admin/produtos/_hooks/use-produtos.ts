"use client";

import { useEffect, useState } from "react";
import { useProductStore } from "@/stores/product-store";

export type ProdutosTab = "hospedagens" | "passagens";

export interface HotelPriceDraft {
  basePrice: number;
  originalPrice?: number;
}

export interface FlightPriceDraft {
  price: number;
  originalPrice?: number;
}

export function useProdutos() {
  const {
    hotels,
    flights,
    fetchCatalog,
    updateHotelPrice,
    updateFlightPrice,
    resetCatalog,
  } = useProductStore();

  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<ProdutosTab>("hospedagens");
  const [savedId, setSavedId] = useState<string | null>(null);

  const [hotelPrices, setHotelPrices] = useState<Record<string, HotelPriceDraft>>(
    {},
  );
  const [flightPrices, setFlightPrices] = useState<
    Record<string, FlightPriceDraft>
  >({});

  useEffect(() => {
    setMounted(true);
    if (hotels.length === 0 || flights.length === 0) {
      fetchCatalog();
    }
  }, [hotels.length, flights.length, fetchCatalog]);

  const handleHotelPriceChange = (hotelId: string, data: HotelPriceDraft) => {
    setHotelPrices((previous) => ({ ...previous, [hotelId]: data }));
  };

  const handleFlightPriceChange = (
    flightId: string,
    data: FlightPriceDraft,
  ) => {
    setFlightPrices((previous) => ({ ...previous, [flightId]: data }));
  };

  const handleSaveHotelPrice = (hotelId: string) => {
    const data = hotelPrices[hotelId];
    if (!data) return;
    updateHotelPrice(hotelId, data.basePrice, data.originalPrice);
    setSavedId(hotelId);
    setTimeout(() => setSavedId(null), 2500);
  };

  const handleSaveFlightPrice = (flightId: string) => {
    const data = flightPrices[flightId];
    if (!data) return;
    updateFlightPrice(flightId, data.price, data.originalPrice);
    setSavedId(flightId);
    setTimeout(() => setSavedId(null), 2500);
  };

  return {
    mounted,
    hotels,
    flights,
    activeTab,
    onTabChange: setActiveTab,
    hotelPrices,
    flightPrices,
    savedId,
    onHotelPriceChange: handleHotelPriceChange,
    onFlightPriceChange: handleFlightPriceChange,
    onSaveHotelPrice: handleSaveHotelPrice,
    onSaveFlightPrice: handleSaveFlightPrice,
    onResetPrices: resetCatalog,
  };
}
