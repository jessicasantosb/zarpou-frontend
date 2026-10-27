import { useState, type ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitErrorHandler } from "react-hook-form";
import { Check, Loader2, Plane, X } from "lucide-react";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import {
  buildFlightFormValues,
  flightFormSchema,
  type FlightFormValues,
} from "@/schemas/flight-form";
import { Flight } from "@/types/product";
import { useProductStore } from "@/stores/product-store";
import { PASSAGENS_TAB_ORDER, type PassagensTabId } from "../_constants";
import { FlightDetailsTab } from "./flight-details-tab";
import { FlightFormTabs } from "./flight-form-tabs";
import { FlightOutboundTab } from "./flight-outbound-tab";
import { FlightPricingTab } from "./flight-pricing-tab";
import { FlightReturnTab } from "./flight-return-tab";

interface FlightFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  flight: Flight | null;
}

export function FlightFormDialog({
  open,
  onOpenChange,
  flight,
}: FlightFormDialogProps) {
  const { addFlight, updateFlight } = useProductStore();

  const [activeTab, setActiveTab] = useState<PassagensTabId>("outbound");
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<FlightFormValues>({
    resolver: zodResolver(flightFormSchema),
    defaultValues: buildFlightFormValues(flight ?? undefined),
  });

  const isRoundTrip = form.watch("isRoundTrip");

  const activeTabIndex = PASSAGENS_TAB_ORDER.indexOf(activeTab);

  const handlePrevTab = () => {
    const previous = PASSAGENS_TAB_ORDER[activeTabIndex - 1];
    if (previous) {
      setActiveTab(previous);
    }
  };

  const handleNextTab = () => {
    const next = PASSAGENS_TAB_ORDER[activeTabIndex + 1];
    if (next) {
      setActiveTab(next);
    }
  };

  const handleError: SubmitErrorHandler<FlightFormValues> = (errors) => {
    const key = Object.keys(errors)[0];

    if (key === "outbound") {
      setActiveTab("outbound");
      const outboundKeys = Object.keys(errors.outbound ?? {});
      if (
        outboundKeys.includes("originCity") ||
        outboundKeys.includes("destinationCity")
      ) {
        toast.warning("Informe a cidade de origem e a cidade de destino.");
      }
    } else if (key === "returnFlight") {
      setActiveTab("return");
      toast.warning("Informe as cidades do trecho de volta.");
    } else if (key === "price") {
      setActiveTab("pricing");
    }
  };

  const onSubmit = async (values: FlightFormValues) => {
    const priceValue = Number(values.price);
    const originalPriceValue = Number(values.originalPrice);
    const discount =
      originalPriceValue > priceValue && originalPriceValue > 0
        ? Math.round(
            ((originalPriceValue - priceValue) / originalPriceValue) * 100,
          )
        : 0;

    const returnValues = values.returnFlight;

    const flightData: Flight = {
      id: flight?.id ?? `flight-${Date.now()}`,
      price: priceValue,
      originalPrice: originalPriceValue || undefined,
      discountPercent: discount,
      maxInstallments: Number(values.maxInstallments) || 12,
      isRoundTrip: values.isRoundTrip,
      featured: values.featured,
      country: values.country,
      flag: values.flag,
      region: values.region,
      imageUrl: values.imageUrl,
      highlights: values.highlights.filter(Boolean),
      outbound: {
        flightNumber: values.outbound.flightNumber,
        airline: values.outbound.airline,
        airlineCode: values.outbound.airlineCode,
        originIata: values.outbound.originIata.toUpperCase(),
        originCity: values.outbound.originCity,
        originAirport:
          values.outbound.originAirport ||
          `Aeroporto de ${values.outbound.originCity}`,
        destinationIata: values.outbound.destinationIata.toUpperCase(),
        destinationCity: values.outbound.destinationCity,
        destinationAirport:
          values.outbound.destinationAirport ||
          `Aeroporto de ${values.outbound.destinationCity}`,
        departureDate: values.outbound.departureDate,
        departureTime: values.outbound.departureTime,
        arrivalDate: values.outbound.arrivalDate,
        arrivalTime: values.outbound.arrivalTime,
        duration: values.outbound.duration,
        stops: Number(values.outbound.stops),
        stopCity:
          Number(values.outbound.stops) > 0
            ? values.outbound.stopCity
            : undefined,
        cabinClass: values.cabinClass,
        baggageIncluded: values.baggageIncluded,
        handBaggageIncluded: values.handBaggageIncluded,
      },
      returnFlight: values.isRoundTrip
        ? {
            flightNumber:
              returnValues.flightNumber || `${returnValues.airlineCode}-102`,
            airline: returnValues.airline || values.outbound.airline,
            airlineCode: returnValues.airlineCode || values.outbound.airlineCode,
            originIata: (
              returnValues.originIata || values.outbound.destinationIata
            ).toUpperCase(),
            originCity:
              returnValues.originCity || values.outbound.destinationCity,
            originAirport:
              returnValues.originAirport ||
              `Aeroporto de ${
                returnValues.originCity || values.outbound.destinationCity
              }`,
            destinationIata: (
              returnValues.destinationIata || values.outbound.originIata
            ).toUpperCase(),
            destinationCity:
              returnValues.destinationCity || values.outbound.originCity,
            destinationAirport:
              returnValues.destinationAirport ||
              `Aeroporto de ${
                returnValues.destinationCity || values.outbound.originCity
              }`,
            departureDate: returnValues.departureDate,
            departureTime: returnValues.departureTime,
            arrivalDate: returnValues.arrivalDate,
            arrivalTime: returnValues.arrivalTime,
            duration: returnValues.duration || values.outbound.duration,
            stops: Number(returnValues.stops),
            stopCity:
              Number(returnValues.stops) > 0 ? returnValues.stopCity : undefined,
            cabinClass: values.cabinClass,
            baggageIncluded: values.baggageIncluded,
            handBaggageIncluded: values.handBaggageIncluded,
          }
        : undefined,
    };

    setIsSaving(true);
    try {
      if (flight) {
        await updateFlight(flight.id, flightData);
        toast.success("Voo atualizado com sucesso!");
      } else {
        await addFlight(flightData);
        toast.success("Novo voo cadastrado com sucesso!");
      }
      onOpenChange(false);
    } catch {
      toast.error("Erro ao salvar o voo. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  const tabContent: Record<PassagensTabId, ReactNode> = {
    outbound: <FlightOutboundTab form={form} />,
    return: <FlightReturnTab form={form} />,
    details: <FlightDetailsTab form={form} />,
    pricing: <FlightPricingTab form={form} />,
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="grid max-h-[92vh] grid-rows-[auto_auto_minmax(0,1fr)] gap-0 overflow-hidden rounded-3xl border-border bg-card p-0  sm:max-w-3xl"
      >
        <div className="flex items-center justify-between p-5 border-b border-border/60 bg-muted/70 shrink-0">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-2xl bg-primary text-secondary flex items-center justify-center ">
              <Plane className="size-5" />
            </div>
            <div>
              <DialogTitle className="text-base font-black text-foreground">
                {flight ? "Editar Voo Cadastrado" : "Cadastrar Nova Passagem Aérea"}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Configure trechos de ida e volta, companhias, regras de bagagem e
                valores
              </DialogDescription>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="size-8 rounded-full bg-card border border-border hover:bg-muted text-muted-foreground hover:text-foreground/70 flex items-center justify-center transition cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        <FlightFormTabs
          activeTab={activeTab}
          isRoundTrip={isRoundTrip}
          onChange={setActiveTab}
        />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, handleError)}
            className="flex min-h-0 flex-col overflow-hidden"
          >
            <div className="flex-1 space-y-6 overflow-y-auto p-6">
              {tabContent[activeTab]}
            </div>

            <div className="flex items-center justify-between shrink-0 border-t border-border/60 px-6 py-4 bg-card">
              <div className="flex items-center gap-2">
                {activeTab !== "outbound" && (
                  <button
                    type="button"
                    onClick={handlePrevTab}
                    className="px-4 py-2 text-xs font-bold text-foreground/70 bg-muted hover:bg-border rounded-xl transition cursor-pointer"
                  >
                    ← Aba Anterior
                  </button>
                )}
                {activeTab !== "pricing" && (
                  <button
                    type="button"
                    onClick={handleNextTab}
                    className="px-4 py-2 text-xs font-bold text-primary bg-primary/10 hover:bg-primary/20 rounded-xl transition cursor-pointer"
                  >
                    Próxima Aba →
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="px-4 py-2 text-xs font-bold text-muted-foreground hover:bg-muted rounded-xl transition cursor-pointer"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-bold text-xs rounded-xl flex items-center gap-2  transition cursor-pointer"
                >
                  {isSaving ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Check className="size-4" />
                  )}
                  {isSaving
                    ? "Salvando..."
                    : flight
                      ? "Salvar Alterações"
                      : "Cadastrar Voo Completo"}
                </button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
