import type { UseFormReturn } from "react-hook-form";
import { ArrowLeftRight, Plane } from "lucide-react";
import { toast } from "react-toastify";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import type { FlightFormValues } from "@/schemas/flight-form";
import { FlightField } from "./flight-field";

interface FlightReturnTabProps {
  form: UseFormReturn<FlightFormValues>;
}

export function FlightReturnTab({ form }: FlightReturnTabProps) {
  const isRoundTrip = form.watch("isRoundTrip");
  const stops = form.watch("returnFlight.stops");

  const handleInvertReturnFromOutbound = () => {
    const outbound = form.getValues("outbound");
    const currentReturn = form.getValues("returnFlight");

    form.setValue("returnFlight", {
      ...currentReturn,
      originCity: outbound.destinationCity,
      originIata: outbound.destinationIata,
      originAirport:
        outbound.destinationAirport || `Aeroporto de ${outbound.destinationCity}`,
      destinationCity: outbound.originCity,
      destinationIata: outbound.originIata,
      destinationAirport:
        outbound.originAirport || `Aeroporto de ${outbound.originCity}`,
      airline: outbound.airline,
      airlineCode: outbound.airlineCode,
    });
    toast.info("Rota de volta invertida com sucesso!");
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-150">
      <div className="flex items-center justify-between p-4 bg-muted rounded-2xl border border-border">
        <div>
          <p className="text-sm font-bold text-foreground">Tipo de Viagem</p>
          <p className="text-xs text-muted-foreground">
            {isRoundTrip
              ? "Viagem de Ida e Volta (Com voo de regresso incluso)"
              : "Somente Ida (One-Way)"}
          </p>
        </div>

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isRoundTrip}
            onChange={(event) =>
              form.setValue("isRoundTrip", event.target.checked)
            }
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-border peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-card after:border-input after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
        </label>
      </div>

      {isRoundTrip ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-primary tracking-wide">
              Configuração do Voo de Volta
            </span>
            <button
              type="button"
              onClick={handleInvertReturnFromOutbound}
              className="text-xs font-bold text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeftRight className="size-3.5" />
              Inverter Cidades da Ida
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-2xl border border-border space-y-3">
              <p className="text-xs font-bold text-foreground tracking-wide">
                Origem da Volta
              </p>
              <div className="grid grid-cols-3 gap-2">
                <FormField
                  control={form.control}
                  name="returnFlight.originCity"
                  render={({ field }) => (
                    <FormItem className="col-span-2 gap-0 space-y-1">
                      <FormControl>
                        <input
                          type="text"
                          name={field.name}
                          ref={field.ref}
                          onBlur={field.onBlur}
                          value={String(field.value ?? "")}
                          onChange={(event) => field.onChange(event.target.value)}
                          placeholder="Cidade (ex: Miami)"
                          className="col-span-2 h-10 px-3 text-xs rounded-xl border border-border bg-card"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="returnFlight.originIata"
                  render={({ field }) => (
                    <FormItem className="gap-0 space-y-1">
                      <FormControl>
                        <input
                          type="text"
                          maxLength={3}
                          name={field.name}
                          ref={field.ref}
                          onBlur={field.onBlur}
                          value={String(field.value ?? "")}
                          onChange={(event) =>
                            field.onChange(event.target.value.toUpperCase())
                          }
                          placeholder="IATA"
                          className="h-10 px-2 text-xs rounded-xl border border-border bg-card font-black text-center uppercase"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="p-4 bg-muted rounded-2xl border border-border space-y-3">
              <p className="text-xs font-bold text-foreground tracking-wide">
                Destino da Volta
              </p>
              <div className="grid grid-cols-3 gap-2">
                <FormField
                  control={form.control}
                  name="returnFlight.destinationCity"
                  render={({ field }) => (
                    <FormItem className="col-span-2 gap-0 space-y-1">
                      <FormControl>
                        <input
                          type="text"
                          name={field.name}
                          ref={field.ref}
                          onBlur={field.onBlur}
                          value={String(field.value ?? "")}
                          onChange={(event) => field.onChange(event.target.value)}
                          placeholder="Cidade (ex: São Paulo)"
                          className="col-span-2 h-10 px-3 text-xs rounded-xl border border-border bg-card"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="returnFlight.destinationIata"
                  render={({ field }) => (
                    <FormItem className="gap-0 space-y-1">
                      <FormControl>
                        <input
                          type="text"
                          maxLength={3}
                          name={field.name}
                          ref={field.ref}
                          onBlur={field.onBlur}
                          value={String(field.value ?? "")}
                          onChange={(event) =>
                            field.onChange(event.target.value.toUpperCase())
                          }
                          placeholder="IATA"
                          className="h-10 px-2 text-xs rounded-xl border border-border bg-card font-black text-center uppercase"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <FlightField
              control={form.control}
              name="returnFlight.airline"
              label="Cia Aérea da Volta"
              placeholder="LATAM Airlines"
              inputClassName="border-border"
            />
            <FlightField
              control={form.control}
              name="returnFlight.airlineCode"
              label="Cód. IATA"
              maxLength={2}
              placeholder="LA"
              transform={(value) => value.toUpperCase()}
              inputClassName="uppercase text-center"
            />
            <FlightField
              control={form.control}
              name="returnFlight.flightNumber"
              label="Nº Voo Volta"
              placeholder="LA-8013"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2 border-t border-border/60">
            <FlightField
              control={form.control}
              name="returnFlight.departureDate"
              label="Data Partida"
              type="date"
              inputClassName="px-2"
            />
            <FlightField
              control={form.control}
              name="returnFlight.departureTime"
              label="Hora Partida"
              type="time"
              inputClassName="px-2 text-center"
            />
            <FlightField
              control={form.control}
              name="returnFlight.arrivalDate"
              label="Data Chegada"
              type="date"
              inputClassName="px-2"
            />
            <FlightField
              control={form.control}
              name="returnFlight.arrivalTime"
              label="Hora Chegada"
              type="time"
              inputClassName="px-2 text-center"
            />
            <FlightField
              control={form.control}
              name="returnFlight.duration"
              label="Duração Volta"
              placeholder="8h 15m"
              wrapperClassName="col-span-2 sm:col-span-1"
              inputClassName="px-2"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-border/60">
            <FlightField
              control={form.control}
              name="returnFlight.stops"
              label="Paradas na Volta"
              render={(field) => (
                <FormControl>
                  <select
                    value={String(field.value)}
                    onChange={(event) =>
                      field.onChange(Number(event.target.value))
                    }
                    className="w-full h-10 px-3 text-xs rounded-xl border border-border"
                  >
                    <option value="0">0 - Voo Direto</option>
                    <option value="1">1 escala</option>
                    <option value="2">2 escalas</option>
                  </select>
                </FormControl>
              )}
            />

            {stops > 0 && (
              <FlightField
                control={form.control}
                name="returnFlight.stopCity"
                label="Cidade da Escala (Volta)"
                placeholder="Ex: Manaus (MAO)"
              />
            )}
          </div>
        </div>
      ) : (
        <div className="p-8 text-center bg-muted rounded-2xl border border-dashed border-border space-y-2">
          <Plane className="size-8 text-muted-foreground/60 mx-auto" />
          <p className="text-xs font-bold text-foreground/80">
            Voo configurado como Somente Ida
          </p>
          <p className="text-[11px] text-muted-foreground max-w-sm mx-auto">
            O cliente adquirirá apenas a rota de partida. Ative o botão acima se
            desejar incluir voo de regresso.
          </p>
        </div>
      )}
    </div>
  );
}
