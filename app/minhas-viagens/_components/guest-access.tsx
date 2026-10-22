import type React from "react";
import Link from "next/link";
import { ArrowRight, Lock, Printer, Search, User } from "lucide-react";
import { Container } from "@/components/shared/container";

interface GuestAccessProps {
  pnrSearch: string;
  pnrEmail: string;
  pnrError: string;
  foundBookingId: string | null;
  onPnrSearchChange: (value: string) => void;
  onPnrEmailChange: (value: string) => void;
  onSearchByPnr: React.FormEventHandler<HTMLFormElement>;
}

export function GuestAccess({
  pnrSearch,
  pnrEmail,
  pnrError,
  foundBookingId,
  onPnrSearchChange,
  onPnrEmailChange,
  onSearchByPnr,
}: GuestAccessProps) {
  return (
    <div className="min-h-screen bg-muted pt-28 pb-20">
      <Container>
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <div className="size-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-2">
              <Lock className="size-8" />
            </div>
            <h1 className="text-3xl font-black text-foreground">
              Acesse suas Viagens
            </h1>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Para sua segurança e privacidade, faça login na sua conta Zarpou
              ou consulte diretamente pelo código da sua reserva.
            </p>
          </div>

          <div className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-bold text-primary tracking-wide">
                Já possui conta Zarpou?
              </span>
              <h2 className="text-xl font-bold text-foreground">
                Fazer Login / Criar Conta
              </h2>
              <p className="text-xs text-muted-foreground">
                Acesse o painel com todas as suas viagens, passagens e vouchers
                salvos.
              </p>
            </div>

            <Link
              href="/login?redirect=/minhas-viagens"
              className="w-full sm:w-auto px-6 py-3.5 bg-primary hover:bg-primary/90 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition whitespace-nowrap"
            >
              <User className="size-4" />
              Acessar com E-mail
              <ArrowRight className="size-4 text-secondary" />
            </Link>
          </div>

          <div className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-sm space-y-4">
            <div className="border-b border-border/60 pb-3">
              <span className="text-xs font-bold text-muted-foreground tracking-wide">
                Consulta Rápida sem Login
              </span>
              <h2 className="text-lg font-bold text-foreground">
                Localizar Reserva pelo Código (PNR)
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Informe o código localizador recebido na confirmação da compra.
              </p>
            </div>

            {pnrError && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-xs font-semibold rounded-xl text-center">
                {pnrError}
              </div>
            )}

            <form onSubmit={onSearchByPnr} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-foreground/80 uppercase">
                    Código Localizador (ex: ZRP-849201) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ZRP-XXXXXX"
                    value={pnrSearch}
                    onChange={(e) => onPnrSearchChange(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-input font-mono uppercase text-sm font-bold outline-hidden focus:border-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-foreground/80 uppercase">
                    E-mail do Titular da Compra
                  </label>
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    value={pnrEmail}
                    onChange={(e) => onPnrEmailChange(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-input text-sm font-medium outline-hidden focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-secondary hover:bg-secondary/90 text-primary font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
                >
                  <Search className="size-4" />
                  Localizar Reserva
                </button>
              </div>
            </form>

            {foundBookingId && (
              <div className="pt-4 border-t border-border/60 flex items-center justify-between bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-emerald-800">
                    ✓ Reserva Localizada com Sucesso!
                  </p>
                  <p className="text-[11px] text-emerald-700">
                    Clique no botão para abrir e imprimir seu voucher oficial.
                  </p>
                </div>
                <Link
                  href={`/reserva/confirmada/${foundBookingId}`}
                  className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm"
                >
                  <Printer className="size-3.5" />
                  Acessar Voucher
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
