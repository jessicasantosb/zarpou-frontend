"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useConfirm } from "@/components/shared/confirm-dialog-provider";
import { useAdminUsersStore } from "@/stores/admin-users-store";
import { useCustomerManagementStore } from "@/stores/customer-management-store";
import { CustomerUser } from "@/types/user";

export interface CustomerBookingItem {
  id: string;
  locator_code?: string;
  booking_type?: string;
  created_at?: string;
  total_amount?: number;
  status?: string;
}

export interface CustomerDetailData extends CustomerUser {
  bookings?: CustomerBookingItem[];
}

export function useUsuarios() {
  const { confirm } = useConfirm();
  const {
    customers,
    fetchCustomers,
    toggleCustomerStatus,
    deleteCustomer,
    getCustomerDetails,
    resetToDefaults,
  } = useCustomerManagementStore();
  const { admins } = useAdminUsersStore();

  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [channelFilter, setChannelFilter] = useState<string>("all");

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<CustomerUser | null>(
    null,
  );

  const [selectedCustomerDetails, setSelectedCustomerDetails] =
    useState<CustomerDetailData | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchCustomers();
  }, [fetchCustomers]);

  const adminEmailSet = useMemo(() => {
    const emailSet = new Set(["admin@zarpou.com.br", "admin"]);
    admins.forEach((admin) =>
      emailSet.add(admin.email.trim().toLowerCase()),
    );
    return emailSet;
  }, [admins]);

  const validCustomers = useMemo(() => {
    return customers.filter(
      (customer) =>
        !adminEmailSet.has(customer.email.trim().toLowerCase()),
    );
  }, [customers, adminEmailSet]);

  const filteredCustomers = useMemo(() => {
    return validCustomers.filter((customer) => {
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        customer.name.toLowerCase().includes(term) ||
        customer.email.toLowerCase().includes(term) ||
        (customer.cpf && customer.cpf.toLowerCase().includes(term)) ||
        (customer.phone && customer.phone.toLowerCase().includes(term));

      const isActive = customer.isActive ?? true;
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && isActive) ||
        (statusFilter === "inactive" && !isActive);

      const hasWhatsapp = customer.notifications?.whatsappPromotions ?? true;
      const hasEmail = customer.notifications?.emailPromotions ?? true;

      const matchesChannel =
        channelFilter === "all" ||
        (channelFilter === "whatsapp" && hasWhatsapp) ||
        (channelFilter === "email" && hasEmail);

      return matchesSearch && matchesStatus && matchesChannel;
    });
  }, [validCustomers, searchTerm, statusFilter, channelFilter]);

  const stats = useMemo(() => {
    const total = validCustomers.length;
    const active = validCustomers.filter(
      (customer) => customer.isActive ?? true,
    ).length;
    const whatsapp = validCustomers.filter(
      (customer) => customer.notifications?.whatsappPromotions ?? true,
    ).length;
    const email = validCustomers.filter(
      (customer) => customer.notifications?.emailPromotions ?? true,
    ).length;
    return { total, active, whatsapp, email };
  }, [validCustomers]);

  const handleOpenCreateModal = () => {
    setEditingCustomer(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (customer: CustomerUser) => {
    setEditingCustomer(customer);
    setIsFormModalOpen(true);
  };

  const handleOpenDetailsModal = async (customer: CustomerUser) => {
    setIsLoadingDetails(true);
    setSelectedCustomerDetails(customer);
    const full = await getCustomerDetails(customer.id);
    setSelectedCustomerDetails(full || customer);
    setIsLoadingDetails(false);
  };

  const handleToggleStatus = async (customer: CustomerUser) => {
    const res = await toggleCustomerStatus(customer.id);
    if (res.success) {
      toast.success(res.message || "Status do cliente alterado com sucesso!");
    } else {
      toast.error(res.message || "Não foi possível alterar o status.");
    }
  };

  const handleDelete = async (customer: CustomerUser) => {
    const confirmed = await confirm({
      title: "Remover Cliente",
      description: `Tem certeza que deseja remover o cliente "${customer.name}" (${customer.email})? Esta ação não pode ser desfeita.`,
      confirmText: "Sim, remover",
      cancelText: "Cancelar",
      variant: "destructive",
      icon: "trash",
    });

    if (!confirmed) {
      return;
    }

    const res = await deleteCustomer(customer.id);
    if (res.success) {
      toast.success("Cliente removido com sucesso.");
    } else {
      toast.error(res.message || "Erro ao remover cliente.");
    }
  };

  const handleResetDefaults = async () => {
    const confirmed = await confirm({
      title: "Restaurar Clientes Padrão",
      description:
        "Deseja restaurar a base de clientes para os registros padrão iniciais da Zarpou?",
      confirmText: "Restaurar",
      cancelText: "Cancelar",
      variant: "warning",
      icon: "warning",
    });

    if (confirmed) {
      resetToDefaults();
      toast.success("Lista de clientes restaurada para o padrão inicial!");
    }
  };

  return {
    mounted,
    searchTerm,
    statusFilter,
    channelFilter,
    onSearchChange: setSearchTerm,
    onStatusFilterChange: setStatusFilter,
    onChannelFilterChange: setChannelFilter,
    filteredCustomers,
    stats,
    isFormModalOpen,
    editingCustomer,
    selectedCustomerDetails,
    isLoadingDetails,
    onOpenChangeForm: setIsFormModalOpen,
    onOpenCreate: handleOpenCreateModal,
    onOpenEdit: handleOpenEditModal,
    onOpenDetails: handleOpenDetailsModal,
    onToggleStatus: handleToggleStatus,
    onDelete: handleDelete,
    onReset: handleResetDefaults,
    onCloseDetails: () => setSelectedCustomerDetails(null),
  };
}
