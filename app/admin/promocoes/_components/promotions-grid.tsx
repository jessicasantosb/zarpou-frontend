import { Promotion } from "@/types/promotion";
import { PromotionCard } from "./promotion-card";

interface PromotionsGridProps {
  promotions: Promotion[];
  onEdit: (promo: Promotion) => void;
  onDelete: (promo: Promotion) => void;
  onToggleActive: (promo: Promotion) => void;
  onNotify: (promo: Promotion) => void;
}

export function PromotionsGrid({
  promotions,
  onEdit,
  onDelete,
  onToggleActive,
  onNotify,
}: PromotionsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {promotions.map((promo) => (
        <PromotionCard
          key={promo.id}
          promo={promo}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleActive={onToggleActive}
          onNotify={onNotify}
        />
      ))}
    </div>
  );
}
