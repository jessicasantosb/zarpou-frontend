"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useConfirm } from "@/components/shared/confirm-dialog-provider";
import { api } from "@/lib/api";
import { useDestinationStore } from "@/stores/destination-store";
import { useProductStore } from "@/stores/product-store";
import { usePromotionStore } from "@/stores/promotion-store";
import { Promotion } from "@/types/promotion";

export function usePromocoes() {
  const { confirm } = useConfirm();
  const {
    promotions,
    fetchPromotions,
    deletePromotion,
    togglePromotionActive,
    markNotificationSent,
    resetPromotions,
  } = usePromotionStore();

  const { hotels, flights, fetchHotels, fetchFlights } = useProductStore();
  const { destinations, fetchDestinations } = useDestinationStore();

  const [mounted, setMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState<Promotion | null>(null);

  useEffect(() => {
    setMounted(true);
    fetchPromotions();
    if (hotels.length === 0) fetchHotels();
    if (flights.length === 0) fetchFlights();
    if (destinations.length === 0) fetchDestinations();
  }, [
    fetchPromotions,
    fetchHotels,
    fetchFlights,
    fetchDestinations,
    hotels.length,
    flights.length,
    destinations.length,
  ]);

  const handleOpenNew = () => {
    setEditingPromo(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (promo: Promotion) => {
    setEditingPromo(promo);
    setModalOpen(true);
  };

  const handleToggleActive = async (promo: Promotion) => {
    await togglePromotionActive(promo.id);
  };

  const handleNotifySubscribers = async (promo: Promotion) => {
    if (promo.notificationSent) {
      toast.warn(
        "A notificação desta promoção já foi disparada anteriormente e só pode ser enviada uma única vez.",
      );
      return;
    }

    markNotificationSent(promo.id);

    await api.post(`/promotions/${promo.id}/notify`).catch(() => {});

    toast.success(
      `Notificação da promoção "${promo.title}" disparada para viajantes cadastrados (WhatsApp e E-mail)!`,
    );
  };

  const handleDelete = async (promo: Promotion) => {
    const confirmed = await confirm({
      title: "Excluir Promoção",
      description: `Tem certeza que deseja excluir a promoção "${promo.title}"? Esta ação não pode ser desfeita.`,
      confirmText: "Excluir",
      cancelText: "Cancelar",
      variant: "destructive",
      icon: "trash",
    });
    if (!confirmed) return;

    await deletePromotion(promo.id);
    toast.success("Promoção excluída com sucesso!");
  };

  return {
    mounted,
    promotions,
    modalOpen,
    editingPromo,
    onOpenChange: setModalOpen,
    onOpenNew: handleOpenNew,
    onOpenEdit: handleOpenEdit,
    onToggleActive: handleToggleActive,
    onNotify: handleNotifySubscribers,
    onDelete: handleDelete,
    onReset: resetPromotions,
  };
}
