"use client";

import { useEffect, useState } from "react";
import { usePromotionStore } from "@/stores/promotion-store";

export function usePromocoes() {
  const { promotions, fetchPromotions } = usePromotionStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchPromotions();
  }, [fetchPromotions]);

  const activePromos = mounted ? promotions.filter((p) => p.active) : [];

  return { activePromos };
}
