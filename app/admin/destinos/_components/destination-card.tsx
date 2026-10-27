import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Edit2,
  ExternalLink,
  Hotel,
  Tag,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DestinationItem } from "@/types/destination";

interface DestinationCardProps {
  destination: DestinationItem;
  onEdit: (destination: DestinationItem) => void;
  onDelete: (destination: DestinationItem) => void;
}

export function DestinationCard({
  destination,
  onEdit,
  onDelete,
}: DestinationCardProps) {
  return (
    <div className="flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card  transition ">
      <div>
        <div className="relative h-44 w-full bg-muted">
          <Image
            src={destination.image_url}
            alt={destination.title}
            fill
            unoptimized={destination.image_url.startsWith("data:")}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-foreground/25" />

          <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-card/95 px-2.5 py-0.5 text-[10px] font-black text-foreground ">
            <span>{destination.flag}</span>
            <span>{destination.country}</span>
          </div>

          <div className="absolute top-3 right-3 rounded-md bg-secondary px-2 py-0.5 text-[9px] font-black tracking-wide text-primary ">
            {destination.tag}
          </div>

          <div className="absolute bottom-3 left-3 text-white">
            <h3 className="text-lg font-black leading-tight drop-shadow-xs">
              {destination.title}
            </h3>
            {destination.state && (
              <p className="text-[10px] font-medium text-white/80">
                {destination.state}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2.5 p-4">
          <p className="text-xs leading-relaxed text-foreground/70 line-clamp-2">
            {destination.description}
          </p>

          {destination.bestTimeToVisit && (
            <p className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
              <Calendar className="size-3 shrink-0 text-primary" />
              <span>{destination.bestTimeToVisit}</span>
            </p>
          )}

          <div className="flex items-center justify-between border-t border-border/60 pt-2 text-xs">
            <span className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
              <Hotel className="size-3 text-secondary" />+
              {destination.accommodationsCount} opções
            </span>
            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
              <Tag className="size-3" />A partir de R${" "}
              {destination.startingPrice}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-bold tracking-wide text-foreground/70">
              {destination.category === "national"
                ? "Nacional 🇧🇷"
                : "Internacional 🌎"}
            </span>
            {destination.highlights &&
              destination.highlights.slice(0, 2).map((highlight) => (
                <span
                  key={highlight}
                  className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary"
                >
                  {highlight}
                </span>
              ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-border/60 bg-muted/50 p-4 pt-2">
        <Link
          href={`/destinos?cidade=${encodeURIComponent(destination.title)}`}
          target="_blank"
          className="flex items-center gap-1 text-[11px] font-bold text-muted-foreground transition hover:text-primary"
          title="Visualizar este destino e seus pacotes no site do cliente"
        >
          <ExternalLink className="size-3" />
          <span>Ver no site</span>
        </Link>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onEdit(destination)}
            className="h-auto cursor-pointer rounded-lg border-border bg-card px-3 py-1.5 text-xs font-bold text-primary  hover:border-primary"
          >
            <Edit2 className="size-3.5" />
            Editar
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onDelete(destination)}
            className="h-auto cursor-pointer rounded-lg border-destructive/20 bg-destructive/10 px-3 py-1.5 text-xs font-bold text-destructive hover:bg-destructive/20 hover:text-destructive"
          >
            <Trash2 className="size-3.5" />
            Excluir
          </Button>
        </div>
      </div>
    </div>
  );
}
