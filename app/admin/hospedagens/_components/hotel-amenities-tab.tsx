import { useWatch, type UseFormReturn } from "react-hook-form";
import { Check } from "lucide-react";
import type { HotelFormValues } from "@/schemas/hotel-form";
import { cn } from "@/lib/utils";
import { COMMON_AMENITIES } from "../_constants";

interface HotelAmenitiesTabProps {
  form: UseFormReturn<HotelFormValues>;
}

export function HotelAmenitiesTab({ form }: HotelAmenitiesTabProps) {
  const amenities = useWatch({ control: form.control, name: "amenities" }) ?? [];

  const toggleAmenity = (item: string) => {
    const next = amenities.includes(item)
      ? amenities.filter((amenity) => amenity !== item)
      : [...amenities, item];
    form.setValue("amenities", next);
  };

  return (
    <div className="animate-in space-y-4 fade-in duration-150">
      <div>
        <h4 className="text-xs font-bold tracking-wide text-foreground">
          Comodidades e Diferenciais
        </h4>
        <p className="text-[11px] text-muted-foreground">
          Selecione todos os serviços oferecidos aos hóspedes no hotel.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {COMMON_AMENITIES.map((amenity) => {
          const selected = amenities.includes(amenity);
          return (
            <button
              key={amenity}
              type="button"
              onClick={() => toggleAmenity(amenity)}
              className={cn(
                "flex cursor-pointer items-center justify-between rounded-xl border p-3 text-xs font-semibold transition",
                selected
                  ? "border-primary bg-primary font-bold text-white shadow-xs"
                  : "border-border bg-card text-foreground/80 hover:bg-muted",
              )}
            >
              <span>{amenity}</span>
              {selected && <Check className="size-4 shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
