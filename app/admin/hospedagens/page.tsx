"use client";

import { HotelFormDialog } from "./_components/hotel-form-dialog";
import { HospedagensHeader } from "./_components/hospedagens-header";
import { HotelsGrid } from "./_components/hotels-grid";
import { useHospedagens } from "./_hooks/use-hospedagens";

export default function AdminHospedagensPage() {
  const {
    mounted,
    hotels,
    modalOpen,
    editingHotel,
    onOpenChange,
    onOpenNew,
    onOpenEdit,
    onDelete,
  } = useHospedagens();

  if (!mounted) {
    return (
      <div className="p-12 text-center text-muted-foreground text-xs">
        Carregando hospedagens...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <HospedagensHeader onAddNew={onOpenNew} />

      <HotelsGrid hotels={hotels} onEdit={onOpenEdit} onDelete={onDelete} />

      {modalOpen && (
        <HotelFormDialog
          key={editingHotel?.id ?? "nova-hospedagem"}
          open={modalOpen}
          onOpenChange={onOpenChange}
          hotel={editingHotel}
        />
      )}
    </div>
  );
}
