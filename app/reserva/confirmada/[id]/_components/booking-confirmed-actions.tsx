import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BookingConfirmedActions() {
  return (
    <div className="flex items-center justify-between print:hidden">
      <Link
        href="/"
        className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
      >
        Voltar à página inicial
      </Link>

      <Link
        href="/minhas-viagens"
        className="px-6 py-3 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary/90 transition shadow-sm flex items-center gap-2"
      >
        Acessar Minhas Viagens
        <ArrowRight className="size-4 text-secondary" />
      </Link>
    </div>
  );
}
