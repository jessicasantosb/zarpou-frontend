"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { usePromotionStore } from "@/stores/promotion-store";

export function usePromoBannerCarousel() {
  const { promotions, fetchPromotions } = usePromotionStore();
  const [mounted, setMounted] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    setMounted(true);
    if (promotions.length === 0) {
      fetchPromotions();
    }
  }, [promotions.length, fetchPromotions]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const activePromos = mounted ? promotions.filter((p) => p.active) : [];

  return {
    mounted,
    emblaRef,
    emblaApi,
    canScrollPrev,
    canScrollNext,
    activePromos,
  };
}
