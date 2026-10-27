"use client";

import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Container } from "@/components/shared/container";
import { useTerms } from "../_hooks/use-terms";

export function TermsContent() {
  const { companyName, cnpj, terms } = useTerms();

  return (
    <main className="min-h-screen bg-muted pt-28 pb-16">
      <Container>
        <div className="max-w-4xl mx-auto bg-card rounded-2xl  border border-border p-8 md:p-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium mb-6"
          >
            <ArrowLeft className="size-4" />
            Voltar para o início
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary">Termos e Condições de Uso</h1>
              <p className="text-sm text-muted-foreground">
                {companyName} • CNPJ: {cnpj}
              </p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none text-foreground/80 leading-relaxed space-y-6 pt-4 border-t border-border/60">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">1. Objeto e Aceitação</h2>
              <p>
                Os presentes Termos regulam a utilização da plataforma digital de viagens e turismo da {companyName}, pessoa jurídica de direito privado devidamente inscrita no CNPJ sob o nº {cnpj}, com registro no Cadastur.
              </p>
              <p>
                Ao navegar ou finalizar reservas de passagens aéreas, hospedagens, pacotes e serviços turísticos nesta plataforma, o usuário declara ter lido, compreendido e aceito integralmente todas as disposições aqui estabelecidas.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">2. Reservas e Emissão de Vouchers</h2>
              <p>
                Todas as reservas efetuadas pelo próprio aplicativo/site da Zarpou estão condicionadas à confirmação de disponibilidade pelas companhias aéreas ou estabelecimentos hoteleiros e à integral aprovação da transação de pagamento (Cartão de Crédito, Pix ou Boleto).
              </p>
              <p>
                Após a confirmação do pagamento, é gerado o código localizador (PNR/Voucher) com validade jurídica de reserva para apresentação no check-in do hotel ou embarque no aeroporto.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">3. Cancelamentos e Reembolsos</h2>
              <p>
                As condições de cancelamento, alteração de datas e multas aplicáveis obedecem rigorosamente à tarifa contratada no momento da reserva e às normas da ANAC (Resolução nº 400/2016) e do Código de Defesa do Consumidor.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">4. Disposições Customizadas</h2>
              <p className="whitespace-pre-line bg-muted/50 p-4 rounded-lg border border-border/60">
                {terms}
              </p>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}
