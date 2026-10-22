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
import type { HeroConfigFormValues } from "@/schemas/hero-config";
import { cn } from "@/lib/utils";

interface HeroFieldProps {
  control: Control<HeroConfigFormValues>;
  name: FieldPath<HeroConfigFormValues>;
  label: string;
  placeholder?: string;
  inputClassName?: string;
  helper?: ReactNode;
  render?: (field: ControllerRenderProps<HeroConfigFormValues>) => ReactNode;
}

export function HeroField({
  control,
  name,
  label,
  placeholder,
  inputClassName,
  helper,
  render,
}: HeroFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel className="text-xs font-bold text-foreground/80">
            {label}
          </FormLabel>

          {render ? (
            render(field)
          ) : (
            <FormControl>
              <Input
                type="text"
                name={field.name}
                ref={field.ref}
                onBlur={field.onBlur}
                value={String(field.value ?? "")}
                placeholder={placeholder}
                onChange={(event) => field.onChange(event.target.value)}
                className={cn(
                  "h-11 rounded-xl border-input text-sm font-medium outline-hidden focus:border-primary",
                  inputClassName,
                )}
              />
            </FormControl>
          )}

          {helper && <p className="text-[10px] text-muted-foreground">{helper}</p>}
          <FormMessage className="text-[10px]" />
        </FormItem>
      )}
    />
  );
}
