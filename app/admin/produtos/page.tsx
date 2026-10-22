"use client";

import { FlightPricesList } from "./_components/flight-prices-list";
import { HotelPricesList } from "./_components/hotel-prices-list";
import { PricesTabs } from "./_components/prices-tabs";
import { ProdutosHeader } from "./_components/produtos-header";
import { useProdutos } from "./_hooks/use-produtos";

export default function AdminProdutosPage() {
  const {
    mounted,
    hotels,
    flights,
    activeTab,
    onTabChange,
    hotelPrices,
    flightPrices,
    savedId,
    onHotelPriceChange,
    onFlightPriceChange,
    onSaveHotelPrice,
    onSaveFlightPrice,
    onResetPrices,
  } = useProdutos();

  if (!mounted) {
    return (
      <div className="p-12 text-center text-muted-foreground text-xs">
        Carregando produtos...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProdutosHeader onResetPrices={onResetPrices} />

      <PricesTabs
        activeTab={activeTab}
        hotelsCount={hotels.length}
        flightsCount={flights.length}
        onChange={onTabChange}
      />

      {activeTab === "hospedagens" && (
        <HotelPricesList
          hotels={hotels}
          priceDrafts={hotelPrices}
          savedId={savedId}
          onPriceChange={onHotelPriceChange}
          onSave={onSaveHotelPrice}
        />
      )}

      {activeTab === "passagens" && (
        <FlightPricesList
          flights={flights}
          priceDrafts={flightPrices}
          savedId={savedId}
          onPriceChange={onFlightPriceChange}
          onSave={onSaveFlightPrice}
        />
      )}
    </div>
  );
}
