"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useConfirm } from "@/components/shared/confirm-dialog-provider";
import { DestinationItem } from "@/types/destination";
import { useDestinationStore } from "@/stores/destination-store";

export function useDestinos() {
  const { confirm } = useConfirm();
  const {
    destinations,
    fetchDestinations,
    deleteDestination,
  } = useDestinationStore();

  const [mounted, setMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDestination, setEditingDestination] =
    useState<DestinationItem | null>(null);

  useEffect(() => {
    setMounted(true);
    fetchDestinations();
  }, [fetchDestinations]);

  const handleOpenNew = () => {
    setEditingDestination(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (destination: DestinationItem) => {
    setEditingDestination(destination);
    setModalOpen(true);
  };

  const handleDelete = async (destination: DestinationItem) => {
    const confirmed = await confirm({
      title: "Excluir Destino",
      description: `Tem certeza que deseja excluir o destino "${destination.title}"? Esta ação não pode ser desfeita.`,
      confirmText: "Excluir",
      cancelText: "Cancelar",
      variant: "destructive",
      icon: "trash",
    });
    if (!confirmed) return;

    await deleteDestination(destination.id);
    toast.success("Destino excluído com sucesso!");
  };

  return {
    mounted,
    destinations,
    modalOpen,
    editingDestination,
    onOpenChange: setModalOpen,
    onOpenNew: handleOpenNew,
    onOpenEdit: handleOpenEdit,
    onDelete: handleDelete,
  };
}
