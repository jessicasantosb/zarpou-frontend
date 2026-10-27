"use client";

import Link from "next/link";
import { Percent, Sparkles } from "lucide-react";
import { Container } from "@/components/shared/container";
import { usePromocoes } from "../_hooks/use-promocoes";
import { PromoCardItem } from "./promo-card-item";

export function PromocoesContent() {
  const { activePromos } = usePromocoes();

  return (
    <div className="min-h-screen bg-muted pt-28 pb-20">
      <div className="bg-primary text-white py-12 mb-10 ">
        <Container>
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-primary text-xs font-black tracking-wide">
              <Sparkles className="size-3.5 fill-primary" />
              Ofertas Especiais & Parcerias
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
              Promoções Imperdíveis Zarpou
            </h1>
            <p className="text-sm md:text-base text-primary-foreground/80 leading-relaxed">
              Explore condições promocionais exclusivas, tarifas negociadas
              para os destinos mais cobiçados do Brasil e do mundo, com
              parcelamento facilitado em até 12x sem juros.
            </p>
          </div>
        </Container>
      </div>

      <Container>
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
          <div>
            <span className="text-sm font-bold text-foreground">
              {activePromos.length} campanhas ativas no momento
            </span>
            <p className="text-xs text-muted-foreground">
              Descontos válidos por tempo limitado ou até esgotarem as vagas
            </p>
          </div>

          <Link
            href="/"
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
          >
            Voltar para o início
          </Link>
        </div>

        {activePromos.length === 0 ? (
          <div className="bg-card rounded-3xl p-16 text-center border border-border  max-w-lg mx-auto space-y-4">
            <div className="size-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto text-amber-500">
              <Percent className="size-8" />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              Novas promoções em breve!
            </h3>
            <p className="text-sm text-muted-foreground">
              Nossa equipe está preparando novos pacotes e tarifas
              promocionais. Volte em alguns instantes ou entre em contato com
              nossos especialistas.
            </p>
            <Link
              href="/contato"
              className="inline-block px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary/90 transition "
            >
              Falar com Especialista
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activePromos.map((promo) => (
              <PromoCardItem key={promo.id} promo={promo} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
