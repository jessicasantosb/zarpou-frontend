"use client";

import { Container } from "@/components/shared/container";
import { RoteiroCta } from "@/components/shared/roteiro-cta";
import { useHospedagens } from "../_hooks/use-hospedagens";
import { FiltersSidebar } from "./filters-sidebar";
import { HotelListingCard } from "./hotel-listing-card";
import { HotelsEmptyState } from "./hotels-empty-state";
import { ResultsToolbar } from "./results-toolbar";
import { SearchSummaryBar } from "./search-summary-bar";

export function HospedagensContent() {
  const {
    searchTerm,
    onSearchTermChange,
    checkIn,
    onCheckInChange,
    checkOut,
    onCheckOutChange,
    adults,
    onAdultsDecrease,
    onAdultsIncrease,
    rooms,
    onRoomsDecrease,
    onRoomsIncrease,
    todayStr,
    nights,
    priceMax,
    onPriceMaxChange,
    freeCancellation,
    onFreeCancellationChange,
    breakfastOnly,
    onBreakfastOnlyChange,
    minRating,
    onMinRatingChange,
    selectedStars,
    onToggleStar,
    sortBy,
    onSortChange,
    bookings,
    filteredHotels,
    onClearSearch,
    onClearFilters,
    onResetResults,
  } = useHospedagens();

  return (
    <div className="min-h-screen bg-muted pt-[65px] pb-16">
      <SearchSummaryBar
        searchTerm={searchTerm}
        checkIn={checkIn}
        checkOut={checkOut}
        nights={nights}
        adults={adults}
        rooms={rooms}
        onSearchTermChange={onSearchTermChange}
        onClearSearch={onClearSearch}
      />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <FiltersSidebar
            checkIn={checkIn}
            checkOut={checkOut}
            adults={adults}
            rooms={rooms}
            nights={nights}
            todayStr={todayStr}
            priceMax={priceMax}
            freeCancellation={freeCancellation}
            breakfastOnly={breakfastOnly}
            minRating={minRating}
            selectedStars={selectedStars}
            onCheckInChange={onCheckInChange}
            onCheckOutChange={onCheckOutChange}
            onAdultsDecrease={onAdultsDecrease}
            onAdultsIncrease={onAdultsIncrease}
            onRoomsDecrease={onRoomsDecrease}
            onRoomsIncrease={onRoomsIncrease}
            onPriceMaxChange={onPriceMaxChange}
            onFreeCancellationChange={onFreeCancellationChange}
            onBreakfastOnlyChange={onBreakfastOnlyChange}
            onMinRatingChange={onMinRatingChange}
            onToggleStar={onToggleStar}
            onClearFilters={onClearFilters}
          />

          <main className="lg:col-span-9 space-y-5">
            <ResultsToolbar
              count={filteredHotels.length}
              sortBy={sortBy}
              onSortChange={onSortChange}
            />

            {filteredHotels.length === 0 ? (
              <HotelsEmptyState onReset={onResetResults} />
            ) : (
              filteredHotels.map((hotel) => (
                <HotelListingCard
                  key={hotel.id}
                  hotel={hotel}
                  bookings={bookings}
                  nights={nights}
                  rooms={rooms}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  adults={adults}
                />
              ))
            )}
          </main>
        </div>

        <RoteiroCta />
      </Container>
    </div>
  );
}
