"use client";

import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";
import { Container } from "@/components/shared/container";
import { usePrivacyPolicy } from "../_hooks/use-privacy-policy";

export function PrivacyPolicyContent() {
  const { companyName, cnpj, email, policy } = usePrivacyPolicy();

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
              <Lock className="size-5" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary">
                Política de Privacidade e Proteção de Dados
              </h1>
              <p className="text-sm text-muted-foreground">
                {companyName} • CNPJ: {cnpj} • Em conformidade com a LGPD
              </p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none text-foreground/80 leading-relaxed space-y-6 pt-4 border-t border-border/60">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                1. Compromisso com a sua Privacidade
              </h2>
              <p>
                A {companyName} está comprometida com a segurança dos dados de
                seus usuários durante todo o processo de navegação e reserva de
                serviços turísticos em nossa plataforma.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                2. Coleta e Finalidade dos Dados Pessoais
              </h2>
              <p>
                Os dados pessoais solicitados durante o checkout (nome
                completo, CPF, passaporte, data de nascimento, e-mail e
                telefone) são necessários e estritamente utilizados para:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Emissão formal de bilhetes aéreos e reservas hoteleiras
                  junto aos fornecedores;
                </li>
                <li>
                  Envio de vouchers de confirmação e atualizações operacionais
                  de voos;
                </li>
                <li>
                  Prevenção à fraude e segurança transacional nos pagamentos
                  via Cartão e Pix;
                </li>
                <li>Suporte ao cliente e atendimento pós-venda.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                3. Segurança dos Pagamentos
              </h2>
              <p>
                Os dados de cartões de crédito são processados em ambiente
                seguro com criptografia SSL 256-bit e tokenização compatível
                com o padrão PCI-DSS. Nenhuma informação de segurança sensível
                (como código CVV) é armazenada de forma desprotegida.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                4. Disposições Gerais e Contato com o DPO
              </h2>
              <p className="whitespace-pre-line bg-muted/50 p-4 rounded-lg border border-border/60">
                {policy}
              </p>
              <p className="text-sm text-foreground/70 mt-4">
                Para exercer seus direitos de titular de dados (acesso,
                correção ou exclusão), entre em contato conosco pelo e-mail:{" "}
                <strong>{email}</strong>.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}
