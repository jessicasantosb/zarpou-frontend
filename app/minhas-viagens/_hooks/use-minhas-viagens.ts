"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useBookingStore } from "@/stores/booking-store";
import { useCustomerAuthStore } from "@/stores/customer-auth-store";
import { useProductStore } from "@/stores/product-store";
import { Booking } from "@/types/booking";

export type StatusFilter = "todas" | "proximas" | "concluidas" | "pendentes";

export function useMinhasViagens() {
  const { bookings, fetchUserBookings, addBookingReview } = useBookingStore();
  const { isCustomerAuthenticated, customerUser, logout } =
    useCustomerAuthStore();
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState<"reservas" | "perfil">(
    searchParams.get("tab") === "perfil" ||
      searchParams.get("tab") === "notificacoes"
      ? "perfil"
      : "reservas",
  );

  const [statusFilter, setStatusFilter] = useState<StatusFilter>("todas");

  const [copiedPnr, setCopiedPnr] = useState<string | null>(null);

  const [ratingModalBooking, setRatingModalBooking] = useState<Booking | null>(
    null,
  );
  const [ratingStars, setRatingStars] = useState<number>(5);
  const [hoverStars, setHoverStars] = useState<number>(0);
  const [reviewComment, setReviewComment] = useState<string>("");
  const [isSubmittingReview, setIsSubmittingReview] = useState<boolean>(false);

  const [pnrSearch, setPnrSearch] = useState("");
  const [pnrEmail, setPnrEmail] = useState("");
  const [pnrError, setPnrError] = useState("");
  const [foundBookingId, setFoundBookingId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    fetchUserBookings();
  }, [fetchUserBookings]);

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "perfil" || tabParam === "notificacoes") {
      setActiveTab("perfil");
    } else if (tabParam === "reservas") {
      setActiveTab("reservas");
    }
  }, [searchParams]);

  const handleCopyPnr = (locator: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(locator);
      setCopiedPnr(locator);
      toast.success(`Código localizador ${locator} copiado!`);
      setTimeout(() => {
        setCopiedPnr((prev) => (prev === locator ? null : prev));
      }, 2500);
    }
  };

  const handleOpenReviewModal = (booking: Booking) => {
    setRatingModalBooking(booking);
    setRatingStars(booking.review?.rating || 5);
    setHoverStars(0);
    setReviewComment(booking.review?.comment || "");
  };

  const handleCloseReviewModal = () => {
    if (isSubmittingReview) return;
    setRatingModalBooking(null);
    setReviewComment("");
    setHoverStars(0);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ratingModalBooking) return;
    setIsSubmittingReview(true);
    try {
      await addBookingReview(
        ratingModalBooking.id,
        ratingStars,
        reviewComment.trim() || undefined,
      );

      if (ratingModalBooking.hotel?.id) {
        const hotelId = ratingModalBooking.hotel.id;
        const hotel = useProductStore
          .getState()
          .hotels.find((h) => h.id === hotelId);
        if (hotel) {
          const clientNote = ratingStars * 2;
          const currentCount = hotel.reviewCount || 0;
          const currentRating =
            hotel.rating && hotel.rating > 0 ? hotel.rating : clientNote;
          const newRating = Number(
            (
              (currentRating * currentCount + clientNote) /
              (currentCount + 1)
            ).toFixed(1),
          );
          useProductStore.getState().updateHotel(hotelId, {
            rating: newRating,
            reviewCount: currentCount + 1,
            reviewLabel:
              newRating >= 9
                ? "Excelente"
                : newRating >= 8
                  ? "Fabuloso"
                  : "Bom",
          });
        }
      }

      toast.success(
        "Avaliação registrada com sucesso! Muito obrigado pelo feedback!",
      );
      setRatingModalBooking(null);
      setReviewComment("");
      setHoverStars(0);
    } catch {
      toast.error("Não foi possível salvar a avaliação. Tente novamente.");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handleSearchByPnr = (e: React.FormEvent) => {
    e.preventDefault();
    setPnrError("");

    const target = bookings.find(
      (b) =>
        b.locatorCode.trim().toLowerCase() === pnrSearch.trim().toLowerCase() &&
        (!pnrEmail ||
          b.travelers.some(
            (t) => t.email.toLowerCase() === pnrEmail.toLowerCase(),
          )),
    );

    if (target) {
      setFoundBookingId(target.id);
    } else {
      setPnrError(
        "Reserva não localizada. Verifique o código localizador e o e-mail informado.",
      );
    }
  };

  const todayStr = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d.toISOString().split("T")[0];
  }, []);

  const isUpcoming = (b: Booking) => {
    if (b.status !== "confirmada") return false;
    if (!b.checkInDate) return true;
    return b.checkInDate >= todayStr;
  };

  const isCompleted = (b: Booking) => {
    if (b.status === "concluida") return true;
    if (b.review) return true;
    if (b.checkOutDate && b.checkOutDate < todayStr && b.status === "confirmada")
      return true;
    return false;
  };

  const isPending = (b: Booking) => {
    return b.status === "pendente_pagamento";
  };

  const userBookings = bookings.filter((b) => {
    if (!customerUser?.email) return true;
    return b.travelers.some(
      (t) => t.email.toLowerCase() === customerUser.email.toLowerCase(),
    );
  });

  const displayBookings = userBookings.length > 0 ? userBookings : bookings;

  const upcomingConfirmedBookings = displayBookings
    .filter((b) => isUpcoming(b) && b.checkInDate)
    .map((b) => {
      const [year, month, day] = (b.checkInDate || "").split("-").map(Number);
      const tripDate = new Date(year, month - 1, day);
      tripDate.setHours(0, 0, 0, 0);
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      const diffMs = tripDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      return { booking: b, diffDays };
    })
    .filter((item) => item.diffDays >= 0)
    .sort((a, b) => a.diffDays - b.diffDays);

  const nextTrip = upcomingConfirmedBookings[0] || null;

  const proximasCount = displayBookings.filter(isUpcoming).length;
  const concluidasCount = displayBookings.filter(isCompleted).length;
  const pendentesCount = displayBookings.filter(isPending).length;

  const filteredBookings = displayBookings.filter((b) => {
    if (statusFilter === "proximas") return isUpcoming(b);
    if (statusFilter === "concluidas") return isCompleted(b);
    if (statusFilter === "pendentes") return isPending(b);
    return true;
  });

  return {
    mounted,
    isCustomerAuthenticated,
    customerUser,
    onLogout: logout,
    activeTab,
    onTabChange: setActiveTab,
    statusFilter,
    onStatusFilterChange: setStatusFilter,
    copiedPnr,
    onCopyPnr: handleCopyPnr,
    ratingModalBooking,
    ratingStars,
    onRatingStarsChange: setRatingStars,
    hoverStars,
    onHoverStarsChange: setHoverStars,
    reviewComment,
    onReviewCommentChange: setReviewComment,
    isSubmittingReview,
    onOpenReviewModal: handleOpenReviewModal,
    onCloseReviewModal: handleCloseReviewModal,
    onSubmitReview: handleSubmitReview,
    pnrSearch,
    onPnrSearchChange: setPnrSearch,
    pnrEmail,
    onPnrEmailChange: setPnrEmail,
    pnrError,
    foundBookingId,
    onSearchByPnr: handleSearchByPnr,
    displayBookings,
    nextTrip,
    proximasCount,
    concluidasCount,
    pendentesCount,
    filteredBookings,
    isCompleted,
  };
}
