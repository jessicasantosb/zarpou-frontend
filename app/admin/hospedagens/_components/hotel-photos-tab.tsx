import { useState } from "react";
import { useWatch, type UseFormReturn } from "react-hook-form";
import Image from "next/image";
import { Image as ImageIcon, X } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ImageUploader } from "@/app/admin/_components/image-uploader";
import type { HotelFormValues } from "@/schemas/hotel-form";

interface HotelPhotosTabProps {
  form: UseFormReturn<HotelFormValues>;
}

export function HotelPhotosTab({ form }: HotelPhotosTabProps) {
  const [newGalleryPhotoUrl, setNewGalleryPhotoUrl] = useState("");
  const gallery = useWatch({ control: form.control, name: "gallery" }) ?? [];

  const handleAddGalleryPhoto = () => {
    if (!newGalleryPhotoUrl.trim()) return;
    form.setValue("gallery", [...gallery, newGalleryPhotoUrl.trim()]);
    setNewGalleryPhotoUrl("");
  };

  const handleRemoveGalleryPhoto = (index: number) => {
    form.setValue(
      "gallery",
      gallery.filter((_, idx) => idx !== index),
    );
  };

  return (
    <div className="animate-in space-y-5 fade-in duration-150">
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="space-y-1">
            <label className="block text-[11px] font-bold tracking-wide text-foreground/80">
              Descrição Completa do Hotel (&quot;Sobre a Acomodação&quot;)
            </label>
            <FormControl>
              <textarea
                rows={3}
                value={String(field.value ?? "")}
                onBlur={field.onBlur}
                onChange={(event) => field.onChange(event.target.value)}
                placeholder="Descreva a história, estrutura, lazer e diferenciais do local..."
                className="w-full resize-none rounded-xl border border-border p-3 text-xs font-medium leading-relaxed outline-hidden focus:border-primary"
              />
            </FormControl>
            <FormMessage className="text-[10px]" />
          </FormItem>
        )}
      />

      <div className="border-t border-border/60 pt-2">
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <ImageUploader
                value={field.value}
                onChange={field.onChange}
                folder="hospedagens"
                label="Foto Principal de Capa *"
                description="Imagem principal exibida nos cards da home e cabeçalho"
                aspectRatio="video"
                recommendedResolution="Recomendado 1200x800 ou 800x600"
              />
              <FormMessage className="text-[10px]" />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-3 border-t border-border/60 pt-4">
        <div>
          <h4 className="flex items-center gap-1.5 text-xs font-bold tracking-wide text-foreground">
            <ImageIcon className="size-3.5 text-primary" />
            Galeria de Fotos Extras (Página de Detalhes)
          </h4>
          <p className="text-[11px] text-muted-foreground">
            Essas fotos aparecem nas miniaturas ao lado da foto principal na
            tela /hospedagens/[id].
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="url"
            value={newGalleryPhotoUrl}
            onChange={(event) => setNewGalleryPhotoUrl(event.target.value)}
            placeholder="Cole o link da foto (URL direta: https://...)"
            className="h-9 flex-1 rounded-xl border border-border px-3 text-xs font-medium outline-hidden focus:border-primary"
          />
          <button
            type="button"
            onClick={handleAddGalleryPhoto}
            disabled={!newGalleryPhotoUrl.trim()}
            className="shrink-0 cursor-pointer rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white transition hover:bg-primary-hover disabled:opacity-40"
          >
            Adicionar Foto
          </button>
        </div>

        {gallery.length > 0 && (
          <div className="grid grid-cols-3 gap-3 pt-2 sm:grid-cols-4">
            {gallery.map((photo, index) => (
              <div
                key={index}
                className="group relative h-24 overflow-hidden rounded-xl border border-border bg-muted shadow-2xs"
              >
                <Image
                  src={photo}
                  alt={`Galeria ${index + 1}`}
                  fill
                  unoptimized={photo?.startsWith("data:")}
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveGalleryPhoto(index)}
                  className="absolute top-1 right-1 flex size-6 cursor-pointer items-center justify-center rounded-full bg-destructive/90 text-white opacity-0 transition shadow-xs group-hover:opacity-100"
                  title="Remover foto"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
