"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useConfirm } from "@/components/shared/confirm-dialog-provider";
import { Flight } from "@/types/product";
import { useProductStore } from "@/stores/product-store";

export function usePassagens() {
  const { confirm } = useConfirm();
  const { flights, fetchFlights, deleteFlight, resetCatalog } =
    useProductStore();

  const [mounted, setMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFlight, setEditingFlight] = useState<Flight | null>(null);

  useEffect(() => {
    setMounted(true);
    if (flights.length === 0) {
      fetchFlights();
    }
  }, [flights.length, fetchFlights]);

  const handleOpenNew = () => {
    setEditingFlight(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (flight: Flight) => {
    setEditingFlight(flight);
    setModalOpen(true);
  };

  const handleRestore = async () => {
    const confirmed = await confirm({
      title: "Restaurar Passagens Padrão",
      description:
        "Deseja restaurar a lista original de passagens aéreas da Zarpou?",
      confirmText: "Restaurar",
      cancelText: "Cancelar",
      variant: "warning",
      icon: "warning",
    });
    if (!confirmed) return;

    resetCatalog();
    toast.info("Catálogo de passagens aéreas restaurado com sucesso!");
  };

  const handleDelete = async (flight: Flight) => {
    const confirmed = await confirm({
      title: "Excluir Passagem Aérea",
      description: `Tem certeza que deseja excluir o voo para "${flight.outbound.destinationCity}"? Esta ação não pode ser desfeita.`,
      confirmText: "Excluir",
      cancelText: "Cancelar",
      variant: "destructive",
      icon: "trash",
    });
    if (!confirmed) return;

    await deleteFlight(flight.id);
    toast.success("Voo excluído com sucesso!");
  };

  return {
    mounted,
    flights,
    modalOpen,
    editingFlight,
    onOpenChange: setModalOpen,
    onOpenNew: handleOpenNew,
    onOpenEdit: handleOpenEdit,
    onRestore: handleRestore,
    onDelete: handleDelete,
  };
}
