"use client";

import { FlightFormDialog } from "./_components/flight-form-dialog";
import { FlightsGrid } from "./_components/flights-grid";
import { PassagensHeader } from "./_components/passagens-header";
import { usePassagens } from "./_hooks/use-passagens";

export default function AdminPassagensPage() {
  const {
    mounted,
    flights,
    modalOpen,
    editingFlight,
    onOpenChange,
    onOpenNew,
    onOpenEdit,
    onRestore,
    onDelete,
  } = usePassagens();

  if (!mounted) {
    return (
      <div className="p-12 text-center text-muted-foreground text-xs">
        Carregando passagens...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PassagensHeader onRestore={onRestore} onAddNew={onOpenNew} />

      <FlightsGrid flights={flights} onEdit={onOpenEdit} onDelete={onDelete} />

      {modalOpen && (
        <FlightFormDialog
          key={editingFlight?.id ?? "novo-voo"}
          open={modalOpen}
          onOpenChange={onOpenChange}
          flight={editingFlight}
        />
      )}
    </div>
  );
}
