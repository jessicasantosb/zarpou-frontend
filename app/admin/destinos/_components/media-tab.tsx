import Image from "next/image";
import type { UseFormReturn } from "react-hook-form";
import { Hotel, Sparkles, Tag } from "lucide-react";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { ImageUploader } from "@/app/admin/_components/image-uploader";
import {
  DESTINATION_DEFAULT_IMAGE,
  type DestinationFormValues,
} from "@/schemas/destination-form";

interface MediaTabProps {
  form: UseFormReturn<DestinationFormValues>;
}

export function MediaTab({ form }: MediaTabProps) {
  const values = form.watch();

  return (
    <div className="animate-in space-y-5 fade-in duration-150">
      <FormField
        control={form.control}
        name="image_url"
        render={({ field }) => (
          <FormItem>
            <ImageUploader
              value={field.value}
              onChange={field.onChange}
              folder="destinos"
              label="Foto Principal do Destino *"
              description="Upload direto para o Supabase Storage ou link web em alta definição"
              aspectRatio="video"
              recommendedResolution="Recomendado 1200x800 ou 800x600 em alta resolução"
            />
            <FormMessage className="text-[10px]" />
          </FormItem>
        )}
      />

      <div className="space-y-2 border-t border-border/60 pt-4">
        <p className="flex items-center gap-1.5 text-xs font-bold tracking-wide text-foreground/80">
          <Sparkles className="size-3.5 text-secondary" />
          Prévia ao Vivo do Card (Como aparecerá para o viajante)
        </p>

        <div className="mx-auto max-w-sm overflow-hidden rounded-3xl border border-border bg-card ">
          <div className="relative h-44 w-full bg-muted">
            <Image
              src={values.image_url || DESTINATION_DEFAULT_IMAGE}
              alt={values.title || "Prévia"}
              fill
              unoptimized={values.image_url.startsWith("data:")}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-foreground/25" />

            <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-card/95 px-2.5 py-0.5 text-[10px] font-black text-foreground ">
              <span>{values.flag}</span>
              <span>{values.country || "País"}</span>
            </div>

            <div className="absolute top-3 right-3 rounded-md bg-secondary px-2 py-0.5 text-[9px] font-black tracking-wide text-primary ">
              {values.tag || "Destaque"}
            </div>

            <div className="absolute bottom-3 left-3 text-white">
              <h3 className="text-lg font-black leading-tight drop-shadow-xs">
                {values.title || "Nome da Cidade"}
              </h3>
              {values.state && (
                <p className="text-[10px] font-medium text-white/80">
                  {values.state}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2.5 p-4">
            <p className="text-xs leading-relaxed text-foreground/70 line-clamp-2">
              {values.description || "Descrição curta do destino..."}
            </p>

            <div className="flex items-center justify-between border-t border-border/60 pt-2 text-xs">
              <span className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                <Hotel className="size-3 text-secondary" />+
                {values.accommodationsCount} opções
              </span>
              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                <Tag className="size-3" />A partir de R$ {values.startingPrice}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
