import type { UseFormReturn } from "react-hook-form";
import { ImageIcon, Video } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ImageUploader } from "@/app/admin/_components/image-uploader";
import type { HeroConfigFormValues } from "@/schemas/hero-config";
import { cn } from "@/lib/utils";
import { HeroField } from "./hero-field";
import { HeroSectionCard } from "./hero-section-card";

interface HeroBackgroundSectionProps {
  form: UseFormReturn<HeroConfigFormValues>;
}

export function HeroBackgroundSection({ form }: HeroBackgroundSectionProps) {
  const bgType = form.watch("bgType");

  return (
    <HeroSectionCard
      icon={ImageIcon}
      title="Mídia de Fundo do Hero (Imagem ou Vídeo)"
      headerExtra={
        <FormField
          control={form.control}
          name="bgType"
          render={({ field }) => (
            <FormItem className="gap-0">
              <FormControl>
                <div className="flex items-center gap-1 rounded-xl bg-muted p-1">
                  <button
                    type="button"
                    onClick={() => field.onChange("image")}
                    className={cn(
                      "flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition",
                      bgType === "image"
                        ? "bg-card text-primary "
                        : "text-foreground/70 hover:text-foreground",
                    )}
                  >
                    <ImageIcon className="size-3.5" />
                    Imagem de Fundo
                  </button>
                  <button
                    type="button"
                    onClick={() => field.onChange("video")}
                    className={cn(
                      "flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition",
                      bgType === "video"
                        ? "bg-card text-primary "
                        : "text-foreground/70 hover:text-foreground",
                    )}
                  >
                    <Video className="size-3.5" />
                    Vídeo de Fundo
                  </button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      }
    >
      {bgType === "image" && (
        <FormField
          control={form.control}
          name="bgImageUrl"
          render={({ field }) => (
            <FormItem>
              <ImageUploader
                value={field.value}
                onChange={(url) => {
                  field.onChange(url);
                  form.setValue("bgType", "image");
                }}
                folder="hero"
                label="Imagem de Fundo do Hero"
                description="A imagem será exibida em alta resolução na primeira dobra da página inicial."
                aspectRatio="wide"
                recommendedResolution="Recomendado 1920x1080 (16:9)"
              />
              <FormMessage className="text-[10px]" />
            </FormItem>
          )}
        />
      )}

      {bgType === "video" && (
        <HeroField
          control={form.control}
          name="bgVideoUrl"
          label="Caminho ou URL do Vídeo de Fundo"
          placeholder="/hero.mp4 ou URL de vídeo MP4"
          helper={
            <>
              Padrão:{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono">
                /hero.mp4
              </code>
              . O vídeo roda em loop silencioso de fundo.
            </>
          }
        />
      )}
    </HeroSectionCard>
  );
}
