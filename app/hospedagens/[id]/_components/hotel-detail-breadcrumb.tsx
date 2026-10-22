import Link from "next/link";
import { ArrowLeft, Share2 } from "lucide-react";

interface HotelDetailBreadcrumbProps {
  onShare: () => void;
}

export function HotelDetailBreadcrumb({ onShare }: HotelDetailBreadcrumbProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <Link
        href="/hospedagens"
        className="inline-flex items-center gap-1.5 text-xs text-primary font-bold hover:underline"
      >
        <ArrowLeft className="size-4" />
        Voltar para a lista de hospedagens
      </Link>

      <button
        type="button"
        onClick={onShare}
        className="flex items-center gap-1.5 text-xs text-foreground/70 hover:text-primary transition font-medium"
      >
        <Share2 className="size-4" />
        Compartilhar
      </button>
    </div>
  );
}
