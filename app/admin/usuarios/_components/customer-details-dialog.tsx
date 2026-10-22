import { Bell, Mail, MessageCircle, Plane, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { formatCPF } from "@/lib/format-cpf";
import { cn } from "@/lib/utils";
import { CustomerBookingItem, CustomerDetailData } from "../_hooks/use-usuarios";

interface CustomerDetailsDialogProps {
  customer: CustomerDetailData;
  loading: boolean;
  onClose: () => void;
}

export function CustomerDetailsDialog({
  customer,
  loading,
  onClose,
}: CustomerDetailsDialogProps) {
  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        aria-describedby={undefined}
        className="grid max-h-[90vh] grid-rows-[auto_minmax(0,1fr)_auto] gap-0 overflow-hidden rounded-3xl border-border bg-card p-0 shadow-xl sm:max-w-2xl"
      >
        <div className="p-6 border-b border-border/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-2xl bg-secondary/20 text-primary font-bold flex items-center justify-center text-sm">
              {customer.name
                ?.split(" ")
                .map((part) => part[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </div>
            <div>
              <DialogTitle className="font-black text-foreground text-lg">
                {customer.name}
              </DialogTitle>
              <p className="text-xs text-muted-foreground">
                {customer.email} • ID: {customer.id}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground/80 hover:bg-muted rounded-xl transition"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-muted p-3.5 rounded-2xl border border-border/60">
              <span className="text-[10px] font-bold text-muted-foreground tracking-wide block">
                CPF
              </span>
              <span className="font-mono text-xs font-bold text-foreground mt-0.5 block">
                {customer.cpf
                  ? formatCPF(customer.cpf)
                  : "Não informado"}
              </span>
            </div>

            <div className="bg-muted p-3.5 rounded-2xl border border-border/60">
              <span className="text-[10px] font-bold text-muted-foreground tracking-wide block">
                Telefone
              </span>
              <span className="text-xs font-bold text-foreground mt-0.5 block">
                {customer.phone || "Não informado"}
              </span>
            </div>

            <div className="bg-muted p-3.5 rounded-2xl border border-border/60">
              <span className="text-[10px] font-bold text-muted-foreground tracking-wide block">
                Data de Cadastro
              </span>
              <span className="text-xs font-bold text-foreground mt-0.5 block">
                {customer.createdAt
                  ? new Date(customer.createdAt).toLocaleDateString("pt-BR")
                  : "Recente"}
              </span>
            </div>
          </div>

          <div className="p-4 bg-sky-50/70 border border-sky-100 rounded-2xl space-y-2">
            <span className="text-xs font-bold text-sky-900 flex items-center gap-1.5">
              <Bell className="size-4 text-sky-600" />
              Canais de Notificação de Promoções
            </span>
            <div className="flex flex-wrap gap-2 pt-1">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold",
                  customer.notifications?.whatsappPromotions ?? true
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                    : "bg-muted text-muted-foreground",
                )}
              >
                <MessageCircle className="size-3.5 text-emerald-600" />
                WhatsApp:{" "}
                {(customer.notifications?.whatsappPromotions ?? true)
                  ? "Habilitado"
                  : "Desabilitado"}
              </span>

              <span
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold",
                  customer.notifications?.emailPromotions ?? true
                    ? "bg-sky-100 text-sky-800 border border-sky-200"
                    : "bg-muted text-muted-foreground",
                )}
              >
                <Mail className="size-3.5 text-sky-600" />
                E-mail:{" "}
                {(customer.notifications?.emailPromotions ?? true)
                  ? "Habilitado"
                  : "Desabilitado"}
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-black text-foreground flex items-center gap-2">
                <Plane className="size-4 text-secondary" />
                Histórico de Viagens &amp; Reservas (
                {customer.bookings?.length || customer.totalBookings || 0})
              </h4>
            </div>

            {loading ? (
              <p className="text-xs text-muted-foreground py-4 text-center">
                Carregando reservas do cliente...
              </p>
            ) : !customer.bookings || customer.bookings.length === 0 ? (
              <div className="p-8 text-center bg-muted rounded-2xl border border-border/60 text-muted-foreground text-xs">
                Este cliente ainda não realizou reservas no sistema Zarpou.
              </div>
            ) : (
              <div className="space-y-2">
                {customer.bookings.map((booking: CustomerBookingItem) => (
                  <div
                    key={booking.id}
                    className="p-3.5 bg-muted hover:bg-muted/80 rounded-2xl border border-border/70 transition flex items-center justify-between text-xs"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-primary">
                          #{booking.locator_code || booking.id}
                        </span>
                        <span className="font-bold text-foreground">
                          {booking.booking_type === "hotel"
                            ? "Hospedagem"
                            : booking.booking_type === "flight"
                              ? "Passagem Aérea"
                              : "Pacote"}
                        </span>
                      </div>
                      <span className="text-[11px] text-muted-foreground">
                        {booking.created_at
                          ? new Date(booking.created_at).toLocaleDateString(
                              "pt-BR",
                            )
                          : "Data recente"}
                      </span>
                    </div>

                    <div className="text-right space-y-1">
                      <span className="font-black text-foreground block">
                        {booking.total_amount?.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </span>
                      <span
                        className={cn(
                          "inline-block px-2 py-0.5 rounded-full text-[10px] font-bold",
                          booking.status === "confirmed"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700",
                        )}
                      >
                        {booking.status === "confirmed"
                          ? "Confirmada"
                          : "Pendente"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="p-4 bg-muted border-t border-border/60 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-foreground/80 bg-card border border-border rounded-xl hover:bg-muted transition"
          >
            Fechar
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
