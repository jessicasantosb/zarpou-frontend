import Image from "next/image";
import { services } from "@/app/sobre/_data/services";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export function Services() {
  return (
    <section className="py-16 md:py-24 max-w-6xl mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary/15 text-primary text-xs font-bold tracking-wide">
          <Sparkles className="size-3.5 text-secondary fill-secondary" />
          <span>Nossos Pilares de Atendimento</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
          O que oferecemos para sua viagem
        </h2>
        <p className="text-slate-500 text-sm sm:text-base">
          Do primeiro contato à volta para casa, desenhamos cada jornada com o mais alto nível de conforto, personalização e tranquilidade.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {services.map(({ title, description, src }, idx) => (
          <div
            key={title}
            className="group relative h-80 sm:h-96 rounded-3xl overflow-hidden  border border-border transition-all duration-300 hover:-translate-y-1 "
          >
            <Image
              alt={title}
              src={src}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/60 to-foreground/20 z-10 transition-opacity duration-300" />

            <div className="absolute top-5 left-5 z-20 size-8 rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-white text-xs font-extrabold flex items-center justify-center">
              0{idx + 1}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-20 text-white space-y-2">
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-secondary transition-colors">
                {title}
              </h3>
              <p className="text-xs sm:text-sm text-primary-foreground/80 leading-relaxed max-w-md font-light">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-gradient-to-br from-primary via-primary-light to-primary rounded-3xl p-8 sm:p-12 text-white  relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="absolute -right-16 -top-16 size-60 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />

        <div className="space-y-2 text-center md:text-left relative z-10 max-w-xl">
          <span className="text-xs font-extrabold tracking-wide text-secondary">
            Planejamento Sem Custo
          </span>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
            Pronto para planejar sua próxima grande aventura?
          </h3>
          <p className="text-xs sm:text-sm text-primary-foreground/80 leading-relaxed font-light">
            Converse com nossos consultores especialistas em Belo Horizonte e receba um roteiro personalizado com as melhores condições de pagamento.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto relative z-10 shrink-0">
          <Link
            href="/contato"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-secondary hover:bg-secondary-hover text-primary font-extrabold text-sm  hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Falar com Consultor</span>
            <ArrowRight className="size-4" />
          </Link>

          <Link
            href="/hospedagens"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/25 text-white font-bold text-sm hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
          >
            Ver Hospedagens
          </Link>
        </div>
      </div>
    </section>
  );
}
