import type { UseFormReturn } from "react-hook-form";
import { Bed, Coffee, ShieldCheck, Trash2 } from "lucide-react";
import type { HotelFormValues, RoomFormValues } from "@/schemas/hotel-form";
import { BED_OPTIONS } from "../_constants";

interface RoomCardProps {
  form: UseFormReturn<HotelFormValues>;
  index: number;
  room?: RoomFormValues;
  canRemove: boolean;
  onRemove: () => void;
}

export function RoomCard({
  form,
  index,
  room,
  canRemove,
  onRemove,
}: RoomCardProps) {
  const roomErrors = form.formState.errors.rooms?.[index];

  return (
    <div className="relative space-y-3 rounded-2xl border border-border bg-muted/80 p-4 group">
      <div className="flex items-center justify-between border-b border-border/80 pb-2.5">
        <span className="flex items-center gap-1.5 text-xs font-extrabold text-primary">
          <span className="flex size-5 items-center justify-center rounded-full bg-primary/10 text-[10px] text-primary">
            {index + 1}
          </span>
          {room?.name || `Quarto ${index + 1}`}
        </span>

        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="flex cursor-pointer items-center gap-1 text-xs font-semibold text-destructive transition hover:text-destructive"
          >
            <Trash2 className="size-3.5" />
            Remover Quarto
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-12">
        <div className="space-y-1 sm:col-span-6">
          <label className="block text-[10px] font-bold tracking-wide text-foreground/80">
            Nome do Quarto *
          </label>
          <input
            type="text"
            {...form.register(`rooms.${index}.name`)}
            placeholder="Ex: Suíte Luxo Frente Mar"
            className="w-full rounded-xl border border-border bg-card px-2.5 text-xs font-semibold outline-hidden focus:border-primary h-9"
          />
          {roomErrors?.name && (
            <p className="text-[10px] text-destructive">
              {String(roomErrors.name.message)}
            </p>
          )}
        </div>

        <div className="space-y-1 sm:col-span-6">
          <label className="flex items-center gap-1 text-[10px] font-bold tracking-wide text-foreground/80">
            <Bed className="size-3 text-secondary" />
            Tipo de Cama *
          </label>
          <select
            {...form.register(`rooms.${index}.beds`)}
            className="w-full rounded-xl border border-border bg-card px-2.5 text-xs font-semibold outline-hidden focus:border-primary h-9"
          >
            {BED_OPTIONS.map((bedOption) => (
              <option key={bedOption} value={bedOption}>
                {bedOption}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1 sm:col-span-3">
          <label className="block text-[10px] font-bold tracking-wide text-primary">
            Diária (R$) *
          </label>
          <input
            type="number"
            min={50}
            {...form.register(`rooms.${index}.pricePerNight`, {
              valueAsNumber: true,
            })}
            className="w-full rounded-xl border border-primary/40 bg-card px-2.5 text-xs font-black text-primary outline-hidden focus:border-primary h-9"
          />
          {roomErrors?.pricePerNight && (
            <p className="text-[10px] text-destructive">
              {String(roomErrors.pricePerNight.message)}
            </p>
          )}
        </div>

        <div className="space-y-1 sm:col-span-3">
          <label className="block text-[10px] font-bold tracking-wide text-muted-foreground">
            Preço De (Riscado)
          </label>
          <input
            type="number"
            placeholder="Opcional"
            {...form.register(`rooms.${index}.originalPricePerNight`, {
              valueAsNumber: true,
            })}
            className="w-full rounded-xl border border-border bg-card px-2.5 text-xs font-medium text-muted-foreground outline-hidden focus:border-primary h-9"
          />
        </div>

        <div className="space-y-1 sm:col-span-3">
          <label className="block text-[10px] font-bold tracking-wide text-foreground/80">
            Adultos Máx.
          </label>
          <input
            type="number"
            min={1}
            max={8}
            {...form.register(`rooms.${index}.maxAdults`, {
              valueAsNumber: true,
            })}
            className="w-full rounded-xl border border-border bg-card px-2.5 text-xs font-semibold outline-hidden focus:border-primary h-9"
          />
          {roomErrors?.maxAdults && (
            <p className="text-[10px] text-destructive">
              {String(roomErrors.maxAdults.message)}
            </p>
          )}
        </div>

        <div className="space-y-1 sm:col-span-3">
          <label className="block text-[10px] font-bold tracking-wide text-foreground/80">
            Crianças Máx.
          </label>
          <input
            type="number"
            min={0}
            max={6}
            {...form.register(`rooms.${index}.maxChildren`, {
              valueAsNumber: true,
            })}
            className="w-full rounded-xl border border-border bg-card px-2.5 text-xs font-semibold outline-hidden focus:border-primary h-9"
          />
          {roomErrors?.maxChildren && (
            <p className="text-[10px] text-destructive">
              {String(roomErrors.maxChildren.message)}
            </p>
          )}
        </div>

        <div className="space-y-1 sm:col-span-3">
          <label className="block text-[10px] font-bold tracking-wide text-foreground/80">
            Tamanho (m²)
          </label>
          <input
            type="number"
            min={10}
            {...form.register(`rooms.${index}.sizeM2`, {
              valueAsNumber: true,
            })}
            className="w-full rounded-xl border border-border bg-card px-2.5 text-xs font-semibold outline-hidden focus:border-primary h-9"
          />
          {roomErrors?.sizeM2 && (
            <p className="text-[10px] text-destructive">
              {String(roomErrors.sizeM2.message)}
            </p>
          )}
        </div>

        <div className="space-y-1 sm:col-span-3">
          <label className="block text-[10px] font-bold tracking-wide text-foreground/80">
            Disponibilidade (Qtd)
          </label>
          <input
            type="number"
            min={1}
            max={50}
            {...form.register(`rooms.${index}.availableRooms`, {
              valueAsNumber: true,
            })}
            className="w-full rounded-xl border border-border bg-card px-2.5 text-xs font-semibold outline-hidden focus:border-primary h-9"
          />
          {roomErrors?.availableRooms && (
            <p className="text-[10px] text-destructive">
              {String(roomErrors.availableRooms.message)}
            </p>
          )}
        </div>

        <div className="space-y-1 sm:col-span-6">
          <label className="block text-[10px] font-bold tracking-wide text-foreground/80">
            Descrição Rápida
          </label>
          <input
            type="text"
            {...form.register(`rooms.${index}.description`)}
            placeholder="Ex: Varanda com vista, ar e frigobar"
            className="w-full rounded-xl border border-border bg-card px-2.5 text-xs font-medium outline-hidden focus:border-primary h-9"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-5 border-t border-border/60 pt-2">
        <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-foreground/80">
          <input
            type="checkbox"
            {...form.register(`rooms.${index}.breakfastIncluded`)}
            className="size-4 cursor-pointer rounded-md accent-emerald-600"
          />
          <Coffee className="size-3.5 text-emerald-600" />
          Café da Manhã Incluso
        </label>

        <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-foreground/80">
          <input
            type="checkbox"
            {...form.register(`rooms.${index}.freeCancellation`)}
            className="size-4 cursor-pointer rounded-md accent-emerald-600"
          />
          <ShieldCheck className="size-3.5 text-emerald-600" />
          Cancelamento Grátis até 48h
        </label>
      </div>
    </div>
  );
}
