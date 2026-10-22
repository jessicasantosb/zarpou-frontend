"use client";

import { useEffect, useState } from "react";
import { useDestinationStore } from "@/stores/destination-store";

export function useTopDestination() {
  const { destinations, fetchDestinations } = useDestinationStore();
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "national" | "international"
  >("all");

  useEffect(() => {
    setMounted(true);
    if (destinations.length === 0) {
      fetchDestinations();
    }
  }, [destinations.length, fetchDestinations]);

  const safeDestinations = mounted ? destinations : [];

  const filteredDestinations =
    selectedCategory === "all"
      ? safeDestinations
      : safeDestinations.filter((d) => d.category === selectedCategory);

  return {
    destinations: filteredDestinations,
    selectedCategory,
    onCategoryChange: setSelectedCategory,
  };
}
