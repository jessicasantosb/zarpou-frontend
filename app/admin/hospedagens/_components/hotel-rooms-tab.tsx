import { useFieldArray, useWatch, type UseFormReturn } from "react-hook-form";
import { Bed, Plus } from "lucide-react";
import { toast } from "react-toastify";
import type { HotelFormValues } from "@/schemas/hotel-form";
import { RoomCard } from "./room-card";

interface HotelRoomsTabProps {
  form: UseFormReturn<HotelFormValues>;
}

export function HotelRoomsTab({ form }: HotelRoomsTabProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "rooms",
  });
  const rooms = useWatch({ control: form.control, name: "rooms" }) ?? [];

  const handleAddRoom = () => {
    const current = form.getValues("rooms");
    append({
      id: `room-${Date.now()}-${current.length + 1}`,
      name: `Novo Quarto ${current.length + 1}`,
      description:
        "Acomodação completa com banheiro privativo, ar-condicionado e TV a cabo.",
      maxAdults: 2,
      maxChildren: 1,
      beds: "1 Cama Queen Size",
      sizeM2: 32,
      pricePerNight: current.length > 0 ? current[0].pricePerNight : 500,
      originalPricePerNight:
        current.length > 0 ? current[0].originalPricePerNight : undefined,
      freeCancellation: true,
      breakfastIncluded: true,
      availableRooms: 4,
      amenities: ["Wi-Fi", "Ar-condicionado"],
    });
  };

  const handleRemoveRoom = (index: number) => {
    if (fields.length <= 1) {
      toast.warning("A hospedagem deve possuir pelo menos um tipo de quarto.");
      return;
    }
    remove(index);
  };

  return (
    <div className="animate-in space-y-5 fade-in duration-150">
      <div className="flex flex-col justify-between gap-3 rounded-2xl border border-amber-200/60 bg-amber-50/60 p-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="flex items-center gap-1.5 text-xs font-black tracking-wide text-amber-950">
            <Bed className="size-4 text-amber-600" />
            Opções de Quartos & Tipos de Camas
          </h3>
          <p className="mt-0.5 text-[11px] text-amber-800/80">
            Adicione os quartos que o cliente poderá escolher na tela de
            reserva. Cada quarto tem seu tipo de cama e capacidade.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddRoom}
          className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-primary/90"
        >
          <Plus className="size-3.5" />
          Adicionar Quarto
        </button>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <RoomCard
            key={field.id}
            form={form}
            index={index}
            room={rooms[index]}
            canRemove={fields.length > 1}
            onRemove={() => handleRemoveRoom(index)}
          />
        ))}
      </div>
    </div>
  );
}
