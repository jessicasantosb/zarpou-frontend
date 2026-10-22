import { Coins, Luggage, Plane, RotateCcw } from "lucide-react";

export const COMMON_FLAGS = [
  { flag: "🇺🇸", country: "Estados Unidos", region: "usa" as const },
  { flag: "🇮🇹", country: "Itália", region: "europe" as const },
  { flag: "🇪🇸", country: "Espanha", region: "europe" as const },
  { flag: "🇵🇹", country: "Portugal", region: "europe" as const },
  { flag: "🇫🇷", country: "França", region: "europe" as const },
  { flag: "🇦🇷", country: "Argentina", region: "south-america" as const },
  { flag: "🇨🇱", country: "Chile", region: "south-america" as const },
  { flag: "🇦🇪", country: "Emirados Árabes", region: "other" as const },
  { flag: "🇬🇧", country: "Reino Unido", region: "europe" as const },
  { flag: "🇯🇵", country: "Japão", region: "other" as const },
];

export const SUGGESTED_HIGHLIGHTS = [
  "Voo Noturno",
  "Voo Direto",
  "Bagagem Despachada",
  "Wi-Fi a Bordo",
  "Refeição Inclusa",
  "Poltrona Conforto",
  "Entretenimento a Bordo",
  "Tomada USB",
  "Tarifa Promocional",
  "Melhor Custo-Benefício",
];

export const POPULAR_AIRLINES = [
  { name: "LATAM Airlines", code: "LA" },
  { name: "Azul Linhas Aéreas", code: "AD" },
  { name: "Gol Linhas Aéreas", code: "G3" },
  { name: "TAP Air Portugal", code: "TP" },
  { name: "American Airlines", code: "AA" },
  { name: "Air France", code: "AF" },
  { name: "United Airlines", code: "UA" },
  { name: "Iberia", code: "IB" },
  { name: "Copa Airlines", code: "CM" },
  { name: "Emirates", code: "EK" },
];

export const PASSAGENS_TABS = [
  { id: "outbound", label: "1. Trecho de Ida (Origem & Destino)", icon: Plane },
  { id: "return", label: "2. Trecho de Volta", icon: RotateCcw },
  { id: "details", label: "3. Cabine, Bagagens & Destino", icon: Luggage },
  { id: "pricing", label: "4. Tarifas & Foto", icon: Coins },
] as const;

export type PassagensTabId = (typeof PASSAGENS_TABS)[number]["id"];

export const PASSAGENS_TAB_ORDER: PassagensTabId[] = [
  "outbound",
  "return",
  "details",
  "pricing",
];
