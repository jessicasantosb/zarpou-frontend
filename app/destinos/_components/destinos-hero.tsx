import { Compass } from "lucide-react";
import { Container } from "@/components/shared/container";

export function DestinosHero() {
  return (
    <div className="bg-primary text-white py-12 mb-8  relative overflow-hidden">
      <div className="absolute inset-0 bg-radial from-white/10 via-transparent to-transparent pointer-events-none" />
      <Container>
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-primary text-xs font-black tracking-wide">
            <Compass className="size-3.5 fill-primary" />
            Roteiros &amp; Cidades Selecionadas
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
            Lugares Imperdíveis &amp; Pacotes de Viagem
          </h1>
          <p className="text-sm md:text-base text-primary-foreground/80 leading-relaxed font-medium">
            Explore cada cidade em detalhes e economize até 30% reservando
            pacotes completos com passagens aéreas, hospedagens de charme e
            experiências inesquecíveis.
          </p>
        </div>
      </Container>
    </div>
  );
}
