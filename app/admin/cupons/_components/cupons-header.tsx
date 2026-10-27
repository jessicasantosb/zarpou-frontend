"use client";

import { Plus, RotateCw, Search, Ticket } from "lucide-react";
import { ImportDataButton } from "@/app/admin/_components/import-data-dialog";

interface CuponsHeaderProps {
  search: string;
  totalCoupons: number;
  onSearchChange: (value: string) => void;
  onAddNew: () => void;
  onReset: () => void;
}

export function CuponsHeader({
  search,
  totalCoupons,
  onSearchChange,
  onAddNew,
  onReset,
}: CuponsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-foreground flex items-center gap-2">
            <Ticket className="size-6 text-primary" />
            Cupons de Desconto
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Crie cupons, controle os usos e dispare notificações para seus clientes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ImportDataButton resource="coupons" label="cupons" />
          <button
            type="button"
            onClick={onReset}
            title="Recarregar cupons"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-border text-foreground/70 text-xs font-semibold hover:bg-muted transition cursor-pointer"
          >
            <RotateCw className="size-4" />
            Atualizar
          </button>
          <button
            type="button"
            onClick={onAddNew}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover transition  cursor-pointer"
          >
            <Plus className="size-4" />
            Novo cupom
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 max-w-md w-full">
        <div className="relative flex-1">
          <Search className="size-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={`Buscar por código ou descrição (${totalCoupons} cupons)`}
            className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-input bg-card text-xs font-medium outline-hidden focus:border-primary"
          />
        </div>
      </div>
    </div>
  );
}
