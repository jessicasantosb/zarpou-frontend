"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useConfirm } from "@/components/shared/confirm-dialog-provider";
import { Flight } from "@/types/product";
import { useProductStore } from "@/stores/product-store";

export function usePassagens() {
  const { confirm } = useConfirm();
  const { flights, fetchFlights, deleteFlight } =
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
    onDelete: handleDelete,
  };
}
