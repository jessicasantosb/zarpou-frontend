import { Bed, Check, Image as ImageIcon, MapPin } from "lucide-react";

export const COMMON_AMENITIES = [
  "Café da Manhã Incluso",
  "Piscina",
  "Wi-Fi Grátis",
  "Academia",
  "Frente à Praia",
  "Spa",
  "Restaurante",
  "Estacionamento",
  "Pet Friendly",
  "Ar-condicionado",
  "Bar na Piscina",
  "Serviço de Quarto 24h",
];

export const BED_OPTIONS = [
  "1 Cama King Size",
  "1 Cama Queen Size",
  "1 Cama de Casal",
  "2 Camas de Solteiro",
  "1 Cama Queen + 1 Sofá-cama",
  "2 Camas Queen Size",
  "3 Camas de Solteiro",
  "1 Cama King + 1 Cama de Solteiro",
  "1 Cama de Casal + 1 Beliche",
];

export const HOTEL_TABS = [
  { id: "geral", label: "Geral & Localização", icon: MapPin },
  { id: "quartos", label: "Quartos & Tipos de Camas", icon: Bed },
  { id: "fotos", label: "Fotos & Descrição", icon: ImageIcon },
  { id: "comodidades", label: "Comodidades", icon: Check },
] as const;

export type HotelTabId = (typeof HOTEL_TABS)[number]["id"];
