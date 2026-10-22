import type { ReactNode } from "react";
import type {
  Control,
  ControllerRenderProps,
  FieldPath,
} from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { HotelFormValues } from "@/schemas/hotel-form";
import { cn } from "@/lib/utils";

interface HotelFieldProps {
  control: Control<HotelFormValues>;
  name: FieldPath<HotelFormValues>;
  label: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  inputClassName?: string;
  transform?: (value: string) => string;
  render?: (field: ControllerRenderProps<HotelFormValues>) => ReactNode;
}

export function HotelField({
  control,
  name,
  label,
  placeholder,
  required,
  maxLength,
  inputClassName,
  transform,
  render,
}: HotelFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel
            required={required}
            className="block text-[11px] font-bold tracking-wide text-foreground/80"
          >
            {label}
          </FormLabel>

          {render ? (
            render(field)
          ) : (
            <FormControl>
              <Input
                type="text"
                maxLength={maxLength}
                name={field.name}
                ref={field.ref}
                onBlur={field.onBlur}
                value={String(field.value ?? "")}
                placeholder={placeholder}
                onChange={(event) =>
                  field.onChange(
                    transform ? transform(event.target.value) : event.target.value,
                  )
                }
                className={cn(
                  "h-10 rounded-xl border-border text-xs font-semibold outline-hidden focus:border-primary",
                  inputClassName,
                )}
              />
            </FormControl>
          )}

          <FormMessage className="text-[10px]" />
        </FormItem>
      )}
    />
  );
}
