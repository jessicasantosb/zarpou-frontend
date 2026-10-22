import { z } from "zod";
import { Flight } from "@/types/product";

export const FLIGHT_DEFAULT_IMAGE =
  "https://images.pexels.com/photos/3834331/pexels-photo-3834331.jpeg";

export const flightFormSchema = z
  .object({
    outbound: z.object({
      originCity: z
        .string()
        .trim()
        .min(1, "Informe a cidade de origem e a cidade de destino."),
      originIata: z.string().trim().min(1, "Informe o código IATA."),
      originAirport: z.string(),
      destinationCity: z
        .string()
        .trim()
        .min(1, "Informe a cidade de origem e a cidade de destino."),
      destinationIata: z.string().trim().min(1, "Informe o código IATA."),
      destinationAirport: z.string(),
      airline: z.string().trim().min(1, "Informe a companhia aérea."),
      airlineCode: z.string(),
      flightNumber: z.string().trim().min(1, "Informe o número do voo."),
      departureDate: z.string(),
      departureTime: z.string(),
      arrivalDate: z.string(),
      arrivalTime: z.string(),
      duration: z.string(),
      stops: z.number(),
      stopCity: z.string(),
    }),
    isRoundTrip: z.boolean(),
    returnFlight: z.object({
      originCity: z.string(),
      originIata: z.string(),
      originAirport: z.string(),
      destinationCity: z.string(),
      destinationIata: z.string(),
      destinationAirport: z.string(),
      airline: z.string(),
      airlineCode: z.string(),
      flightNumber: z.string(),
      departureDate: z.string(),
      departureTime: z.string(),
      arrivalDate: z.string(),
      arrivalTime: z.string(),
      duration: z.string(),
      stops: z.number(),
      stopCity: z.string(),
    }),
    cabinClass: z.enum(["Econômica", "Premium Economy", "Executiva"]),
    baggageIncluded: z.boolean(),
    handBaggageIncluded: z.boolean(),
    country: z.string(),
    flag: z.string(),
    region: z.enum(["all", "usa", "europe", "south-america", "other"]),
    highlights: z.array(z.string()),
    price: z.string().trim().min(1, "Informe o preço promocional."),
    originalPrice: z.string(),
    maxInstallments: z.string(),
    featured: z.boolean(),
    imageUrl: z.string(),
  })
  .superRefine((values, ctx) => {
    if (!values.isRoundTrip) {
      return;
    }
    if (
      !values.returnFlight.originCity.trim() ||
      !values.returnFlight.destinationCity.trim()
    ) {
      ctx.addIssue({
        code: "custom",
        path: [
          "returnFlight",
          values.returnFlight.originCity.trim()
            ? "destinationCity"
            : "originCity",
        ],
        message: "Informe as cidades do trecho de volta.",
      });
    }
  });

export type FlightFormValues = z.infer<typeof flightFormSchema>;

export const buildFlightFormValues = (flight?: Flight): FlightFormValues => {
  if (!flight) {
    return {
      outbound: {
        originCity: "São Paulo",
        originIata: "GRU",
        originAirport: "Aeroporto Internacional de Guarulhos",
        destinationCity: "Miami",
        destinationIata: "MIA",
        destinationAirport: "Miami International Airport",
        airline: "LATAM Airlines",
        airlineCode: "LA",
        flightNumber: "LA-8012",
        departureDate: "2026-11-20",
        departureTime: "08:30",
        arrivalDate: "2026-11-20",
        arrivalTime: "16:45",
        duration: "8h 15m",
        stops: 0,
        stopCity: "",
      },
      isRoundTrip: true,
      returnFlight: {
        originCity: "Miami",
        originIata: "MIA",
        originAirport: "Miami International Airport",
        destinationCity: "São Paulo",
        destinationIata: "GRU",
        destinationAirport: "Aeroporto Internacional de Guarulhos",
        airline: "LATAM Airlines",
        airlineCode: "LA",
        flightNumber: "LA-8013",
        departureDate: "2026-11-27",
        departureTime: "20:15",
        arrivalDate: "2026-11-28",
        arrivalTime: "06:30",
        duration: "8h 15m",
        stops: 0,
        stopCity: "",
      },
      cabinClass: "Econômica",
      baggageIncluded: true,
      handBaggageIncluded: true,
      country: "Estados Unidos",
      flag: "🇺🇸",
      region: "usa",
      highlights: ["Voo Direto", "Bagagem Despachada"],
      price: "3290",
      originalPrice: "3990",
      maxInstallments: "12",
      featured: true,
      imageUrl: FLIGHT_DEFAULT_IMAGE,
    };
  }

  const outbound = flight.outbound;
  const returnFlight = flight.returnFlight;

  return {
    outbound: {
      originCity: outbound.originCity,
      originIata: outbound.originIata,
      originAirport:
        outbound.originAirport || `Aeroporto de ${outbound.originCity}`,
      destinationCity: outbound.destinationCity,
      destinationIata: outbound.destinationIata,
      destinationAirport:
        outbound.destinationAirport ||
        `Aeroporto de ${outbound.destinationCity}`,
      airline: outbound.airline,
      airlineCode: outbound.airlineCode || "ZP",
      flightNumber: outbound.flightNumber,
      departureDate: outbound.departureDate || "2026-11-20",
      departureTime: outbound.departureTime || "10:00",
      arrivalDate: outbound.arrivalDate || "2026-11-20",
      arrivalTime: outbound.arrivalTime || "18:00",
      duration: outbound.duration || "8h 00m",
      stops: outbound.stops || 0,
      stopCity: outbound.stopCity || "",
    },
    isRoundTrip: Boolean(returnFlight),
    returnFlight: returnFlight
      ? {
          originCity: returnFlight.originCity,
          originIata: returnFlight.originIata,
          originAirport:
            returnFlight.originAirport ||
            `Aeroporto de ${returnFlight.originCity}`,
          destinationCity: returnFlight.destinationCity,
          destinationIata: returnFlight.destinationIata,
          destinationAirport:
            returnFlight.destinationAirport ||
            `Aeroporto de ${returnFlight.destinationCity}`,
          airline: returnFlight.airline,
          airlineCode: returnFlight.airlineCode || "ZP",
          flightNumber: returnFlight.flightNumber,
          departureDate: returnFlight.departureDate || "2026-11-27",
          departureTime: returnFlight.departureTime || "20:00",
          arrivalDate: returnFlight.arrivalDate || "2026-11-28",
          arrivalTime: returnFlight.arrivalTime || "06:00",
          duration: returnFlight.duration || "8h 00m",
          stops: returnFlight.stops || 0,
          stopCity: returnFlight.stopCity || "",
        }
      : {
          originCity: outbound.destinationCity,
          originIata: outbound.destinationIata,
          originAirport: `Aeroporto de ${outbound.destinationCity}`,
          destinationCity: outbound.originCity,
          destinationIata: outbound.originIata,
          destinationAirport: `Aeroporto de ${outbound.originCity}`,
          airline: outbound.airline,
          airlineCode: outbound.airlineCode || "ZP",
          flightNumber: "ZP-102",
          departureDate: "2026-11-27",
          departureTime: "20:00",
          arrivalDate: "2026-11-28",
          arrivalTime: "06:00",
          duration: outbound.duration || "8h 00m",
          stops: 0,
          stopCity: "",
        },
    cabinClass: outbound.cabinClass || "Econômica",
    baggageIncluded: outbound.baggageIncluded ?? true,
    handBaggageIncluded: outbound.handBaggageIncluded ?? true,
    country: flight.country || "Internacional",
    flag: flight.flag || "✈️",
    region: flight.region || "all",
    highlights: flight.highlights || ["Voo Direto", "Bagagem Despachada"],
    price: String(flight.price ?? ""),
    originalPrice: String(flight.originalPrice || 0),
    maxInstallments: String(flight.maxInstallments || 12),
    featured: flight.featured ?? true,
    imageUrl: flight.imageUrl || FLIGHT_DEFAULT_IMAGE,
  };
};
