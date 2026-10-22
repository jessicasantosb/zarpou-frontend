import { Globe, MapPin, Sparkles, Tag } from "lucide-react";

export const COMMON_FLAGS = [
  { flag: "🇧🇷", country: "Brasil", category: "national" as const },
  { flag: "🇦🇪", country: "Emirados Árabes", category: "international" as const },
  { flag: "🇺🇸", country: "Estados Unidos", category: "international" as const },
  { flag: "🇨🇱", country: "Chile", category: "international" as const },
  { flag: "🇮🇹", country: "Itália", category: "international" as const },
  { flag: "🇫🇷", country: "França", category: "international" as const },
  { flag: "🇯🇵", country: "Japão", category: "international" as const },
  { flag: "🇬🇧", country: "Reino Unido", category: "international" as const },
  { flag: "🇪🇸", country: "Espanha", category: "international" as const },
  { flag: "🇬🇷", country: "Grécia", category: "international" as const },
];

export const SUGGESTED_TAGS = [
  "Praias Paradisíacas",
  "Ecoturismo & Natureza",
  "Luxo & Sofisticação",
  "História & Cultura",
  "Montanhas & Vinhedos",
  "Diversão em Família",
  "Romântico a Dois",
  "Aventura & Trilhas",
  "Gastronomia Exclusiva",
  "Compras & Noite",
];

export const SUGGESTED_HIGHLIGHTS = [
  "Praias de Águas Cristalinas",
  "Passeios de Barco & Escuna",
  "Centro Histórico Preservado",
  "Trilhas & Mirantes Panorâmicos",
  "Mergulho com Vida Marinha",
  "Gastronomia Premiada",
  "Pôr do Sol Famoso",
  "Vida Noturna Agitada",
  "Vinícolas Renomadas",
  "Parques & Natureza Intocada",
];

export const SUGGESTED_SEASONS = [
  "Ano Todo (Clima Agradável)",
  "Verão (Dez a Mar - Alta Temporada)",
  "Outono / Primavera (Clima Suave)",
  "Inverno (Para Neve, Vinhos e Fondue)",
  "Maio a Outubro (Período Seco)",
];

export const DESTINATION_TABS = [
  { id: "location", label: "1. Localização & Identificação", icon: MapPin },
  { id: "details", label: "2. Roteiro, Descrição & Atrativos", icon: Sparkles },
  { id: "pricing", label: "3. Tarifas, Hospedagens & Link", icon: Tag },
  { id: "media", label: "4. Imagem & Prévia ao Vivo", icon: Globe },
] as const;

export type DestinationTabId = (typeof DESTINATION_TABS)[number]["id"];
