"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useConfirm } from "@/components/shared/confirm-dialog-provider";
import { isGeneralAdminUser } from "@/lib/admin-access";
import { useAdminUsersStore } from "@/stores/admin-users-store";
import { useAuthStore } from "@/stores/auth-store";
import { AdminUser } from "@/types/user";

export function useAdmins() {
  const router = useRouter();
  const { user: currentAdmin } = useAuthStore();
  const { confirm } = useConfirm();
  const {
    admins,
    fetchAdmins,
    toggleAdminStatus,
    deleteAdmin,
    resetToDefaults,
  } = useAdminUsersStore();

  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [accessFilter, setAccessFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<AdminUser | null>(null);

  useEffect(() => {
    setMounted(true);
    const userRole = (currentAdmin?.role || "admin").toLowerCase();
    const userAllowedScreens =
      currentAdmin?.allowedScreens || currentAdmin?.allowed_screens;
    const canAccessAdmins =
      userRole === "admin" ||
      userAllowedScreens?.includes("administradores") ||
      userAllowedScreens?.includes("*");

    if (currentAdmin && !canAccessAdmins) {
      router.push("/admin/dashboard");
      return;
    }
    fetchAdmins();
  }, [fetchAdmins, currentAdmin, router]);

  const isSuperAdmin = !currentAdmin || isGeneralAdminUser(currentAdmin);

  const isSelf = useCallback(
    (admin: AdminUser) =>
      Boolean(
        currentAdmin &&
        (admin.id === currentAdmin.id ||
          admin.email.toLowerCase() === currentAdmin.email.toLowerCase()),
      ),
    [currentAdmin],
  );

  const filteredAdmins = useMemo(
    () =>
      admins.filter((admin) => {
        const matchesSearch =
          admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          admin.email.toLowerCase().includes(searchTerm.toLowerCase());

        const isGeneral = isGeneralAdminUser(admin);
        const matchesAccess =
          accessFilter === "all" ||
          (accessFilter === "admin" && isGeneral) ||
          (accessFilter === "personalizado" && !isGeneral);

        const matchesStatus =
          statusFilter === "all" ||
          (statusFilter === "active" && admin.isActive) ||
          (statusFilter === "inactive" && !admin.isActive);

        return matchesSearch && matchesAccess && matchesStatus;
      }),
    [admins, searchTerm, accessFilter, statusFilter],
  );

  const stats = useMemo(() => {
    const total = admins.length;
    const active = admins.filter((admin) => admin.isActive).length;
    return { total, active, inactive: total - active };
  }, [admins]);

  const handleOpenCreate = useCallback(() => {
    setEditingAdmin(null);
    setIsFormOpen(true);
  }, []);

  const handleOpenEdit = useCallback(
    (admin: AdminUser) => {
      if (!isSuperAdmin && isGeneralAdminUser(admin)) {
        toast.warn(
          "Apenas um Administrador Geral pode editar contas de Administrador Geral.",
        );
        return;
      }
      setEditingAdmin(admin);
      setIsFormOpen(true);
    },
    [isSuperAdmin],
  );

  const handleToggleStatus = useCallback(
    async (admin: AdminUser) => {
      if (isSelf(admin)) {
        toast.warn(
          "Você não pode desativar seu próprio usuário administrador.",
        );
        return;
      }

      const currentId = currentAdmin?.id || "adm-1";
      const result = await toggleAdminStatus(admin.id, currentId);
      if (result.success) {
        toast.success(
          result.message || "Status do administrador alterado com sucesso!",
        );
      } else {
        toast.error(result.message || "Não foi possível alterar o status.");
      }
    },
    [currentAdmin, isSelf, toggleAdminStatus],
  );

  const handleDelete = useCallback(
    async (admin: AdminUser) => {
      if (isSelf(admin)) {
        toast.warn("Você não pode excluir sua própria conta de administrador.");
        return;
      }

      if (!isSuperAdmin && isGeneralAdminUser(admin)) {
        toast.warn(
          "Apenas um Administrador Geral pode remover contas de Administrador Geral.",
        );
        return;
      }

      const confirmed = await confirm({
        title: "Remover Administrador",
        description: `Tem certeza que deseja remover o administrador "${admin.name}" (${admin.email})? Esta ação não pode ser desfeita.`,
        confirmText: "Sim, remover",
        cancelText: "Cancelar",
        variant: "destructive",
        icon: "trash",
      });

      if (!confirmed) return;

      const currentId = currentAdmin?.id || "adm-1";
      const result = await deleteAdmin(admin.id, currentId);
      if (result.success) {
        toast.success("Administrador removido com sucesso.");
      } else {
        toast.error(result.message || "Erro ao remover administrador.");
      }
    },
    [confirm, currentAdmin, deleteAdmin, isSelf, isSuperAdmin],
  );

  const handleResetDefaults = useCallback(async () => {
    const confirmed = await confirm({
      title: "Restaurar Equipe Inicial",
      description:
        "Deseja restaurar a equipe de administradores para a configuração padrão inicial da Zarpou?",
      confirmText: "Restaurar",
      cancelText: "Cancelar",
      variant: "warning",
      icon: "warning",
    });

    if (!confirmed) return;

    resetToDefaults();
    toast.success(
      "Equipe de administradores restaurada para o padrão inicial!",
    );
  }, [confirm, resetToDefaults]);

  return {
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
    onCreate: handleOpenCreate,
    onEdit: handleOpenEdit,
    onDelete: handleDelete,
    onToggleStatus: handleToggleStatus,
    onResetDefaults: handleResetDefaults,
  };
}
