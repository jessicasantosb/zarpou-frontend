"use client";

import { useEffect, useState } from "react";
import { useProductStore } from "@/stores/product-store";

const destinationsMeta: Record<
  string,
  {
    id: string;
    country: string;
    flag: string;
    region: "all" | "usa" | "europe";
    imageUrl: string;
    highlights: string[];
  }
> = {
  "flight-bh-miami": {
    id: "flight-bh-miami",
    country: "Estados Unidos",
    flag: "🇺🇸",
    region: "usa",
    imageUrl:
      "https://images.pexels.com/photos/3834331/pexels-photo-3834331.jpeg",
    highlights: ["Praias de South Beach", "Compras & Gastronomia"],
  },
  "flight-sp-roma": {
    id: "flight-sp-roma",
    country: "Itália",
    flag: "🇮🇹",
    region: "europe",
    imageUrl:
      "https://images.pexels.com/photos/6318793/pexels-photo-6318793.jpeg",
    highlights: ["Coliseu & Vaticano", "Voo Noturno Direto"],
  },
  "flight-bh-madri": {
    id: "flight-bh-madri",
    country: "Espanha",
    flag: "🇪🇸",
    region: "europe",
    imageUrl:
      "https://images.pexels.com/photos/32903558/pexels-photo-32903558.jpeg",
    highlights: ["Museu do Prado & Gran Vía", "Melhor Tarifa Ibérica"],
  },
  "flight-cwb-nyc": {
    id: "flight-cwb-nyc",
    country: "Estados Unidos",
    flag: "🇺🇸",
    region: "usa",
    imageUrl:
      "https://images.pexels.com/photos/2408219/pexels-photo-2408219.jpeg",
    highlights: ["Times Square & Broadway", "Bagagem Despachada"],
  },
};

export function useTopAirTicket() {
  const { flights, fetchFlights } = useProductStore();
  const [mounted, setMounted] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<
    "all" | "usa" | "europe"
  >("all");

  useEffect(() => {
    setMounted(true);
    if (flights.length === 0) {
      fetchFlights();
    }
  }, [flights.length, fetchFlights]);

  const safeFlights = mounted ? flights : [];

  const displayedFlights = safeFlights
    .filter((flight) => {
      const region =
        flight.region || destinationsMeta[flight.id]?.region || "all";
      return selectedRegion === "all" || region === selectedRegion;
    })
    .map((flight) => {
      const fallbackMeta = destinationsMeta[flight.id] || {
        id: flight.id,
        country: flight.country || "Internacional",
        flag: flight.flag || "✈️",
        region: (flight.region as "all" | "usa" | "europe") || "all",
        imageUrl:
          flight.imageUrl ||
          "https://images.pexels.com/photos/3834331/pexels-photo-3834331.jpeg",
        highlights: flight.highlights || [
          "Tarifa Promocional",
          "Bagagem Inclusa",
        ],
      };

      const effectiveImageUrl = flight.imageUrl || fallbackMeta.imageUrl;
      const effectiveCountry = flight.country || fallbackMeta.country;
      const effectiveFlag = flight.flag || fallbackMeta.flag;

      return {
        meta: {
          ...fallbackMeta,
          imageUrl: effectiveImageUrl,
          country: effectiveCountry,
          flag: effectiveFlag,
        },
        flight,
      };
    });

  return {
    selectedRegion,
    onRegionChange: setSelectedRegion,
    displayedFlights,
  };
}
