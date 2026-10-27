"use client";

import { CustomerDetailsDialog } from "./_components/customer-details-dialog";
import { CustomerFormDialog } from "./_components/customer-form-dialog";
import { CustomersTable } from "./_components/customers-table";
import { UsuariosFilters } from "./_components/usuarios-filters";
import { UsuariosHeader } from "./_components/usuarios-header";
import { UsuariosStatsCards } from "./_components/usuarios-stats-cards";
import { useUsuarios } from "./_hooks/use-usuarios";

export default function UsuariosAdminPage() {
  const {
    mounted,
    searchTerm,
    statusFilter,
    channelFilter,
    onSearchChange,
    onStatusFilterChange,
    onChannelFilterChange,
    filteredCustomers,
    stats,
    isFormModalOpen,
    editingCustomer,
    selectedCustomerDetails,
    isLoadingDetails,
    onOpenChangeForm,
    onOpenCreate,
    onOpenEdit,
    onOpenDetails,
    onToggleStatus,
    onDelete,
    onCloseDetails,
  } = useUsuarios();

  if (!mounted) {
    return (
      <div className="p-8 text-center text-muted-foreground text-xs">
        Carregando base de clientes...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl pb-16">
      <UsuariosHeader onCreate={onOpenCreate} />

      <UsuariosStatsCards stats={stats} />

      <UsuariosFilters
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        channelFilter={channelFilter}
        onSearchChange={onSearchChange}
        onStatusFilterChange={onStatusFilterChange}
        onChannelFilterChange={onChannelFilterChange}
      />

      <CustomersTable
        customers={filteredCustomers}
        onOpenDetails={onOpenDetails}
        onEdit={onOpenEdit}
        onDelete={onDelete}
        onToggleStatus={onToggleStatus}
      />

      {isFormModalOpen && (
        <CustomerFormDialog
          key={editingCustomer?.id ?? "novo-cliente"}
          open={isFormModalOpen}
          onOpenChange={onOpenChangeForm}
          customer={editingCustomer}
        />
      )}

      {selectedCustomerDetails && (
        <CustomerDetailsDialog
          key={selectedCustomerDetails.id}
          customer={selectedCustomerDetails}
          loading={isLoadingDetails}
          onClose={onCloseDetails}
        />
      )}
    </div>
  );
}
