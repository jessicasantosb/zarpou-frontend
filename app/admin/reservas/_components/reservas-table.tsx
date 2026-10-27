import Link from "next/link";
import { CalendarCheck, Eye, Hotel, Plane } from "lucide-react";
import { cn } from "@/lib/utils";
import { Booking } from "@/types/booking";

interface ReservasTableProps {
  bookings: Booking[];
}

export function ReservasTable({ bookings }: ReservasTableProps) {
  return (
    <div className="bg-card rounded-3xl p-6 border border-border ">
      {bookings.length === 0 ? (
        <div className="py-16 text-center space-y-3">
          <CalendarCheck className="size-12 text-muted-foreground/60 mx-auto" />
          <h3 className="text-base font-bold text-foreground/80">
            Nenhuma reserva encontrada
          </h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Quando clientes realizarem compras no site, elas aparecerão listadas
            aqui com atualização em tempo real.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border/60 text-muted-foreground tracking-wide font-semibold">
                <th className="pb-3">PNR (Localizador)</th>
                <th className="pb-3">Titular</th>
                <th className="pb-3">Serviço / Produto</th>
                <th className="pb-3">Datas</th>
                <th className="pb-3">Meio de Pagamento</th>
                <th className="pb-3">Valor Total</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Voucher</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 font-medium text-foreground/80">
              {bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="hover:bg-muted/70 transition"
                >
                  <td className="py-4 font-mono font-black text-primary">
                    {booking.locatorCode}
                  </td>
                  <td className="py-4">
                    <p className="font-bold text-foreground">
                      {booking.travelers?.[0]?.fullName || "Cliente"}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {booking.travelers?.[0]?.email || ""}
                    </p>
                  </td>
                  <td className="py-4 max-w-[200px]">
                    <div className="flex items-center gap-2 truncate">
                      {booking.productType === "hotel" ? (
                        <Hotel className="size-3.5 text-primary shrink-0" />
                      ) : (
                        <Plane className="size-3.5 text-primary shrink-0" />
                      )}
                      <span className="truncate">
                        {booking.productType === "hotel"
                          ? booking.hotel?.name || "Hotel"
                          : booking.flight?.outbound?.airline || "Voo"}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 text-muted-foreground whitespace-nowrap">
                    {booking.checkInDate} → {booking.checkOutDate}
                  </td>
                  <td className="py-4 uppercase text-[10px] font-bold text-foreground/70">
                    {booking.paymentMethod === "credit_card"
                      ? `Cartão (${booking.installments}x)`
                      : booking.paymentMethod === "pix"
                        ? "Pix"
                        : "Boleto"}
                  </td>
                  <td className="py-4 font-black text-foreground">
                    R$ {(booking.pricing?.finalAmount || 0).toFixed(2)}
                  </td>
                  <td className="py-4">
                    <span
                      className={cn(
                        "px-2.5 py-1 rounded-full text-[10px] font-bold border",
                        booking.status === "confirmada"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-amber-50 text-amber-700 border-amber-200",
                      )}
                    >
                      {booking.status === "confirmada"
                        ? "✓ Confirmada"
                        : "Pendente Pix"}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <Link
                      href={`/reserva/confirmada/${booking.id}`}
                      target="_blank"
                      className="px-3 py-1.5 rounded-lg bg-muted hover:bg-border text-foreground/80 font-bold inline-flex items-center gap-1.5 transition "
                    >
                      <Eye className="size-3.5" />
                      Voucher
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
