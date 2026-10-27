import { Compass, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImportDataButton } from "@/app/admin/_components/import-data-dialog";

interface DestinosHeaderProps {
  onAddNew: () => void;
}

export function DestinosHeader({ onAddNew }: DestinosHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-secondary/15 px-3 py-1 text-[11px] font-black tracking-wide text-primary">
          <Compass className="size-3 fill-secondary text-secondary" />
          Lugares Imperdíveis
        </div>
        <h1 className="text-2xl font-black text-foreground">
          Destinos Turísticos
        </h1>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Gerencie todas as cidades, roteiros e atrações exibidas no catálogo
          /destinos e na página inicial
        </p>
      </div>

      <div className="flex items-center gap-3">
        <ImportDataButton resource="destinations" label="destinos" />

        <Button
          type="button"
          onClick={onAddNew}
          className="h-auto cursor-pointer rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-white  hover:bg-primary/90"
        >
          <Plus className="size-4" />
          Adicionar Novo Destino
        </Button>
      </div>
    </div>
  );
}
