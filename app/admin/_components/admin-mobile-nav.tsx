import Link from "next/link";
import Image from "next/image";
import { Menu, X, Globe, ShieldCheck, LogOut } from "lucide-react";
import type { AdminMenuItem } from "../_hooks/use-admin-layout";

interface AdminMobileNavProps {
  items: AdminMenuItem[];
  pathname: string;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  onNavClick: (href: string) => void;
  onOpenSecurity: () => void;
  onLogout: () => void;
}

export function AdminMobileNav({
  items,
  pathname,
  open,
  onToggle,
  onClose,
  onNavClick,
  onOpenSecurity,
  onLogout,
}: AdminMobileNavProps) {
  return (
    <>
      <header className="md:hidden bg-surface-dark text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative size-8">
            <Image
              src="/logo/logo.svg"
              alt="Zarpou"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-bold text-sm">Zarpou Admin</span>
        </div>

        <button
          type="button"
          onClick={onToggle}
          className="p-2 text-white"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </header>

      {open && (
        <div className="md:hidden bg-surface-dark text-white p-4 border-b border-white/10 space-y-2 animate-in slide-in-from-top">
          {items.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  onNavClick(item.href);
                  onClose();
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition ${
                  active
                    ? "bg-secondary text-primary"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-white/10 flex justify-between items-center">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-secondary font-bold flex items-center gap-1.5 p-2"
            >
              <Globe className="size-4" /> Ver Site
            </Link>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenSecurity();
              }}
              className="text-xs text-white/80 font-bold flex items-center gap-1.5 p-2"
            >
              <ShieldCheck className="size-4 text-secondary" /> Segurança
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="text-xs text-red-400 font-bold flex items-center gap-1.5 p-2"
            >
              <LogOut className="size-4" /> Sair
            </button>
          </div>
        </div>
      )}
    </>
  );
}
