"use client";

import { Container } from "@/components/shared/container";
import { LoadingScreen } from "@/components/shared/loading-screen";
import { useHotelDetail } from "../_hooks/use-hotel-detail";
import { HotelAboutSection } from "./hotel-about-section";
import { HotelDetailBreadcrumb } from "./hotel-detail-breadcrumb";
import { HotelGallery } from "./hotel-gallery";
import { HotelHeader } from "./hotel-header";
import { RoomsSection } from "./rooms-section";
import { StaySummarySidebar } from "./stay-summary-sidebar";

interface HotelDetailContentProps {
  hotelId: string;
}

export function HotelDetailContent({ hotelId }: HotelDetailContentProps) {
  const {
    hotel,
    bookings,
    checkIn,
    checkOut,
    adults,
    children,
    nights,
    activePhoto,
    onSelectPhoto,
    onSelectRoom,
    onShare,
  } = useHotelDetail(hotelId);

  if (!hotel) {
    return (
      <LoadingScreen
        title="Carregando Detalhes da Hospedagem..."
        subtitle="Sincronizando acomodações e valores promocionais da Zarpou"
        type="hotel"
        fullScreen={true}
      />
    );
  }

  return (
    <div className="min-h-screen bg-muted pt-24 pb-20">
      <Container>
        <HotelDetailBreadcrumb onShare={onShare} />

        <div className="bg-card rounded-3xl p-6 border border-border  mb-6">
          <HotelHeader hotel={hotel} bookings={bookings} />
          <HotelGallery
            hotel={hotel}
            activePhoto={activePhoto}
            onSelectPhoto={onSelectPhoto}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <HotelAboutSection hotel={hotel} />
            <RoomsSection
              hotel={hotel}
              nights={nights}
              onSelectRoom={onSelectRoom}
            />
          </div>

          <StaySummarySidebar
            checkIn={checkIn}
            checkOut={checkOut}
            nights={nights}
            adults={adults}
            childCount={children}
          />
        </div>
      </Container>
    </div>
  );
}
