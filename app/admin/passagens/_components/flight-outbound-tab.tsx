import type { UseFormReturn } from "react-hook-form";
import { MapPin, Plane } from "lucide-react";
import { FormControl } from "@/components/ui/form";
import type { FlightFormValues } from "@/schemas/flight-form";
import { POPULAR_AIRLINES } from "../_constants";
import { FlightField } from "./flight-field";

interface FlightOutboundTabProps {
  form: UseFormReturn<FlightFormValues>;
}

export function FlightOutboundTab({ form }: FlightOutboundTabProps) {
  const stops = form.watch("outbound.stops");

  return (
    <div className="space-y-5 animate-in fade-in duration-150">
      <div className="p-3 bg-primary/5 rounded-2xl border border-primary/10 flex items-center justify-between text-xs">
        <span className="font-bold text-primary flex items-center gap-1.5">
          <Plane className="size-4 text-secondary" />
          Trecho de Ida Principal
        </span>
        <span className="text-muted-foreground font-medium">
          Campos com * são obrigatórios
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-muted rounded-2xl border border-border space-y-3">
          <p className="text-xs font-bold text-foreground tracking-wide flex items-center gap-1.5">
            <MapPin className="size-3.5 text-primary" />
            Cidade de Origem
          </p>

          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <FlightField
                control={form.control}
                name="outbound.originCity"
                label="Cidade"
                required
                placeholder="Ex: São Paulo"
                labelClassName="text-[11px] font-semibold text-foreground/70 normal-case tracking-normal"
                inputClassName="bg-card font-medium"
              />
            </div>

            <FlightField
              control={form.control}
              name="outbound.originIata"
              label="IATA (3 letras)"
              required
              maxLength={3}
              placeholder="GRU"
              transform={(value) => value.toUpperCase()}
              labelClassName="text-[11px] font-semibold text-foreground/70 normal-case tracking-normal"
              inputClassName="font-black uppercase text-primary text-center"
            />
          </div>

          <FlightField
            control={form.control}
            name="outbound.originAirport"
            label="Nome do Aeroporto de Origem"
            placeholder="Ex: Aeroporto Internacional de Guarulhos"
            labelClassName="text-[11px] font-semibold text-foreground/70 normal-case tracking-normal"
            inputClassName="text-foreground/80"
          />
        </div>

        <div className="p-4 bg-muted rounded-2xl border border-border space-y-3">
          <p className="text-xs font-bold text-foreground tracking-wide flex items-center gap-1.5">
            <MapPin className="size-3.5 text-secondary" />
            Cidade de Destino
          </p>

          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <FlightField
                control={form.control}
                name="outbound.destinationCity"
                label="Cidade"
                required
                placeholder="Ex: Miami"
                labelClassName="text-[11px] font-semibold text-foreground/70 normal-case tracking-normal"
                inputClassName="bg-card font-medium"
              />
            </div>

            <FlightField
              control={form.control}
              name="outbound.destinationIata"
              label="IATA (3 letras)"
              required
              maxLength={3}
              placeholder="MIA"
              transform={(value) => value.toUpperCase()}
              labelClassName="text-[11px] font-semibold text-foreground/70 normal-case tracking-normal"
              inputClassName="font-black uppercase text-secondary text-center"
            />
          </div>

          <FlightField
            control={form.control}
            name="outbound.destinationAirport"
            label="Nome do Aeroporto de Destino"
            placeholder="Ex: Miami International Airport"
            labelClassName="text-[11px] font-semibold text-foreground/70 normal-case tracking-normal"
            inputClassName="text-foreground/80"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <FlightField
          control={form.control}
          name="outbound.airline"
          label="Companhia Aérea"
          required
          placeholder="Ex: LATAM Airlines"
          inputClassName="font-semibold"
          extra={
            <div className="flex flex-wrap gap-1 mt-1">
              {POPULAR_AIRLINES.slice(0, 4).map((air) => (
                <button
                  key={air.code}
                  type="button"
                  onClick={() => {
                    form.setValue("outbound.airline", air.name);
                    form.setValue("outbound.airlineCode", air.code);
                  }}
                  className="text-[10px] bg-muted hover:bg-border text-foreground/80 px-1.5 py-0.5 rounded cursor-pointer transition"
                >
                  {air.name.split(" ")[0]}
                </button>
              ))}
            </div>
          }
        />

        <FlightField
          control={form.control}
          name="outbound.airlineCode"
          label="Cód. IATA da Cia"
          maxLength={2}
          placeholder="Ex: LA"
          transform={(value) => value.toUpperCase()}
          inputClassName="font-bold uppercase text-center"
        />

        <FlightField
          control={form.control}
          name="outbound.flightNumber"
          label="Número do Voo"
          required
          placeholder="Ex: LA-8012"
          inputClassName="font-semibold"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2 border-t border-border/60">
        <FlightField
          control={form.control}
          name="outbound.departureDate"
          label="Data Partida"
          type="date"
          inputClassName="px-2.5 font-medium"
        />
        <FlightField
          control={form.control}
          name="outbound.departureTime"
          label="Hora Partida"
          type="time"
          inputClassName="px-2.5 font-medium text-center"
        />
        <FlightField
          control={form.control}
          name="outbound.arrivalDate"
          label="Data Chegada"
          type="date"
          inputClassName="px-2.5 font-medium"
        />
        <FlightField
          control={form.control}
          name="outbound.arrivalTime"
          label="Hora Chegada"
          type="time"
          inputClassName="px-2.5 font-medium text-center"
        />
        <FlightField
          control={form.control}
          name="outbound.duration"
          label="Duração"
          placeholder="Ex: 8h 15m"
          wrapperClassName="col-span-2 sm:col-span-1"
          inputClassName="px-2.5 font-medium"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-border/60">
        <FlightField
          control={form.control}
          name="outbound.stops"
          label="Paradas / Escalas"
          inputClassName="font-semibold"
          render={(field) => (
            <FormControl>
              <select
                value={String(field.value)}
                onChange={(event) => field.onChange(Number(event.target.value))}
                className="w-full h-10 px-3 text-xs rounded-xl border border-border outline-hidden focus:border-primary font-semibold"
              >
                <option value="0">0 - Voo Direto (Sem escalas)</option>
                <option value="1">1 escala</option>
                <option value="2">2 escalas</option>
              </select>
            </FormControl>
          )}
        />

        {stops > 0 && (
          <FlightField
            control={form.control}
            name="outbound.stopCity"
            label="Cidade da Escala"
            placeholder="Ex: Brasília (BSB) ou Cidade do Panamá (PTY)"
            inputClassName="font-medium"
          />
        )}
      </div>
    </div>
  );
}
