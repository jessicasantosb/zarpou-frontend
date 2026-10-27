"use client";

import { DestinationFormDialog } from "./_components/destination-form-dialog";
import { DestinationsGrid } from "./_components/destinations-grid";
import { DestinosHeader } from "./_components/destinos-header";
import { useDestinos } from "./_hooks/use-destinos";

export default function AdminDestinosPage() {
  const {
    mounted,
    destinations,
    modalOpen,
    editingDestination,
    onOpenChange,
    onOpenNew,
    onOpenEdit,
    onDelete,
  } = useDestinos();

  if (!mounted) {
    return (
      <div className="p-12 text-center text-muted-foreground text-xs">
        Carregando destinos...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DestinosHeader onAddNew={onOpenNew} />

      <DestinationsGrid
        destinations={destinations}
        onEdit={onOpenEdit}
        onDelete={onDelete}
      />

      {modalOpen && (
        <DestinationFormDialog
          key={editingDestination?.id ?? "novo-destino"}
          open={modalOpen}
          onOpenChange={onOpenChange}
          destination={editingDestination}
        />
      )}
    </div>
  );
}
