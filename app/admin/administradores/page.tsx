"use client";

import { AccessNotice } from "./_components/access-notice";
import { AdminFormDialog } from "./_components/admin-form-dialog";
import { AdminsHeader } from "./_components/admins-header";
import { AdminsStats } from "./_components/admins-stats";
import { AdminsTable } from "./_components/admins-table";
import { AdminsToolbar } from "./_components/admins-toolbar";
import { useAdmins } from "./_hooks/use-admins";

export default function AdministradoresAdminPage() {
  const {
    mounted,
    searchTerm,
    setSearchTerm,
    accessFilter,
    setAccessFilter,
    statusFilter,
    setStatusFilter,
    isFormOpen,
    setIsFormOpen,
    editingAdmin,
    isSuperAdmin,
    isSelf,
    filteredAdmins,
    stats,
    onCreate,
    onEdit,
    onDelete,
    onToggleStatus,
    onResetDefaults,
  } = useAdmins();

  if (!mounted) {
    return (
      <div className="p-8 text-center text-muted-foreground text-xs">
        Carregando administradores do sistema...
      </div>
    );
  }

  return (
    <div className="max-w-7xl space-y-6 pb-16">
      <AdminsHeader onResetDefaults={onResetDefaults} onCreate={onCreate} />

      <AccessNotice />

      <AdminsStats stats={stats} />

      <AdminsToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        accessFilter={accessFilter}
        onAccessFilterChange={setAccessFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      <AdminsTable
        admins={filteredAdmins}
        isSuperAdmin={isSuperAdmin}
        isSelf={isSelf}
        onEdit={onEdit}
        onDelete={onDelete}
        onToggleStatus={onToggleStatus}
      />

      {isFormOpen && (
        <AdminFormDialog
          key={editingAdmin?.id ?? "novo-administrador"}
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          admin={editingAdmin}
          isSuperAdmin={isSuperAdmin}
        />
      )}
    </div>
  );
}
