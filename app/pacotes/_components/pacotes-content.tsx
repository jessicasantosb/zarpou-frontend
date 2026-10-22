"use client";

import { Container } from "@/components/shared/container";
import { Luggage } from "lucide-react";
import { usePacotes } from "../_hooks/use-pacotes";
import { PackageCard } from "./package-card";

export function PacotesContent() {
  const { packages } = usePacotes();

  return (
    <div className="min-h-screen bg-muted pt-[65px] pb-16">
      <div className="bg-primary text-white py-6 shadow-md border-b border-primary/20 mb-8">
        <Container>
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary">
              <Luggage className="size-6" />
            </div>
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-secondary">
                Combinação Econômica Zarpou
              </span>
              <h1 className="text-2xl font-bold">Pacotes de Viagem (Voo + Hotel)</h1>
              <p className="text-xs text-white/80">
                Reserve voo e hospedagem juntos e economize até 30% em relação a compras separadas
              </p>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </Container>
    </div>
  );
}
