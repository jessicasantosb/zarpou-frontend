"use client";

import { use } from "react";
import { HotelDetailContent } from "./_components/hotel-detail-content";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function HotelDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  return <HotelDetailContent hotelId={resolvedParams.id} />;
}
