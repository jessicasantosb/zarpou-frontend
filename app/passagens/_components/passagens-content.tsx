"use client";

import { Container } from "@/components/shared/container";
import { RoteiroCta } from "@/components/shared/roteiro-cta";
import { usePassagens } from "../_hooks/use-passagens";
import { FlightCard } from "./flight-card";
import { FlightsResultsBar } from "./flights-results-bar";
import { FlightsSidebar } from "./flights-sidebar";
import { FlightsSummaryHeader } from "./flights-summary-header";

export function PassagensContent() {
  const {
    departureDate,
    onDepartureDateChange,
    returnDate,
    onReturnDateChange,
    adults,
    onAdultsChange,
    children,
    onChildrenChange,
    totalTravelers,
    todayStr,
    directOnly,
    onDirectOnlyChange,
    baggageOnly,
    onBaggageOnlyChange,
    selectedAirlines,
    onToggleAirline,
    priceMax,
    onPriceMaxChange,
    sortBy,
    onSortByChange,
    availableAirlines,
    onClearFilters,
    filteredFlights,
    onSelectFlight,
  } = usePassagens();

  return (
    <div className="min-h-screen bg-muted pt-[65px] pb-16">
      <FlightsSummaryHeader
        departureDate={departureDate}
        returnDate={returnDate}
        totalTravelers={totalTravelers}
      />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <FlightsSidebar
            todayStr={todayStr}
            departureDate={departureDate}
            returnDate={returnDate}
            adults={adults}
            childCount={children}
            totalTravelers={totalTravelers}
            priceMax={priceMax}
            directOnly={directOnly}
            baggageOnly={baggageOnly}
            availableAirlines={availableAirlines}
            selectedAirlines={selectedAirlines}
            onDepartureDateChange={onDepartureDateChange}
            onReturnDateChange={onReturnDateChange}
            onAdultsChange={onAdultsChange}
            onChildrenChange={onChildrenChange}
            onPriceMaxChange={onPriceMaxChange}
            onDirectOnlyChange={onDirectOnlyChange}
            onBaggageOnlyChange={onBaggageOnlyChange}
            onToggleAirline={onToggleAirline}
            onClearFilters={onClearFilters}
          />

          <main className="lg:col-span-9 space-y-5">
            <FlightsResultsBar
              count={filteredFlights.length}
              sortBy={sortBy}
              onSortByChange={onSortByChange}
            />

            {filteredFlights.map((flight) => (
              <FlightCard
                key={flight.id}
                flight={flight}
                totalTravelers={totalTravelers}
                departureDate={departureDate}
                returnDate={returnDate}
                onSelect={onSelectFlight}
              />
            ))}
          </main>
        </div>

        <RoteiroCta />
      </Container>
    </div>
  );
}
