"use client";

import { CuponsHeader } from "./_components/cupons-header";
import { CouponsTable } from "./_components/coupons-table";
import { CouponFormDialog } from "./_components/coupon-form-dialog";
import { useCupons } from "./_hooks/use-cupons";

export default function CuponsPage() {
  const {
    mounted,
    isLoading,
    coupons,
    totalCoupons,
    search,
    onSearchChange,
    modalOpen,
    editingCoupon,
    onOpenChange,
    onOpenNew,
    onOpenEdit,
    onToggleActive,
    onNotify,
    onDelete,
    onReset,
  } = useCupons();

  if (!mounted) {
    return <div className="p-12 text-center text-muted-foreground">Carregando cupons...</div>;
  }

  return (
    <div className="space-y-6">
      <CuponsHeader
        search={search}
        totalCoupons={totalCoupons}
        onSearchChange={onSearchChange}
        onAddNew={onOpenNew}
        onReset={onReset}
      />

      <CouponsTable
        coupons={coupons}
        isLoading={isLoading}
        onEdit={onOpenEdit}
        onToggleActive={onToggleActive}
        onNotify={onNotify}
        onDelete={onDelete}
      />

      {modalOpen && (
        <CouponFormDialog
          key={editingCoupon?.id ?? "novo-cupom"}
          open={modalOpen}
          onOpenChange={onOpenChange}
          coupon={editingCoupon}
        />
      )}
    </div>
  );
}
