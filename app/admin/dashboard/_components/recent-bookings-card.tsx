import Link from "next/link";
import { ArrowRight, Eye } from "lucide-react";
import type { Booking } from "@/types/booking";

interface RecentBookingsCardProps {
  bookings: Booking[];
}

const paymentMethodLabels: Record<string, string> = {
  credit_card: "Cartão",
  pix: "Pix",
};

const getPaymentLabel = (method: string) =>
  paymentMethodLabels[method] ?? "Boleto";

const getProductName = (booking: Booking) =>
  booking.productType === "hotel"
    ? booking.hotel?.name || "Hotel"
    : booking.flight?.outbound?.airline || "Voo";

export function RecentBookingsCard({ bookings }: RecentBookingsCardProps) {
  return (
    <div className="space-y-4 rounded-3xl border border-border bg-card p-6 shadow-xs">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div>
          <h2 className="text-lg font-bold text-foreground">
            Últimas Reservas de Clientes
          </h2>
          <p className="text-xs text-muted-foreground">
            Pedidos efetuados com emissão de voucher e pagamento no app
          </p>
        </div>

        <Link
          href="/admin/reservas"
          className="flex items-center gap-1 text-xs font-bold text-primary hover:underline"
        >
          Ver todas
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      {bookings.length === 0 ? (
        <div className="py-12 text-center text-xs text-muted-foreground">
          Nenhuma reserva recebida até o momento. Faça uma simulação no site
          para ver o pedido refletido aqui!
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border/60 font-semibold tracking-wide text-muted-foreground">
                <th className="pb-3">Localizador</th>
                <th className="pb-3">Titular</th>
                <th className="pb-3">Produto</th>
                <th className="pb-3">Data</th>
                <th className="pb-3">Pagamento</th>
                <th className="pb-3">Valor</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 font-medium text-foreground/80">
              {bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="transition hover:bg-muted/70"
                >
                  <td className="py-3 font-mono font-bold text-primary">
                    {booking.locatorCode}
                  </td>
                  <td className="py-3">
                    {booking.travelers?.[0]?.fullName || "Cliente Zarpou"}
                  </td>
                  <td className="max-w-[180px] truncate py-3">
                    {getProductName(booking)}
                  </td>
                  <td className="py-3 text-muted-foreground">
                    {booking.createdAt
                      ? new Date(booking.createdAt).toLocaleDateString("pt-BR")
                      : "Recente"}
                  </td>
                  <td className="py-3 text-[10px] uppercase">
                    {getPaymentLabel(booking.paymentMethod)}
                  </td>
                  <td className="py-3 font-bold text-foreground">
                    R$ {(booking.pricing?.finalAmount || 0).toFixed(2)}
                  </td>
                  <td className="py-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        booking.status === "confirmada"
                          ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border border-amber-200 bg-amber-50 text-amber-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <Link
                      href={`/reserva/confirmada/${booking.id}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 rounded-lg bg-muted p-1.5 text-foreground/70 hover:bg-border"
                    >
                      <Eye className="size-3.5" />
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
