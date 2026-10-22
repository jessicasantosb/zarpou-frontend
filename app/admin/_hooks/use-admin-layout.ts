"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  LayoutDashboard,
  Sparkles,
  Tag,
  Ticket,
  Hotel,
  Plane,
  Compass,
  CalendarCheck,
  Settings,
  Users,
  ShieldCheck,
} from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import { canAccessAdminScreen } from "@/lib/admin-access";

const ADMIN_MENU_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    roles: ["admin", "gestor", "atendente"],
  },
  {
    id: "hero",
    label: "Hero & Banner Principal",
    href: "/admin/hero",
    icon: Sparkles,
    roles: ["admin", "gestor"],
  },
  {
    id: "promocoes",
    label: "Promoções & Banners",
    href: "/admin/promocoes",
    icon: Tag,
    roles: ["admin", "gestor"],
  },
  {
    id: "cupons",
    label: "Cupons de Desconto",
    href: "/admin/cupons",
    icon: Ticket,
    roles: ["admin", "gestor"],
  },
  {
    id: "hospedagens",
    label: "Hospede-se com Estilo",
    href: "/admin/hospedagens",
    icon: Hotel,
    roles: ["admin", "gestor", "atendente"],
  },
  {
    id: "passagens",
    label: "Passagens para o Exterior",
    href: "/admin/passagens",
    icon: Plane,
    roles: ["admin", "gestor", "atendente"],
  },
  {
    id: "destinos",
    label: "Destinos",
    href: "/admin/destinos",
    icon: Compass,
    roles: ["admin", "gestor", "atendente"],
  },
  {
    id: "reservas",
    label: "Reservas & Pedidos",
    href: "/admin/reservas",
    icon: CalendarCheck,
    roles: ["admin", "gestor", "atendente"],
  },
  {
    id: "usuarios",
    label: "Clientes",
    href: "/admin/usuarios",
    icon: Users,
    roles: ["admin", "gestor", "atendente"],
  },
  {
    id: "administradores",
    label: "Administradores",
    href: "/admin/administradores",
    icon: ShieldCheck,
    roles: ["admin"],
  },
  {
    id: "configuracoes",
    label: "Configurações Gerais",
    href: "/admin/configuracoes",
    icon: Settings,
    roles: ["admin"],
  },
];

export type AdminMenuItem = (typeof ADMIN_MENU_ITEMS)[number];

export function useAdminLayout() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);

  const userRole = (user?.role || "admin").toLowerCase();
  const isSuperAdmin = userRole === "admin";
  const isLoginPage = pathname === "/admin/login";

  const checkScreenAccess = useCallback(
    (screenId: string): boolean => {
      const item = ADMIN_MENU_ITEMS.find((m) => m.id === screenId);
      return canAccessAdminScreen(user, screenId, item?.roles);
    },
    [user]
  );

  const filteredMenuItems = useMemo(() => {
    return ADMIN_MENU_ITEMS.filter((item) => checkScreenAccess(item.id));
  }, [checkScreenAccess]);

  const defaultAllowedHref = useMemo(() => {
    const firstAllowed = filteredMenuItems[0];
    return firstAllowed ? firstAllowed.href : "/admin/dashboard";
  }, [filteredMenuItems]);

  const isCurrentRouteAllowed = useMemo(() => {
    if (isLoginPage) return true;
    if (!isAuthenticated) return false;
    if (pathname === "/admin" || pathname === "/admin/") return false;

    const currentItem = ADMIN_MENU_ITEMS.find((item) => pathname.startsWith(item.href));
    if (currentItem) {
      return checkScreenAccess(currentItem.id);
    }
    if (pathname.startsWith("/admin/produtos")) {
      return checkScreenAccess("hospedagens") || checkScreenAccess("passagens");
    }
    return isSuperAdmin;
  }, [isLoginPage, isAuthenticated, pathname, checkScreenAccess, isSuperAdmin]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsPageTransitioning(false);
  }, [pathname]);

  const handleNavClick = (href: string) => {
    if (href !== pathname) {
      setIsPageTransitioning(true);
    }
  };

  useEffect(() => {
    if (mounted && !isAuthenticated && !isLoginPage) {
      router.replace("/admin/login");
    }
  }, [mounted, isAuthenticated, isLoginPage, router]);

  useEffect(() => {
    if (mounted && isAuthenticated && !isLoginPage && !isCurrentRouteAllowed) {
      if (pathname !== "/admin" && pathname !== "/admin/") {
        toast.warning("Você não possui permissão para acessar esta tela.");
      }
      router.replace(defaultAllowedHref);
    }
  }, [mounted, isAuthenticated, isLoginPage, isCurrentRouteAllowed, pathname, defaultAllowedHref, router]);

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  const userName = user?.name || "Administrador";

  return {
    pathname,
    isAuthenticated,
    isLoginPage,
    mounted,
    isCurrentRouteAllowed,
    isPageTransitioning,
    filteredMenuItems,
    userRole,
    userName,
    mobileMenuOpen,
    setMobileMenuOpen,
    handleNavClick,
    handleLogout,
  };
}
