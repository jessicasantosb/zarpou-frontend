"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FooterLinks } from "./footer-links";
import { FooterCta } from "./footer-cta";
import { useConfigStore } from "@/stores/config-store";
import { Container } from "../shared/container";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { config } = useConfigStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const displayCnpj = mounted
    ? config.cnpj
    : process.env.NEXT_PUBLIC_CNPJ || "55.849.201/0001-38";
  const displayCompany = mounted
    ? config.companyName
    : "Zarpou Viagens e Turismo Ltda";
  const displayCadastur = mounted ? config.cadastur : "34.120.948/0001-90";

  return (
    <footer>
      <FooterCta />

      <div className="w-full bg-foreground/80 text-muted-foreground/70 select-none">
        <FooterLinks />

        <div className="border-t border-white/10 bg-black/40 py-6 text-xs text-muted-foreground/70">
          <Container>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left space-y-1">
                <p className="font-semibold text-slate-300">
                  {displayCompany} • CNPJ: {displayCnpj} • Cadastur:{" "}
                  {displayCadastur}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  © {currentYear} Zarpou Viagens. Todos os direitos reservados.
                  Fotos e tarifas sujeitas à disponibilidade.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-xs">
                <div className="flex items-center gap-4 text-muted-foreground">
                  <Link
                    href="/termos"
                    className="hover:text-secondary transition underline underline-offset-4"
                  >
                    Termos de Uso
                  </Link>
                  <span>•</span>
                  <Link
                    href="/privacidade"
                    className="hover:text-secondary transition underline underline-offset-4"
                  >
                    Privacidade (LGPD)
                  </Link>
                  <span>•</span>
                  <Link
                    href="/minhas-viagens"
                    className="hover:text-secondary transition underline underline-offset-4"
                  >
                    Minhas Viagens
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </footer>
  );
}
