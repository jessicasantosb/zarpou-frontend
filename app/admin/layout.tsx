"use client";

import { useAdminLayout } from "./_hooks/use-admin-layout";
import { useAdminSecurity } from "./_hooks/use-admin-security";
import { AdminAccessDenied } from "./_components/admin-access-denied";
import { AdminFullscreenLoading } from "./_components/admin-fullscreen-loading";
import { AdminMobileNav } from "./_components/admin-mobile-nav";
import { AdminPageTransitionOverlay } from "./_components/admin-page-transition-overlay";
import { AdminSecurityModal } from "./_components/admin-security-modal";
import { AdminSidebar } from "./_components/admin-sidebar";
import { AdminTopbar } from "./_components/admin-topbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
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
  } = useAdminLayout();
  const security = useAdminSecurity();

  const openSecurity = () => security.setIsPasswordModalOpen(true);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!mounted) {
    return (
      <AdminFullscreenLoading
        title="Carregando Painel Zarpou..."
        subtitle="Validando credenciais administrativas..."
      />
    );
  }

  if (!isAuthenticated) {
    return (
      <AdminFullscreenLoading
        title="Redirecionando para Login..."
        subtitle="Acesso restrito à equipe Zarpou"
      />
    );
  }

  return (
    <div className="min-h-screen md:h-screen md:overflow-hidden bg-muted flex flex-col md:flex-row">
      <AdminSidebar
        items={filteredMenuItems}
        pathname={pathname}
        onNavClick={handleNavClick}
        onLogout={handleLogout}
        onOpenSecurity={openSecurity}
      />

      <AdminMobileNav
        items={filteredMenuItems}
        pathname={pathname}
        open={mobileMenuOpen}
        onToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        onClose={() => setMobileMenuOpen(false)}
        onNavClick={handleNavClick}
        onOpenSecurity={openSecurity}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col min-w-0 md:h-screen md:overflow-hidden">
        <AdminTopbar
          userName={userName}
          userRole={userRole}
          onOpenSecurity={openSecurity}
        />

        <main className="p-6 md:p-8 flex-1 overflow-y-auto relative">
          {!isCurrentRouteAllowed ? <AdminAccessDenied /> : children}

          {isPageTransitioning && <AdminPageTransitionOverlay />}
        </main>
      </div>

      {security.isPasswordModalOpen && <AdminSecurityModal security={security} />}
    </div>
  );
}
