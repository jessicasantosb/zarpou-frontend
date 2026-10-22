import type { Control, FieldPath } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { CustomerFormValues } from "@/schemas/customer-form";

interface CustomerFormFieldProps {
  control: Control<CustomerFormValues>;
  name: FieldPath<CustomerFormValues>;
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  maxLength?: number;
  transform?: (value: string) => string;
}

export function CustomerFormField({
  control,
  name,
  label,
  required,
  type = "text",
  placeholder,
  maxLength,
  transform,
}: CustomerFormFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="gap-0 space-y-1">
          <FormLabel className="block text-xs font-bold text-foreground/80">
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
              className="w-full px-3 py-2 text-xs bg-muted border border-border rounded-xl focus:bg-card focus:outline-hidden focus:ring-2 focus:ring-secondary"
            />
          </FormControl>
          <FormMessage className="text-[10px]" />
        </FormItem>
      )}
    />
  );
}
