import Image from "next/image";
import {
  Calendar,
  Hotel,
  MapPin,
  Plane,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Booking } from "@/types/booking";
import type { BookingPrimaryTraveler } from "../_hooks/use-booking-confirmed";

interface BookingVoucherProps {
  booking: Booking;
  primaryTraveler: BookingPrimaryTraveler;
  companyName: string;
  cnpj: string;
  cadastur: string;
  phone: string;
  email: string;
}

export function BookingVoucher({
  booking,
  primaryTraveler,
  companyName,
  cnpj,
  cadastur,
  phone,
  email,
}: BookingVoucherProps) {
  return (
    <div className="bg-card rounded-3xl p-6 md:p-8 border border-border  space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-border/60">
        <div className="flex items-center gap-3">
          <div className="relative size-10">
            <Image
              src="/logo/logo.svg"
              alt="Zarpou"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <h2 className="text-lg font-black text-foreground">
              Voucher de Viagem Zarpou
            </h2>
            <p className="text-xs text-muted-foreground">
              {companyName} • CNPJ: {cnpj} • Cadastur: {cadastur}
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-semibold text-muted-foreground">
            Emissão
          </span>
          <p className="text-xs font-bold text-foreground">
            {new Date(booking.createdAt).toLocaleDateString("pt-BR")}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-border/60">
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-muted-foreground tracking-wide flex items-center gap-1.5">
            {booking.productType === "hotel" ? (
              <Hotel className="size-4 text-primary" />
            ) : (
              <Plane className="size-4 text-primary" />
            )}
            Detalhes do Serviço
          </h3>
          {booking.hotel && (
            <div className="space-y-1">
              <p className="text-base font-bold text-foreground">
                {booking.hotel.name}
              </p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="size-3.5 text-primary" />
                {booking.hotel.address}, {booking.hotel.city} -{" "}
                {booking.hotel.state}
              </p>
              <p className="text-xs font-semibold text-primary mt-1">
                Quarto: {booking.selectedRoom?.name || "Standard Confort"}
              </p>
            </div>
          )}
          {booking.flight && (
            <div className="space-y-1">
              <p className="text-base font-bold text-foreground">
                {booking.flight.outbound.airline} (
                {booking.flight.outbound.flightNumber})
              </p>
              <p className="text-xs text-muted-foreground">
                {booking.flight.outbound.originCity} (
                {booking.flight.outbound.originIata}) →{" "}
                {booking.flight.outbound.destinationCity} (
                {booking.flight.outbound.destinationIata})
              </p>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-bold text-muted-foreground tracking-wide flex items-center gap-1.5">
            <Calendar className="size-4 text-primary" />
            Datas e Ocupação
          </h3>
          <div className="space-y-1 text-xs text-foreground/80">
            <p>
              <strong>Check-in / Embarque:</strong> {booking.checkInDate}
            </p>
            <p>
              <strong>Check-out / Retorno:</strong> {booking.checkOutDate}
            </p>
            {booking.nights && booking.nights > 0 && (
              <p>
                <strong>Duração:</strong> {booking.nights} noites
              </p>
            )}
            <p>
              <strong>Viajantes:</strong> {booking.travelers.length}{" "}
              passageiro(s)
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-border/60">
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-muted-foreground tracking-wide flex items-center gap-1.5">
            <Users className="size-4 text-primary" />
            Titular da Reserva
          </h3>
          <div className="space-y-0.5 text-xs text-foreground/80">
            <p className="font-bold text-foreground">
              {primaryTraveler.fullName}
            </p>
            <p>
              Documento: {primaryTraveler.documentNumber} (
              {primaryTraveler.documentType})
            </p>
            <p>E-mail: {primaryTraveler.email}</p>
            <p>Telefone: {primaryTraveler.phone}</p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-bold text-muted-foreground tracking-wide flex items-center gap-1.5">
            <ShieldCheck className="size-4 text-emerald-600" />
            Resumo Financeiro
          </h3>
          <div className="space-y-1 text-xs text-foreground/80">
            <p>
              Forma de Pagamento:{" "}
              <strong>
                {booking.paymentMethod === "credit_card"
                  ? `Cartão de Crédito em ${booking.installments || 1}x`
                  : booking.paymentMethod === "pix"
                    ? "Pix Instantâneo"
                    : "Boleto Bancário"}
              </strong>
            </p>
            <p className="text-base font-black text-primary mt-1">
              Valor Total: R$ {booking.pricing.finalAmount.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {booking.addons.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-muted-foreground tracking-wide">
            Opcionais e Seguros Inclusos
          </h3>
          <div className="flex flex-wrap gap-2">
            {booking.addons.map((a) => (
              <span
                key={a.id}
                className="text-xs bg-muted text-foreground/80 px-3 py-1 rounded-lg font-medium"
              >
                ✓ {a.title}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="pt-4 text-[11px] text-muted-foreground text-center leading-relaxed">
        Apresente este voucher no momento do check-in juntamente com documento
        original com foto. Para suporte, entre em contato pelo telefone {phone}{" "}
        ou e-mail {email}.
      </div>
    </div>
  );
}
