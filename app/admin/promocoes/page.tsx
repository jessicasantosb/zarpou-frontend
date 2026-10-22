"use client";

import { PromotionFormDialog } from "./_components/promotion-form-dialog";
import { PromocoesHeader } from "./_components/promocoes-header";
import { PromotionsGrid } from "./_components/promotions-grid";
import { usePromocoes } from "./_hooks/use-promocoes";

export default function AdminPromocoesPage() {
  const {
    mounted,
    promotions,
    modalOpen,
    editingPromo,
    onOpenChange,
    onOpenNew,
    onOpenEdit,
    onToggleActive,
    onNotify,
    onDelete,
    onReset,
  } = usePromocoes();

  if (!mounted) {
    return (
      <div className="p-12 text-center text-muted-foreground text-xs">
        Carregando promoções...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PromocoesHeader onReset={onReset} onAddNew={onOpenNew} />

      <PromotionsGrid
        promotions={promotions}
        onEdit={onOpenEdit}
        onDelete={onDelete}
        onToggleActive={onToggleActive}
        onNotify={onNotify}
      />

      {modalOpen && (
        <PromotionFormDialog
          key={editingPromo?.id ?? "nova-promocao"}
          open={modalOpen}
          onOpenChange={onOpenChange}
          promo={editingPromo}
        />
      )}
    </div>
  );
}
