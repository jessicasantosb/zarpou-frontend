"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useConfirm } from "@/components/shared/confirm-dialog-provider";
import { api } from "@/lib/api";
import { useCouponStore } from "@/stores/coupon-store";
import { Coupon } from "@/types/coupon";

export function useCupons() {
  const { confirm } = useConfirm();
  const {
    coupons,
    isLoading,
    fetchCoupons,
    deleteCoupon,
    toggleCouponActive,
    markNotificationSent,
    resetCoupons,
  } = useCouponStore();

  const [mounted, setMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setMounted(true);
    fetchCoupons();
  }, [fetchCoupons]);

  const filteredCoupons = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return coupons;
    return coupons.filter(
      (coupon) =>
        coupon.code.toLowerCase().includes(term) ||
        (coupon.description || "").toLowerCase().includes(term),
    );
  }, [coupons, search]);

  const handleOpenNew = () => {
    setEditingCoupon(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setModalOpen(true);
  };

  const handleToggleActive = async (coupon: Coupon) => {
    await toggleCouponActive(coupon.id);
    toast.success(
      coupon.active
        ? `Cupom ${coupon.code} desativado.`
        : `Cupom ${coupon.code} ativado.`,
    );
  };

  const handleNotify = async (coupon: Coupon) => {
    if (!coupon.active) {
      toast.warning("Ative o cupom antes de enviar a notificação.");
      return;
    }

    if (coupon.notificationSent) {
      const confirmed = await confirm({
        title: "Reenviar notificação",
        description: `A notificação do cupom "${coupon.code}" já foi enviada anteriormente. Deseja disparar novamente para os clientes inscritos (WhatsApp e E-mail)?`,
        confirmText: "Reenviar",
        cancelText: "Cancelar",
        icon: "question",
      });
      if (!confirmed) return;

      markNotificationSent(coupon.id);
      await api.post(`/coupons/${coupon.id}/notify?force=true`).catch(() => {});
      toast.success(`Notificação do cupom ${coupon.code} reenviada!`);
      return;
    }

    markNotificationSent(coupon.id);
    await api.post(`/coupons/${coupon.id}/notify`).catch(() => {});
    toast.success(
      `Notificação do cupom ${coupon.code} disparada para viajantes cadastrados (WhatsApp e E-mail)!`,
    );
  };

  const handleDelete = async (coupon: Coupon) => {
    const confirmed = await confirm({
      title: "Excluir Cupom",
      description: `Tem certeza que deseja excluir o cupom "${coupon.code}"? Reservas que já utilizaram o cupom não são afetadas.`,
      confirmText: "Excluir",
      cancelText: "Cancelar",
      variant: "destructive",
      icon: "trash",
    });
    if (!confirmed) return;

    await deleteCoupon(coupon.id);
    toast.success("Cupom excluído com sucesso!");
  };

  return {
    mounted,
    isLoading,
    coupons: filteredCoupons,
    totalCoupons: coupons.length,
    search,
    onSearchChange: setSearch,
    modalOpen,
    editingCoupon,
    onOpenChange: setModalOpen,
    onOpenNew: handleOpenNew,
    onOpenEdit: handleOpenEdit,
    onToggleActive: handleToggleActive,
    onNotify: handleNotify,
    onDelete: handleDelete,
    onReset: resetCoupons,
  };
}
