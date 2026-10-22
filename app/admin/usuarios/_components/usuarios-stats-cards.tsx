import { Mail, MessageCircle, UserCheck, Users } from "lucide-react";

interface UsuariosStats {
  total: number;
  active: number;
  whatsapp: number;
  email: number;
}

interface UsuariosStatsCardsProps {
  stats: UsuariosStats;
}

export function UsuariosStatsCards({ stats }: UsuariosStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <div className="bg-card p-5 rounded-2xl border border-border shadow-2xs flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground font-semibold tracking-wide">
            Total de Clientes
          </p>
          <p className="text-2xl font-black text-foreground mt-1">
            {stats.total}
          </p>
        </div>
        <div className="p-3 bg-muted rounded-xl text-foreground/80">
          <Users className="size-5" />
        </div>
      </div>

      <div className="bg-card p-5 rounded-2xl border border-border shadow-2xs flex items-center justify-between">
        <div>
          <p className="text-xs text-emerald-600 font-semibold tracking-wide">
            Clientes Ativos
          </p>
          <p className="text-2xl font-black text-emerald-700 mt-1">
            {stats.active}
          </p>
        </div>
        <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
          <UserCheck className="size-5" />
        </div>
      </div>

      <div className="bg-card p-5 rounded-2xl border border-border shadow-2xs flex items-center justify-between">
        <div>
          <p className="text-xs text-emerald-600 font-semibold tracking-wide">
            Inscritos no WhatsApp
          </p>
          <p className="text-2xl font-black text-emerald-700 mt-1">
            {stats.whatsapp}
          </p>
        </div>
        <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
          <MessageCircle className="size-5" />
        </div>
      </div>

      <div className="bg-card p-5 rounded-2xl border border-border shadow-2xs flex items-center justify-between">
        <div>
          <p className="text-xs text-primary/80 font-semibold tracking-wide">
            Inscritos no E-mail
          </p>
          <p className="text-2xl font-black text-primary mt-1">
            {stats.email}
          </p>
        </div>
        <div className="p-3 bg-primary/10 rounded-xl text-primary">
          <Mail className="size-5" />
        </div>
      </div>
    </div>
  );
}
