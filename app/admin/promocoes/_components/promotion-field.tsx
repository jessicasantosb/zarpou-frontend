import type { Control, FieldPath } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { PromotionFormValues } from "@/schemas/promotion-form";
import { cn } from "@/lib/utils";

interface PromotionFieldProps {
  control: Control<PromotionFormValues>;
  name: FieldPath<PromotionFormValues>;
  label: string;
  required?: boolean;
  placeholder?: string;
  inputClassName?: string;
}

export function PromotionField({
  control,
  name,
  label,
  required,
  placeholder,
  inputClassName,
}: PromotionFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="gap-0 space-y-1">
          <FormLabel
            required={required}
            className="font-bold text-foreground/80"
          >
            {label}
          </FormLabel>
          <FormControl>
            <input
              type="text"
              name={field.name}
              ref={field.ref}
              onBlur={field.onBlur}
              value={String(field.value ?? "")}
              placeholder={placeholder}
              onChange={(event) => field.onChange(event.target.value)}
              className={cn(
                "w-full h-11 px-3.5 rounded-xl border border-input text-sm font-medium outline-hidden focus:border-primary",
                inputClassName,
              )}
            />
          </FormControl>
          <FormMessage className="text-[10px]" />
        </FormItem>
      )}
    />
  );
}
