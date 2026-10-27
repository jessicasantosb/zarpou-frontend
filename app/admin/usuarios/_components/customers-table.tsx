import {
  Edit2,
  Eye,
  FileText,
  Mail,
  MessageCircle,
  Phone,
  Plane,
  Trash2,
  XCircle,
} from "lucide-react";
import { formatCPF } from "@/lib/format-cpf";
import { formatCellphone } from "@/lib/format-cellphone";
import { cn } from "@/lib/utils";
import { CustomerUser } from "@/types/user";

interface CustomersTableProps {
  customers: CustomerUser[];
  onOpenDetails: (customer: CustomerUser) => void;
  onEdit: (customer: CustomerUser) => void;
  onDelete: (customer: CustomerUser) => void;
  onToggleStatus: (customer: CustomerUser) => void;
}

export function CustomersTable({
  customers,
  onOpenDetails,
  onEdit,
  onDelete,
  onToggleStatus,
}: CustomersTableProps) {
  return (
    <div className="bg-card rounded-2xl border border-border  overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-foreground/70">
          <thead className="bg-muted text-[11px] font-black tracking-wide text-muted-foreground border-b border-border">
            <tr>
              <th className="py-3.5 px-6">Cliente / Viajante</th>
              <th className="py-3.5 px-4">CPF &amp; Telefone</th>
              <th className="py-3.5 px-4">Canais Notificação</th>
              <th className="py-3.5 px-4 text-center">Viagens / Reservas</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-center">Ativar / Desativar</th>
              <th className="py-3.5 px-6 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {customers.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-muted-foreground">
                  Nenhum cliente encontrado com os critérios de busca.
                </td>
              </tr>
            ) : (
              customers.map((customer) => {
                const isActive = customer.isActive ?? true;
                const hasWhatsapp =
                  customer.notifications?.whatsappPromotions ?? true;
                const hasEmail =
                  customer.notifications?.emailPromotions ?? true;
                const cleanPhone = customer.phone
                  ? customer.phone.replace(/\D/g, "")
                  : "";

                return (
                  <tr
                    key={customer.id}
                    className="hover:bg-muted/70 transition"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "size-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0",
                            isActive
                              ? "bg-secondary text-primary"
                              : "bg-border text-muted-foreground",
                          )}
                        >
                          {customer.name
                            .split(" ")
                            .map((part) => part[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase()}
                        </div>
                        <div>
                          <span className="font-bold text-foreground text-sm block">
                            {customer.name}
                          </span>
                          <span className="text-muted-foreground text-xs flex items-center gap-1 mt-0.5">
                            <Mail className="size-3 text-muted-foreground shrink-0" />
                            {customer.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-foreground/80 font-mono text-[11px]">
                          <FileText className="size-3 text-muted-foreground shrink-0" />
                          {customer.cpf ? (
                            formatCPF(customer.cpf)
                          ) : (
                            <span className="text-muted-foreground italic font-sans">
                              Sem CPF
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-foreground/70">
                          <Phone className="size-3 text-muted-foreground shrink-0" />
                          {customer.phone ? (
                            <a
                              href={`https://wa.me/55${cleanPhone}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1"
                              title="Abrir conversa no WhatsApp"
                            >
                              {formatCellphone(customer.phone)}
                              <MessageCircle className="size-2.5 text-emerald-600" />
                            </a>
                          ) : (
                            <span className="text-muted-foreground italic">
                              Sem telefone
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1 items-start">
                        {hasWhatsapp ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <MessageCircle className="size-2.5" /> WhatsApp
                            Ativo
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-muted text-muted-foreground">
                            <XCircle className="size-2.5" /> WhatsApp Inativo
                          </span>
                        )}

                        {hasEmail ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
                            <Mail className="size-2.5" /> E-mail Ativo
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-muted text-muted-foreground">
                            <XCircle className="size-2.5" /> E-mail Inativo
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => onOpenDetails(customer)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-black bg-muted hover:bg-secondary/20 hover:text-primary transition text-foreground/80 cursor-pointer"
                        title="Clique para ver o histórico de viagens"
                      >
                        <Plane className="size-3 text-secondary" />
                        <span>{customer.totalBookings || 0}</span>
                      </button>
                    </td>

                    <td className="py-4 px-4">
                      {isActive ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Ativo
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-muted text-muted-foreground border border-border">
                          <span className="size-1.5 rounded-full bg-muted-foreground/50" />
                          Inativo
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => onToggleStatus(customer)}
                        className={cn(
                          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden",
                          isActive ? "bg-emerald-600" : "bg-border",
                        )}
                        title={
                          isActive
                            ? "Clique para desativar este cliente"
                            : "Clique para ativar este cliente"
                        }
                      >
                        <span
                          className={cn(
                            "pointer-events-none inline-block size-5 transform rounded-full bg-card  ring-0 transition duration-200 ease-in-out",
                            isActive ? "translate-x-5" : "translate-x-0",
                          )}
                        />
                      </button>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => onOpenDetails(customer)}
                          className="p-1.5 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition cursor-pointer"
                          title="Ver detalhes e reservas"
                        >
                          <Eye className="size-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => onEdit(customer)}
                          className="p-1.5 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition cursor-pointer"
                          title="Editar dados cadastrais"
                        >
                          <Edit2 className="size-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => onDelete(customer)}
                          className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/20 rounded-lg transition cursor-pointer"
                          title="Remover cliente"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
