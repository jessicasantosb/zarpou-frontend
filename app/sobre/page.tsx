import { Metadata } from "next";
import { Hero } from "@/components/shared/hero";
import { baseOpenGraph } from "@/constants/seo";
import { AboutHeroContent } from "./_components/about-hero-content";
import { AboutStory } from "./_components/about-story";
import { AboutStats } from "./_components/about-stats";
import { Services } from "./_components/services";

export const metadata: Metadata = {
  title: "Sobre Nós - Nossa História & Missão",
  description:
    "Conheça a história da Zarpou Viagens e Turismo em Belo Horizonte. Uma agência digital completa com atendimento humanizado, curadoria sob medida e total segurança Cadastur.",
  openGraph: {
    ...baseOpenGraph,
    title: "Sobre a Zarpou Viagens - Experiências Reais & Atendimento 24h",
    description:
      "Conheça nossa história e propósito. Agência de turismo em BH dedicada a criar roteiros inesquecíveis com parcelamento em até 12x sem juros.",
    url: "/sobre",
  },
};

export default function AboutPage() {
  return (
    <main className="bg-slate-50 min-h-screen">
      <Hero>
        <AboutHeroContent />
      </Hero>

      <AboutStory />

      <AboutStats />

      <Services />
    </main>
  );
}
