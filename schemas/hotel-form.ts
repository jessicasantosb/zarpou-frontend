import { z } from "zod";
import { Hotel } from "@/types/product";

export const HOTEL_DEFAULT_IMAGE =
  "https://images.pexels.com/photos/720300/pexels-photo-720300.jpeg";

const DEFAULT_GALLERY = [
  "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg",
  "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
  "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
];

export const roomFormSchema = z.object({
  id: z.string(),
  name: z.string().trim().min(1, "Informe o nome do quarto."),
  description: z.string(),
  maxAdults: z
    .number("Informe o máximo de adultos.")
    .min(1, "Informe pelo menos 1 adulto.")
    .max(8, "Máximo de 8 adultos."),
  maxChildren: z
    .number("Informe o máximo de crianças.")
    .min(0, "Mínimo de 0 crianças.")
    .max(6, "Máximo de 6 crianças."),
  beds: z.string(),
  sizeM2: z.number("Informe o tamanho do quarto.").min(10, "Mínimo de 10 m²."),
  pricePerNight: z
    .number("Informe a diária do quarto.")
    .min(50, "A diária mínima é R$ 50."),
  originalPricePerNight: z.number().optional(),
  freeCancellation: z.boolean(),
  breakfastIncluded: z.boolean(),
  availableRooms: z
    .number("Informe a disponibilidade do quarto.")
    .min(1, "Informe ao menos 1 quarto disponível.")
    .max(50, "Máximo de 50 quartos."),
  amenities: z.array(z.string()),
});

export type RoomFormValues = z.infer<typeof roomFormSchema>;

export const hotelFormSchema = z.object({
  name: z.string().trim().min(1, "Informe o nome do hotel."),
  city: z.string().trim().min(1, "Informe a cidade."),
  state: z.string().trim().min(1, "Informe o estado (UF)."),
  neighborhood: z.string().trim().min(1, "Informe o bairro / praia."),
  address: z.string(),
  stars: z.number(),
  badge: z.string(),
  maxInstallments: z.number(),
  description: z.string(),
  imageUrl: z.string(),
  gallery: z.array(z.string()),
  amenities: z.array(z.string()),
  rooms: z
    .array(roomFormSchema)
    .min(1, "Adicione pelo menos um quarto à hospedagem."),
});

export type HotelFormValues = z.infer<typeof hotelFormSchema>;

export const buildHotelFormValues = (hotel?: Hotel): HotelFormValues => {
  if (!hotel) {
    return {
      name: "",
      city: "Rio de Janeiro",
      state: "RJ",
      neighborhood: "Copacabana",
      address: "Av. Atlântica, 1702",
      stars: 5,
      badge: "Oferta Zarpou",
      maxInstallments: 12,
      description:
        "Experiência única de hospedagem com vista privilegiada, gastronomia impecável e atendimento de excelência para sua família.",
      imageUrl: HOTEL_DEFAULT_IMAGE,
      gallery: [...DEFAULT_GALLERY],
      amenities: [
        "Café da Manhã Incluso",
        "Piscina",
        "Wi-Fi Grátis",
        "Ar-condicionado",
      ],
      rooms: [
        {
          id: `room-${Date.now()}-1`,
          name: "Apartamento Standard",
          description:
            "Acomodação confortável com ar-condicionado, Wi-Fi e varanda.",
          maxAdults: 2,
          maxChildren: 1,
          beds: "1 Cama Queen Size",
          sizeM2: 28,
          pricePerNight: 650,
          originalPricePerNight: 820,
          freeCancellation: true,
          breakfastIncluded: true,
          availableRooms: 5,
          amenities: ["Wi-Fi", "Ar-condicionado"],
        },
        {
          id: `room-${Date.now()}-2`,
          name: "Suíte Luxo com Vista para o Mar",
          description:
            "Ampla suíte com banheira de hidromassagem, cama king size e vista panorâmica.",
          maxAdults: 2,
          maxChildren: 2,
          beds: "1 Cama King Size",
          sizeM2: 45,
          pricePerNight: 980,
          originalPricePerNight: 1250,
          freeCancellation: true,
          breakfastIncluded: true,
          availableRooms: 3,
          amenities: ["Wi-Fi", "Ar-condicionado", "Hidromassagem", "Vista Mar"],
        },
      ],
    };
  }

  return {
    name: hotel.name || "",
    city: hotel.city || "",
    state: hotel.state || "",
    neighborhood: hotel.neighborhood || "",
    address: hotel.address || `${hotel.neighborhood}, ${hotel.city}`,
    stars: hotel.stars || 4,
    badge: hotel.badges?.[0] || "",
    maxInstallments: hotel.maxInstallments || 12,
    description: hotel.description || "",
    imageUrl: hotel.imageUrl || HOTEL_DEFAULT_IMAGE,
    gallery:
      hotel.gallery && hotel.gallery.length > 0
        ? hotel.gallery.filter((photo) => photo !== hotel.imageUrl)
        : [],
    amenities: hotel.amenities || ["Piscina", "Wi-Fi Grátis"],
    rooms:
      hotel.rooms && hotel.rooms.length > 0
        ? hotel.rooms
        : [
            {
              id: `room-${Date.now()}-1`,
              name: "Apartamento Standard",
              description: "Acomodação confortável com ar-condicionado e Wi-Fi.",
              maxAdults: 2,
              maxChildren: 1,
              beds: "1 Cama Queen Size",
              sizeM2: 28,
              pricePerNight: hotel.basePricePerNight || 600,
              originalPricePerNight: hotel.originalPricePerNight || 750,
              freeCancellation: true,
              breakfastIncluded: true,
              availableRooms: 5,
              amenities: hotel.amenities || [],
            },
          ],
  };
};
