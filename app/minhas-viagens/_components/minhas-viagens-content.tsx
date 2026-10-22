"use client";

import { Container } from "@/components/shared/container";
import { LoadingScreen } from "@/components/shared/loading-screen";
import { useMinhasViagens } from "../_hooks/use-minhas-viagens";
import { BookingCard } from "./booking-card";
import { CustomerProfileTab } from "./customer-profile-tab";
import { GuestAccess } from "./guest-access";
import { NextTripBanner } from "./next-trip-banner";
import { ReviewModal } from "./review-modal";
import { TravelerHeader } from "./traveler-header";
import { TripsEmptyState } from "./trips-empty-state";
import { TripsStatusFilters } from "./trips-status-filters";
import { TripsTabs } from "./trips-tabs";

export function MinhasViagensContent() {
  const {
    mounted,
    isCustomerAuthenticated,
    customerUser,
    onLogout,
    activeTab,
    onTabChange,
    statusFilter,
    onStatusFilterChange,
    copiedPnr,
    onCopyPnr,
    ratingModalBooking,
    ratingStars,
    onRatingStarsChange,
    hoverStars,
    onHoverStarsChange,
    reviewComment,
    onReviewCommentChange,
    isSubmittingReview,
    onOpenReviewModal,
    onCloseReviewModal,
    onSubmitReview,
    pnrSearch,
    onPnrSearchChange,
    pnrEmail,
    onPnrEmailChange,
    pnrError,
    foundBookingId,
    onSearchByPnr,
    displayBookings,
    nextTrip,
    proximasCount,
    concluidasCount,
    pendentesCount,
    filteredBookings,
    isCompleted,
  } = useMinhasViagens();

  if (!mounted) {
    return (
      <LoadingScreen
        title="Acessando Área do Viajante..."
        subtitle="Buscando suas reservas e vouchers de viagem..."
        fullScreen={true}
      />
    );
  }

  if (!isCustomerAuthenticated) {
    return (
      <GuestAccess
        pnrSearch={pnrSearch}
        pnrEmail={pnrEmail}
        pnrError={pnrError}
        foundBookingId={foundBookingId}
        onPnrSearchChange={onPnrSearchChange}
        onPnrEmailChange={onPnrEmailChange}
        onSearchByPnr={onSearchByPnr}
      />
    );
  }

  return (
    <div className="min-h-screen bg-muted pt-24 pb-20">
      <TravelerHeader
        name={customerUser?.name}
        email={customerUser?.email}
        onLogout={onLogout}
      />

      <Container>
        <div className="max-w-4xl mx-auto space-y-6">
          <TripsTabs
            activeTab={activeTab}
            bookingsCount={displayBookings.length}
            onTabChange={onTabChange}
          />

          {activeTab === "perfil" ? (
            <CustomerProfileTab />
          ) : (
            <div className="space-y-6">
              <NextTripBanner nextTrip={nextTrip} />

              <TripsStatusFilters
                statusFilter={statusFilter}
                total={displayBookings.length}
                proximas={proximasCount}
                concluidas={concluidasCount}
                pendentes={pendentesCount}
                onStatusFilterChange={onStatusFilterChange}
              />

              {filteredBookings.length === 0 ? (
                <TripsEmptyState
                  statusFilter={statusFilter}
                  onResetFilter={() => onStatusFilterChange("todas")}
                />
              ) : (
                filteredBookings.map((b) => (
                  <BookingCard
                    key={b.id}
                    booking={b}
                    copiedPnr={copiedPnr}
                    isTripCompleted={isCompleted(b)}
                    onCopyPnr={onCopyPnr}
                    onOpenReview={onOpenReviewModal}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </Container>

      {ratingModalBooking && (
        <ReviewModal
          booking={ratingModalBooking}
          ratingStars={ratingStars}
          hoverStars={hoverStars}
          reviewComment={reviewComment}
          isSubmittingReview={isSubmittingReview}
          onRatingStarsChange={onRatingStarsChange}
          onHoverStarsChange={onHoverStarsChange}
          onReviewCommentChange={onReviewCommentChange}
          onClose={onCloseReviewModal}
          onSubmit={onSubmitReview}
        />
      )}
    </div>
  );
}
