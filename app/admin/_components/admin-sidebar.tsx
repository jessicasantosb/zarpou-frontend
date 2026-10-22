import Link from "next/link";
import Image from "next/image";
import { Globe, ShieldCheck, LogOut } from "lucide-react";
import type { AdminMenuItem } from "../_hooks/use-admin-layout";

interface AdminSidebarProps {
  items: AdminMenuItem[];
  pathname: string;
  onNavClick: (href: string) => void;
  onLogout: () => void;
  onOpenSecurity: () => void;
}

export function AdminSidebar({
  items,
  pathname,
  onNavClick,
  onLogout,
  onOpenSecurity,
}: AdminSidebarProps) {
  return (
    <aside className="hidden md:flex w-64 h-screen bg-surface-dark text-white flex-col justify-between shrink-0 border-r border-white/10 select-none">
      <div className="flex flex-col min-h-0 flex-1">
        <div className="p-6 border-b border-white/10 flex items-center gap-3 shrink-0">
          <div className="relative size-9">
            <Image
              src="/logo/logo.svg"
              alt="Zarpou"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <h2 className="text-base font-black text-white">Zarpou Admin</h2>
            <span className="text-[10px] font-semibold text-secondary tracking-wide">
              Painel da Agência
            </span>
          </div>
        </div>

        <nav className="p-4 space-y-1.5 overflow-y-auto flex-1">
          {items.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onNavClick(item.href)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition ${
                  active
                    ? "bg-secondary text-primary shadow-md"
                    : "text-white/60 hover:text-white hover:bg-card/10"
                }`}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-white/10 space-y-2 shrink-0">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-white/80 hover:bg-card/10 transition"
        >
          <Globe className="size-4 text-secondary" />
          Visualizar Site
        </Link>

        <button
          type="button"
          onClick={onOpenSecurity}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-white/80 hover:bg-card/10 transition cursor-pointer"
        >
          <ShieldCheck className="size-4 text-secondary" />
          Segurança
        </button>

        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-950/40 transition cursor-pointer"
        >
          <LogOut className="size-4" />
          Encerrar Sessão
        </button>
      </div>
    </aside>
  );
}
