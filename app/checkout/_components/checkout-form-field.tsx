import type { Control, FieldPath } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { TravelerFormValues } from "@/schemas/checkout-traveler";

interface CheckoutFormFieldProps {
  control: Control<TravelerFormValues>;
  name: FieldPath<TravelerFormValues>;
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  maxLength?: number;
  inputClassName?: string;
  transform?: (value: string) => string;
}

export function CheckoutFormField({
  control,
  name,
  label,
  required,
  type = "text",
  placeholder,
  maxLength,
  inputClassName,
  transform,
}: CheckoutFormFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="gap-0 space-y-1">
          <FormLabel className="text-xs font-bold text-foreground/80 tracking-wide">
            {label}
          </FormLabel>
          <FormControl>
            <input
              type={type}
              required={required}
              name={field.name}
              ref={field.ref}
              onBlur={field.onBlur}
              value={String(field.value ?? "")}
              placeholder={placeholder}
              maxLength={maxLength}
              onChange={(event) =>
                field.onChange(
                  transform
                    ? transform(event.target.value)
                    : event.target.value,
                )
              }
              className={`w-full h-12 px-4 rounded-xl border border-input text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-hidden ${inputClassName ?? ""}`}
            />
          </FormControl>
          <FormMessage className="text-[10px]" />
        </FormItem>
      )}
    />
  );
}
