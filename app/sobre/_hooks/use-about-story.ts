"use client";

import { useEffect, useState } from "react";
import { useConfigStore } from "@/stores/config-store";

export function useAboutStory() {
  const { config } = useConfigStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const address = mounted ? config.address : "Belo Horizonte - MG, Brasil";
  const cadastur = mounted ? config.cadastur : "34.120.948/0001-90";
  const cnpj = mounted ? config.cnpj : "55.849.201/0001-38";

  return { address, cadastur, cnpj };
}
