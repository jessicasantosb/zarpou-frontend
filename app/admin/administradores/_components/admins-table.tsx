import {
  Crown,
  Edit2,
  Layers,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  Trash2,
} from "lucide-react";
import { AVAILABLE_ADMIN_SCREENS, AdminUser } from "@/types/user";
import { getAdminScreens, isGeneralAdminUser } from "@/lib/admin-access";

interface AdminsTableProps {
  admins: AdminUser[];
  isSuperAdmin: boolean;
  isSelf: (admin: AdminUser) => boolean;
  onEdit: (admin: AdminUser) => void;
  onDelete: (admin: AdminUser) => void;
  onToggleStatus: (admin: AdminUser) => void;
}

const getScreenNames = (screens: string[]) =>
  screens
    .map(
      (id) =>
        AVAILABLE_ADMIN_SCREENS.find((screen) => screen.id === id)?.name || id,
    )
    .join(", ");

export function AdminsTable({
  admins,
  isSuperAdmin,
  isSelf,
  onEdit,
  onDelete,
  onToggleStatus,
}: AdminsTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card ">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-foreground/70">
          <thead className="border-b border-border bg-muted text-[11px] font-black tracking-wide text-muted-foreground">
            <tr>
              <th className="px-6 py-3.5">Administrador / Colaborador</th>
              <th className="px-4 py-3.5">Nível de Acesso</th>
              <th className="px-4 py-3.5">Telas com Acesso</th>
              <th className="px-4 py-3.5">Segurança 2FA</th>
              <th className="px-4 py-3.5">Status da Conta</th>
              <th className="px-4 py-3.5 text-center">Ativar / Desativar</th>
              <th className="px-6 py-3.5 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {admins.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-muted-foreground">
                  Nenhum administrador encontrado com os filtros selecionados.
                </td>
              </tr>
            ) : (
              admins.map((admin) => {
                const selfUser = isSelf(admin);
                const isGeneral = isGeneralAdminUser(admin);
                const screens = getAdminScreens(admin);

                return (
                  <tr
                    key={admin.id}
                    className={`transition hover:bg-muted/70 ${
                      selfUser ? "bg-amber-50/20" : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                            admin.isActive
                              ? "bg-primary text-white"
                              : "bg-border text-muted-foreground"
                          }`}
                        >
                          {admin.name
                            .split(" ")
                            .map((part) => part[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-foreground">
                              {admin.name}
                            </span>
                            {selfUser && (
                              <span className="inline-flex items-center gap-1 rounded-full border border-amber-300 bg-amber-100 px-2 py-0.5 text-[10px] font-black text-amber-900">
                                <Sparkles className="size-2.5 text-amber-600" />
                                Você (Sessão Atual)
                              </span>
                            )}
                          </div>
                          <span className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                            <Mail className="size-3 text-muted-foreground" />
                            {admin.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      {isGeneral ? (
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-300 bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-900">
                          <Crown className="size-3 text-amber-600" />
                          Administrador Geral
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted px-2.5 py-1 text-[11px] font-bold text-foreground/80">
                          <Layers className="size-3 text-muted-foreground" />
                          Personalizado
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-4">
                      {isGeneral ? (
                        <span className="inline-flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                          Todas as {AVAILABLE_ADMIN_SCREENS.length} telas
                          liberadas
                        </span>
                      ) : screens.length > 0 ? (
                        <div className="flex max-w-[200px] flex-col gap-1">
                          <span
                            className="inline-flex w-fit items-center gap-1 rounded-md border border-primary/20 bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary"
                            title={screens.join(", ")}
                          >
                            {screens.length} de{" "}
                            {AVAILABLE_ADMIN_SCREENS.length} telas liberadas
                          </span>
                          <span
                            className="truncate text-[10px] text-muted-foreground"
                            title={getScreenNames(screens)}
                          >
                            {getScreenNames(screens)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[11px] font-medium text-muted-foreground">
                          Nenhuma tela definida
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-4">
                      {admin.twoFactorEnabled ? (
                        <div className="flex flex-col gap-0.5">
                          <span className="inline-flex w-fit items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                            <ShieldCheck className="size-3 text-emerald-600" />
                            Ativo
                          </span>
                          <span className="text-[10px] font-medium text-muted-foreground">
                            {admin.twoFactorMethod === "authenticator"
                              ? "📱 App Authenticator"
                              : "✉️ Código por E-mail"}
                          </span>
                        </div>
                      ) : (
                        <span className="inline-flex items-center rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                          Desativado
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-4">
                      {admin.isActive ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                          <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
                          Ativo
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-2.5 py-1 text-[11px] font-bold text-muted-foreground">
                          <span className="size-1.5 rounded-full bg-muted-foreground/50" />
                          Inativo
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-4 text-center">
                      {selfUser ? (
                        <div
                          className="inline-flex cursor-not-allowed items-center gap-1 rounded-lg border border-border bg-muted px-2.5 py-1 text-[10px] font-semibold text-muted-foreground"
                          title="Você não pode desativar seu próprio usuário de acesso ao sistema."
                        >
                          <Lock className="size-3 text-muted-foreground" />
                          Bloqueado (Sua Conta)
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onToggleStatus(admin)}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                            admin.isActive ? "bg-emerald-600" : "bg-border"
                          }`}
                          title={
                            admin.isActive
                              ? "Clique para desativar este administrador"
                              : "Clique para ativar este administrador"
                          }
                        >
                          <span
                            className={`pointer-events-none inline-block size-5 transform rounded-full bg-card  ring-0 transition duration-200 ease-in-out ${
                              admin.isActive ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </button>
                      )}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {!isSuperAdmin && isGeneral ? (
                          <span
                            className="cursor-not-allowed p-1.5 text-muted-foreground/60"
                            title="Apenas Administrador Geral pode alterar dados de outro Administrador Geral"
                          >
                            <Lock className="size-4" />
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => onEdit(admin)}
                            className="cursor-pointer rounded-lg p-1.5 text-muted-foreground transition hover:bg-muted hover:text-primary"
                            title="Editar dados do administrador"
                          >
                            <Edit2 className="size-4" />
                          </button>
                        )}

                        {selfUser || (!isSuperAdmin && isGeneral) ? (
                          <span
                            className="cursor-not-allowed p-1.5 text-muted-foreground/60"
                            title={
                              selfUser
                                ? "Você não pode excluir sua própria conta"
                                : "Apenas Administrador Geral pode remover outro Administrador Geral"
                            }
                          >
                            <Trash2 className="size-4" />
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => onDelete(admin)}
                            className="cursor-pointer rounded-lg p-1.5 text-muted-foreground transition hover:bg-destructive/20 hover:text-destructive"
                            title="Remover administrador"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        )}
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
