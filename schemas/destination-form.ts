import { z } from "zod";
import { DestinationItem } from "@/types/destination";

export const DESTINATION_DEFAULT_IMAGE =
  "https://images.pexels.com/photos/12039523/pexels-photo-12039523.jpeg";

export const destinationFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Informe o nome da cidade ou destino turístico."),
  country: z.string().trim().min(1, "Informe o país do destino."),
  state: z.string().trim(),
  flag: z.string(),
  category: z.enum(["national", "international"]),
  tag: z.string().trim().min(1, "Informe a tag principal do card."),
  description: z.string().trim().min(1, "Informe a descrição do destino."),
  bestTimeToVisit: z.string().trim(),
  highlights: z.array(z.string()),
  startingPrice: z.string().min(1, "Informe o preço a partir de."),
  accommodationsCount: z
    .string()
    .min(1, "Informe a quantidade de acomodações."),
  link: z.string().trim().min(1, "Informe o link de redirecionamento."),
  image_url: z.string().min(1, "Informe a imagem principal do destino."),
});

export type DestinationFormValues = z.infer<typeof destinationFormSchema>;

export const buildDestinationFormValues = (
  destination?: DestinationItem,
): DestinationFormValues => {
  if (!destination) {
    return {
      title: "",
      country: "Brasil",
      state: "",
      flag: "🇧🇷",
      category: "national",
      tag: "Praias Paradisíacas",
      description:
        "Descubra paisagens deslumbrantes, gastronomia local autêntica e experiências inesquecíveis para toda a família.",
      bestTimeToVisit: "Ano Todo (Clima Agradável)",
      highlights: ["Praias de Águas Cristalinas", "Passeios de Barco & Escuna"],
      startingPrice: "490",
      accommodationsCount: "50",
      link: "/hospedagens",
      image_url: DESTINATION_DEFAULT_IMAGE,
    };
  }

  return {
    title: destination.title,
    country: destination.country,
    state: destination.state || "",
    flag: destination.flag || "✈️",
    category:
      destination.category === "international" ? "international" : "national",
    tag: destination.tag || "Destaque Zarpou",
    description: destination.description || "",
    bestTimeToVisit:
      destination.bestTimeToVisit || "Ano Todo (Clima Agradável)",
    highlights:
      destination.highlights && destination.highlights.length > 0
        ? destination.highlights
        : ["Roteiro Exclusivo", "Melhor Época para Visitar"],
    startingPrice: String(destination.startingPrice || 490),
    accommodationsCount: String(destination.accommodationsCount || 50),
    link:
      destination.link ||
      `/hospedagens?city=${encodeURIComponent(destination.title)}`,
    image_url: destination.image_url || DESTINATION_DEFAULT_IMAGE,
  };
};
