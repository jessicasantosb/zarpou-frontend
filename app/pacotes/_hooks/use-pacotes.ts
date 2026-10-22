"use client";

import { useEffect } from "react";
import { useProductStore } from "@/stores/product-store";
import { Flight, Hotel } from "@/types/product";

export interface PackageItem {
  id: string;
  title: string;
  destination: string;
  hotel?: Hotel;
  flight?: Flight;
  nights: number;
  originalPrice: number;
  price: number;
  discountPercent: number;
  installments: number;
  imageUrl: string;
  highlights: string[];
}

export function usePacotes() {
  const { hotels, flights, fetchCatalog } = useProductStore();

  useEffect(() => {
    if (hotels.length === 0 || flights.length === 0) {
      fetchCatalog();
    }
  }, [hotels.length, flights.length, fetchCatalog]);

  const packages: PackageItem[] = [
    {
      id: "pkg-rio",
      title: "Pacote Rio de Janeiro Inesquecível",
      destination: "Rio de Janeiro, RJ",
      hotel: hotels[0],
      flight: flights[0],
      nights: 4,
      originalPrice: 4800,
      price: 3690,
      discountPercent: 23,
      installments: 12,
      imageUrl: "https://images.pexels.com/photos/720300/pexels-photo-720300.jpeg",
      highlights: [
        "Voo Ida e Volta incluso",
        "Hotel 5 estrelas em Copacabana",
        "Café da manhã buffet",
      ],
    },
    {
      id: "pkg-buzios",
      title: "Pacote Búzios Relax & Praias",
      destination: "Armação dos Búzios, RJ",
      hotel: hotels[1],
      flight: flights[0],
      nights: 5,
      originalPrice: 3500,
      price: 2790,
      discountPercent: 20,
      installments: 12,
      imageUrl: "https://images.pexels.com/photos/12039523/pexels-photo-12039523.jpeg",
      highlights: [
        "Voo Ida e Volta incluso",
        "Resort com Spa e piscina",
        "Café da manhã",
      ],
    },
    {
      id: "pkg-santiago",
      title: "Pacote Santiago dos Andes & Vinhedos",
      destination: "Santiago, Chile",
      hotel: hotels[5] || hotels[0],
      flight: flights[1],
      nights: 6,
      originalPrice: 5900,
      price: 4590,
      discountPercent: 22,
      installments: 12,
      imageUrl: "https://images.pexels.com/photos/2017747/pexels-photo-2017747.jpeg",
      highlights: [
        "Voo Internacional incluso",
        "Hotel com vista para os Andes",
        "Wine Tour",
      ],
    },
  ];

  return { packages };
}
