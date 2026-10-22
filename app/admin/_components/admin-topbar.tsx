import { ShieldCheck } from "lucide-react";

interface AdminTopbarProps {
  userName: string;
  userRole: string;
  onOpenSecurity: () => void;
}

export function AdminTopbar({ userName, userRole, onOpenSecurity }: AdminTopbarProps) {
  return (
    <header className="bg-card border-b border-border px-8 py-4 hidden md:flex items-center justify-between shrink-0">
      <div className="text-xs font-semibold text-muted-foreground">
        Painel de Gestão da Agência
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenSecurity}
          className="text-xs font-bold text-foreground/70 hover:text-primary hover:bg-muted px-3 py-1.5 rounded-lg border border-border flex items-center gap-1.5 transition cursor-pointer mr-2"
          title="Configurações de segurança e acesso"
        >
          <ShieldCheck className="size-3.5 text-secondary" />
          <span>Segurança</span>
        </button>

        <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs font-bold text-foreground">{userName}</span>
        <span
          className={`text-[10px] px-2.5 py-0.5 rounded-md font-bold tracking-wide ${
            userRole === "admin"
              ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
              : userRole === "personalizado"
              ? "bg-sky-50 text-sky-700 border border-sky-200"
              : userRole === "gestor"
              ? "bg-cyan-50 text-cyan-700 border border-cyan-200"
              : "bg-emerald-50 text-emerald-700 border border-emerald-200"
          }`}
        >
          {userRole === "admin"
            ? "Admin Geral"
            : userRole === "personalizado"
            ? "Personalizado"
            : userRole === "gestor"
            ? "Gestor"
            : "Atendente"}
        </span>
      </div>
    </header>
  );
}
