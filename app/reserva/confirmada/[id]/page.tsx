"use client";

import { use } from "react";
import { BookingConfirmedContent } from "./_components/booking-confirmed-content";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function BookingConfirmedPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const bookingId = resolvedParams.id;

  return <BookingConfirmedContent bookingId={bookingId} />;
}
