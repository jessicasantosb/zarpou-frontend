import type { UseFormReturn } from "react-hook-form";
import { Lock } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import type { AdminUserFormValues } from "@/schemas/admin-user-form";

interface AccountStatusFieldProps {
  form: UseFormReturn<AdminUserFormValues>;
  isEditing: boolean;
  isSelfAccount: boolean;
}

export function AccountStatusField({
  form,
  isEditing,
  isSelfAccount,
}: AccountStatusFieldProps) {
  if (isEditing && isSelfAccount) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-[11px] font-semibold text-amber-900">
        <Lock className="size-4 shrink-0 text-amber-700" />
        Esta é sua própria conta. Ela permanecerá ativa por segurança.
      </div>
    );
  }

  return (
    <FormField
      control={form.control}
      name="isActive"
      render={({ field }) => (
        <FormItem className="flex items-center gap-2 pt-2">
          <FormControl>
            <input
              type="checkbox"
              checked={field.value}
              onChange={(event) => field.onChange(event.target.checked)}
              className="size-4 shrink-0 cursor-pointer rounded text-primary focus:ring-secondary"
            />
          </FormControl>
          <FormLabel className="cursor-pointer text-xs font-bold text-foreground/80">
            Conta ativa para login no painel
          </FormLabel>
        </FormItem>
      )}
    />
  );
}
