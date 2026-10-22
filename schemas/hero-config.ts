import { z } from "zod";
import { HeroConfig } from "@/stores/hero-store";

export const heroConfigSchema = z.object({
  titlePrefix: z.string(),
  titleHighlight: z.string(),
  titleSuffix: z.string(),
  subtitle: z.string(),
  bgType: z.enum(["image", "video"]),
  bgImageUrl: z.string(),
  bgVideoUrl: z.string(),
  ctaText: z.string(),
  ctaLink: z.string(),
});

export type HeroConfigFormValues = z.infer<typeof heroConfigSchema>;

export const buildHeroConfigDefaults = (
  hero: HeroConfig,
): HeroConfigFormValues => ({
  titlePrefix: hero.titlePrefix ?? "",
  titleHighlight: hero.titleHighlight ?? "",
  titleSuffix: hero.titleSuffix ?? "",
  subtitle: hero.subtitle ?? "",
  bgType: hero.bgType ?? "video",
  bgImageUrl: hero.bgImageUrl ?? "",
  bgVideoUrl: hero.bgVideoUrl ?? "",
  ctaText: hero.ctaText ?? "",
  ctaLink: hero.ctaLink ?? "whatsapp",
});
