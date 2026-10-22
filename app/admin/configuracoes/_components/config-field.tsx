import type { ReactNode } from "react";
import type {
  Control,
  ControllerRenderProps,
  FieldPath,
} from "react-hook-form";
import type { LucideIcon } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { AgencyConfigFormValues } from "@/schemas/agency-config";
import { cn } from "@/lib/utils";

interface ConfigFieldProps {
  control: Control<AgencyConfigFormValues>;
  name: FieldPath<AgencyConfigFormValues>;
  label: string;
  hint?: ReactNode;
  helper?: ReactNode | ((value: string) => ReactNode);
  icon?: LucideIcon;
  type?: string;
  placeholder?: string;
  mono?: boolean;
  required?: boolean;
  transform?: (value: string) => string;
  options?: Array<{ value: string; label: string }>;
  render?: (field: ControllerRenderProps<AgencyConfigFormValues>) => ReactNode;
  className?: string;
}

export function ConfigField({
  control,
  name,
  label,
  hint,
  helper,
  icon: Icon,
  type = "text",
  placeholder,
  mono,
  required,
  transform,
  options,
  render,
  className,
}: ConfigFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("space-y-1", className)}>
          <div className="flex min-h-6 items-center justify-between gap-2">
            <FormLabel
              required={required}
              className="text-xs font-bold tracking-wide text-foreground/80"
            >
              {label}
            </FormLabel>
            {hint && (
              <span className="text-[10px] font-normal text-muted-foreground">
                {hint}
              </span>
            )}
          </div>

          {render ? (
            render(field)
          ) : options ? (
            <FormControl>
              <select
                value={String(field.value)}
                onChange={(event) => field.onChange(event.target.value)}
                className="h-11 w-full cursor-pointer rounded-xl border border-input bg-card px-3.5 text-xs font-semibold outline-hidden focus:border-primary"
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </FormControl>
          ) : (
            <div className="relative">
              {Icon && (
                <Icon className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              )}
              <FormControl>
                <Input
                  type={type}
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
                    "h-11 rounded-xl border-input text-xs font-medium outline-hidden focus:border-primary",
                    Icon && "pl-10",
                    mono && "font-mono",
                  )}
                />
              </FormControl>
            </div>
          )}

          {helper !== undefined && (
            <div className="text-[10px] text-muted-foreground">
              {typeof helper === "function" ? helper(String(field.value ?? "")) : helper}
            </div>
          )}
          <FormMessage className="text-[10px]" />
        </FormItem>
      )}
    />
  );
}
