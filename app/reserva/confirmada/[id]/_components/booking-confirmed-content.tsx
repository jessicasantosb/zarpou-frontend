"use client";

import Link from "next/link";
import { Container } from "@/components/shared/container";
import { useBookingConfirmed } from "../_hooks/use-booking-confirmed";
import { BookingConfirmedActions } from "./booking-confirmed-actions";
import { BookingSuccessBanner } from "./booking-success-banner";
import { BookingVoucher } from "./booking-voucher";
import { PixPaymentPanel } from "./pix-payment-panel";

interface BookingConfirmedContentProps {
  bookingId: string;
}

export function BookingConfirmedContent({
  bookingId,
}: BookingConfirmedContentProps) {
  const { mounted, booking, config, copied, isPix, primaryTraveler, onCopyPix } =
    useBookingConfirmed(bookingId);

  if (!mounted) return null;

  if (!booking) {
    return (
      <div className="min-h-screen bg-muted pt-32 pb-16 flex items-center justify-center">
        <Container>
          <div className="max-w-md mx-auto bg-card rounded-3xl p-8 text-center border border-border  space-y-4">
            <h1 className="text-xl font-bold text-foreground">
              Reserva não encontrada
            </h1>
            <p className="text-xs text-muted-foreground">
              Não localizamos nenhuma reserva com este identificador.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-xl"
            >
              Voltar para o Início
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted pt-24 pb-20 print:bg-card print:p-0">
      <Container>
        <div className="max-w-4xl mx-auto space-y-6">
          <BookingSuccessBanner
            booking={booking}
            isPix={isPix}
            primaryEmail={primaryTraveler.email}
            whatsapp={config.whatsapp}
          />

          {isPix && (
            <PixPaymentPanel
              booking={booking}
              copied={copied}
              onCopyPix={onCopyPix}
            />
          )}

          <BookingVoucher
            booking={booking}
            primaryTraveler={primaryTraveler}
            companyName={config.companyName}
            cnpj={config.cnpj}
            cadastur={config.cadastur}
            phone={config.phone}
            email={config.email}
          />

          <BookingConfirmedActions />
        </div>
      </Container>
    </div>
  );
}
