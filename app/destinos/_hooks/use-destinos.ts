"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DestinationItem } from "@/types/destination";
import { useBookingStore } from "@/stores/booking-store";
import { useDestinationStore } from "@/stores/destination-store";
import { useProductStore } from "@/stores/product-store";
import { Flight, Hotel } from "@/types/product";

export interface CityPackageItem {
  id: string;
  title: string;
  nights: number;
  hotel?: Hotel;
  flight?: Flight;
  price: number;
  originalPrice: number;
  discountPercent: number;
  installments: number;
  highlights: string[];
}

export function useDestinos() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCityParam = searchParams.get("cidade") || "";

  const { destinations, fetchDestinations } = useDestinationStore();
  const { hotels, flights, fetchCatalog } = useProductStore();
  const { startHotelBooking } = useBookingStore();

  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<
    "all" | "national" | "international"
  >("all");
  const [selectedCityFilter, setSelectedCityFilter] =
    useState<string>(selectedCityParam);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMounted(true);
    fetchDestinations();
    if (hotels.length === 0 || flights.length === 0) {
      fetchCatalog();
    }
  }, [fetchDestinations, hotels.length, flights.length, fetchCatalog]);

  useEffect(() => {
    if (selectedCityParam) {
      setSelectedCityFilter(selectedCityParam);
    }
  }, [selectedCityParam]);

  const getPackagesForDestination = useCallback(
    (dest: DestinationItem): CityPackageItem[] => {
      if (!hotels.length || !flights.length) return [];

      const destName = dest.title.toLowerCase().trim();

      const matchedHotel = hotels.find((hotel) => {
        const city = hotel.city.toLowerCase().trim();
        return (
          city === destName ||
          city.includes(destName) ||
          destName.includes(city)
        );
      });

      const matchedFlight = flights.find((flight) => {
        const destCity =
          flight.outbound?.destinationCity?.toLowerCase().trim() || "";
        return (
          destCity === destName ||
          destCity.includes(destName) ||
          destName.includes(destCity)
        );
      });

      if (!matchedHotel || !matchedFlight) {
        return [];
      }

      const hotelNightPrice = matchedHotel.basePricePerNight || 0;
      const flightPrice = matchedFlight.price || 0;

      const basePkgPrice4Nights = Math.round(
        flightPrice + hotelNightPrice * 4 * 0.85,
      );
      const originalPkgPrice4Nights = Math.round(
        flightPrice + hotelNightPrice * 4,
      );
      const discount4 = Math.round(
        ((originalPkgPrice4Nights - basePkgPrice4Nights) /
          originalPkgPrice4Nights) *
          100,
      );

      const basePkgPrice6Nights = Math.round(
        flightPrice + hotelNightPrice * 6 * 0.8,
      );
      const originalPkgPrice6Nights = Math.round(
        flightPrice + hotelNightPrice * 6,
      );
      const discount6 = Math.round(
        ((originalPkgPrice6Nights - basePkgPrice6Nights) /
          originalPkgPrice6Nights) *
          100,
      );

      return [
        {
          id: `pkg-${dest.id}-standard`,
          title: `Pacote Completo: ${dest.title} Essencial`,
          nights: 4,
          hotel: matchedHotel,
          flight: matchedFlight,
          price: basePkgPrice4Nights,
          originalPrice: originalPkgPrice4Nights,
          discountPercent: discount4 > 0 ? discount4 : 15,
          installments: 12,
          highlights: [
            `Passagem Aérea ${matchedFlight.outbound?.airline || "inclusa"} (Ida e Volta)`,
            `Hospedagem no ${matchedHotel.name} (4 diárias)`,
            "Café da manhã incluso",
            "Assistência Zarpou 24h durante toda a estadia",
          ],
        },
        {
          id: `pkg-${dest.id}-premium`,
          title: `Experiência Premium: ${dest.title} dos Sonhos`,
          nights: 6,
          hotel: matchedHotel,
          flight: matchedFlight,
          price: basePkgPrice6Nights,
          originalPrice: originalPkgPrice6Nights,
          discountPercent: discount6 > 0 ? discount6 : 20,
          installments: 12,
          highlights: [
            `Passagem Aérea ${matchedFlight.outbound?.airline || "inclusa"} com bagagem`,
            `Hospedagem no ${matchedHotel.name} (6 diárias)`,
            "Café da manhã e benefícios exclusivos",
            "Transfer e assistência Zarpou 24h",
          ],
        },
      ];
    },
    [hotels, flights],
  );

  const destinationsWithPackages = useMemo(() => {
    return destinations.filter(
      (dest) => getPackagesForDestination(dest).length > 0,
    );
  }, [destinations, getPackagesForDestination]);

  const filteredDestinations = useMemo(() => {
    return destinationsWithPackages.filter((dest) => {
      const matchesCategory =
        activeCategory === "all" || dest.category === activeCategory;
      const matchesCity =
        !selectedCityFilter ||
        dest.title.toLowerCase().includes(selectedCityFilter.toLowerCase());
      const matchesSearch =
        !searchQuery ||
        dest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesCity && matchesSearch;
    });
  }, [
    destinationsWithPackages,
    activeCategory,
    selectedCityFilter,
    searchQuery,
  ]);

  const handleBookPackage = (pkg: CityPackageItem) => {
    if (pkg.hotel) {
      const room = pkg.hotel.rooms?.[0] || {
        id: `room-${Date.now()}`,
        name: "Apartamento Luxo com Vista",
        description:
          "Acomodação completa com ar condicionado, frigobar e Wi-Fi.",
        maxAdults: 2,
        maxChildren: 1,
        beds: "1 Cama Queen",
        sizeM2: 32,
        pricePerNight: Math.round(pkg.price / pkg.nights),
        originalPricePerNight: Math.round(pkg.originalPrice / pkg.nights),
        freeCancellation: true,
        breakfastIncluded: true,
        availableRooms: 3,
        amenities: ["Café da Manhã Incluso", "Wi-Fi Grátis", "Ar-condicionado"],
      };
      startHotelBooking(pkg.hotel, room, "2026-11-20", "2026-11-24", 2, 0);
      router.push("/checkout");
    } else {
      router.push("/hospedagens");
    }
  };

  const handleResetFilters = () => {
    setActiveCategory("all");
    setSelectedCityFilter("");
    setSearchQuery("");
  };

  return {
    mounted,
    activeCategory,
    onCategoryChange: setActiveCategory,
    selectedCityFilter,
    onCityFilterChange: setSelectedCityFilter,
    searchQuery,
    onSearchChange: setSearchQuery,
    destinationsWithPackages,
    filteredDestinations,
    getPackagesForDestination,
    onBookPackage: handleBookPackage,
    onResetFilters: handleResetFilters,
  };
}
