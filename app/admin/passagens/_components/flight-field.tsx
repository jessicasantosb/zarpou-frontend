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
import type { FlightFormValues } from "@/schemas/flight-form";
import { cn } from "@/lib/utils";

interface FlightFieldProps {
  control: Control<FlightFormValues>;
  name: FieldPath<FlightFormValues>;
  label: string;
  required?: boolean;
  labelClassName?: string;
  wrapperClassName?: string;
  inputClassName?: string;
  type?: string;
  placeholder?: string;
  maxLength?: number;
  transform?: (value: string) => string;
  extra?: ReactNode;
  render?: (field: ControllerRenderProps<FlightFormValues>) => ReactNode;
}

export function FlightField({
  control,
  name,
  label,
  required,
  labelClassName,
  wrapperClassName,
  inputClassName,
  type = "text",
  placeholder,
  maxLength,
  transform,
  extra,
  render,
}: FlightFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("gap-0 space-y-1", wrapperClassName)}>
          <FormLabel
            required={required}
            className={cn(
              "block text-[11px] font-bold text-foreground/80 tracking-wide",
              labelClassName,
            )}
          >
            {label}
          </FormLabel>

          {render ? (
            render(field)
          ) : (
            <FormControl>
              <input
                type={type}
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
                  "w-full h-10 px-3 text-xs rounded-xl border border-border outline-hidden focus:border-primary",
                  inputClassName,
                )}
              />
            </FormControl>
          )}

          {extra}
          <FormMessage className="text-[10px]" />
        </FormItem>
      )}
    />
  );
}
