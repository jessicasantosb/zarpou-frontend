import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

/**
 * Informativo "Não encontrou o que procura? Monte seu roteiro."
 * Exibido nas listagens de passagens, destinos e hospedagens.
 */
export function RoteiroCta() {
  return (
    <div className="mt-8 rounded-3xl border border-dashed border-primary/40 bg-card p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-start gap-4">
        <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <Compass className="size-6" />
        </div>
        <div>
          <p className="text-base font-bold text-foreground">
            Não encontrou o que procura?
          </p>
          <p className="text-sm text-muted-foreground mt-0.5 max-w-md">
            Monte seu roteiro com a Zarpou: nossos consultores especialistas
            montam uma viagem personalizada do seu jeito.
          </p>
        </div>
      </div>

      <Link
        href="/contato"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-hover transition  self-start md:self-center shrink-0"
      >
        Monte seu roteiro
        <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}
