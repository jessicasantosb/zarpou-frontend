import { Hotel as HotelIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImportDataButton } from "@/app/admin/_components/import-data-dialog";

interface HospedagensHeaderProps {
  onAddNew: () => void;
}

export function HospedagensHeader({ onAddNew }: HospedagensHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-secondary/15 px-3 py-1 text-[11px] font-black tracking-wide text-primary">
          <HotelIcon className="size-3 fill-secondary text-secondary" />
          Catálogo Completo
        </div>
        <h1 className="text-2xl font-black text-foreground">
          Hospedagens & Quartos
        </h1>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Gerencie acomodações, tipos de camas, comodidades e fotos para
          exibição no site e detalhes (/hospedagens/item)
        </p>
      </div>

      <div className="flex items-center gap-3">
        <ImportDataButton resource="hotels" label="hospedagens" />

        <Button
          type="button"
          onClick={onAddNew}
          className="h-auto cursor-pointer rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-white  hover:bg-primary/90"
        >
          <Plus className="size-4" />
          Adicionar Hotel
        </Button>
      </div>
    </div>
  );
}
