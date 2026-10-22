"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useConfirm } from "@/components/shared/confirm-dialog-provider";
import { Hotel } from "@/types/product";
import { useProductStore } from "@/stores/product-store";

export function useHospedagens() {
  const { confirm } = useConfirm();
  const { hotels, fetchHotels, deleteHotel, resetCatalog } = useProductStore();

  const [mounted, setMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);

  useEffect(() => {
    setMounted(true);
    if (hotels.length === 0) {
      fetchHotels();
    }
  }, [hotels.length, fetchHotels]);

  const handleOpenNew = () => {
    setEditingHotel(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (hotel: Hotel) => {
    setEditingHotel(hotel);
    setModalOpen(true);
  };

  const handleRestore = async () => {
    const confirmed = await confirm({
      title: "Restaurar Hospedagens Padrão",
      description:
        "Deseja restaurar a lista original de hotéis e hospedagens da Zarpou?",
      confirmText: "Restaurar",
      cancelText: "Cancelar",
      variant: "warning",
      icon: "warning",
    });
    if (!confirmed) return;

    resetCatalog();
    toast.info("Catálogo de hospedagens restaurado com sucesso!");
  };

  const handleDelete = async (hotel: Hotel) => {
    const confirmed = await confirm({
      title: "Excluir Hospedagem",
      description: `Tem certeza que deseja excluir o hotel "${hotel.name}"? Esta ação não pode ser desfeita.`,
      confirmText: "Excluir",
      cancelText: "Cancelar",
      variant: "destructive",
      icon: "trash",
    });
    if (!confirmed) return;

    await deleteHotel(hotel.id);
    toast.success("Hospedagem excluída com sucesso!");
  };

  return {
    mounted,
    hotels,
    modalOpen,
    editingHotel,
    onOpenChange: setModalOpen,
    onOpenNew: handleOpenNew,
    onOpenEdit: handleOpenEdit,
    onRestore: handleRestore,
    onDelete: handleDelete,
  };
}
