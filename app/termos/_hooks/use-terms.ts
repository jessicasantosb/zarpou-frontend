"use client";

import { useEffect, useState } from "react";
import { useConfigStore } from "@/stores/config-store";

export function useTerms() {
  const { config } = useConfigStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const companyName = mounted
    ? config.companyName
    : "Zarpou Viagens e Turismo Ltda";
  const cnpj = mounted ? config.cnpj : "55.849.201/0001-38";
  const terms = mounted ? config.termsAndConditions : "";

  return { companyName, cnpj, terms };
}
