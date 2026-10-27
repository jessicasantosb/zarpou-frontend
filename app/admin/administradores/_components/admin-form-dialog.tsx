"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Mail, ShieldCheck, UserIcon, X } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  ALL_ADMIN_SCREEN_IDS,
  getAdminScreens,
  isGeneralAdminUser,
} from "@/lib/admin-access";
import {
  adminUserFormSchema,
  type AdminUserFormValues,
} from "@/schemas/admin-user-form";
import { useAdminUsersStore } from "@/stores/admin-users-store";
import { useAuthStore } from "@/stores/auth-store";
import { AdminRole, AdminUser } from "@/types/user";
import { AccountStatusField } from "./account-status-field";
import { PasswordField } from "./password-field";
import { ScreensPermissionField } from "./screens-permission-field";
import { TwoFactorSection } from "./two-factor-section";

interface AdminFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  admin: AdminUser | null;
  isSuperAdmin: boolean;
}

export function AdminFormDialog({
  open,
  onOpenChange,
  admin,
  isSuperAdmin,
}: AdminFormDialogProps) {
  const { user: currentAdmin } = useAuthStore();
  const { createAdmin, updateAdmin } = useAdminUsersStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = Boolean(admin);
  const isSelfAccount = Boolean(
    admin &&
      currentAdmin &&
      (admin.id === currentAdmin.id ||
        admin.email.toLowerCase() === currentAdmin.email.toLowerCase()),
  );

  const form = useForm<AdminUserFormValues>({
    resolver: zodResolver(adminUserFormSchema(isEditing)),
    defaultValues: {
      name: admin?.name ?? "",
      email: admin?.email ?? "",
      password: "",
      confirmPassword: "",
      isGeneralAdmin: admin ? isGeneralAdminUser(admin) : false,
      allowedScreens: admin ? getAdminScreens(admin) : [],
      isActive: admin?.isActive ?? true,
      twoFactorEnabled: admin?.twoFactorEnabled ?? false,
    },
  });

  const onSubmit = async (values: AdminUserFormValues) => {
    const assignedRole: AdminRole = values.isGeneralAdmin
      ? "admin"
      : "personalizado";
    const assignedScreens = values.isGeneralAdmin
      ? [...ALL_ADMIN_SCREEN_IDS]
      : values.allowedScreens;

    setIsSubmitting(true);
    try {
      if (admin) {
        const result = await updateAdmin(admin.id, {
          name: values.name,
          email: values.email,
          role: assignedRole,
          password: values.password.trim() || undefined,
          allowedScreens: assignedScreens,
          isActive: isSelfAccount ? true : values.isActive,
          twoFactorEnabled: values.twoFactorEnabled,
          twoFactorMethod: admin.twoFactorMethod || "email",
          twoFactorSecret: values.twoFactorEnabled
            ? admin.twoFactorSecret
            : undefined,
          backupCodes: values.twoFactorEnabled ? admin.backupCodes : undefined,
        });

        if (result.success) {
          toast.success("Administrador atualizado com sucesso!");
          onOpenChange(false);
        } else {
          toast.error(result.message || "Erro ao atualizar administrador.");
        }
        return;
      }

      const result = await createAdmin({
        name: values.name,
        email: values.email,
        password: values.password.trim(),
        role: assignedRole,
        allowedScreens: assignedScreens,
        isActive: values.isActive,
        twoFactorEnabled: values.twoFactorEnabled,
        twoFactorMethod: "email",
      });

      if (result.success) {
        toast.success("Novo administrador cadastrado com sucesso!");
        onOpenChange(false);
      } else {
        toast.error(result.message || "Erro ao criar administrador.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="grid max-h-[92vh] grid-rows-[auto_minmax(0,1fr)] gap-0 overflow-hidden rounded-3xl border-border bg-card p-0  sm:max-w-lg"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-border/60 p-6">
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-primary/10 p-2 text-primary">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <DialogTitle className="text-base font-black text-foreground">
                {isEditing ? "Editar Administrador" : "Novo Administrador"}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                {isEditing
                  ? "Atualize as permissões ou senha do colaborador"
                  : "Conceda acesso administrativo definindo as telas permitidas"}
              </DialogDescription>
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            title="Fechar"
            className="size-8 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground/70"
          >
            <X className="size-5" />
          </Button>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex min-h-0 flex-col gap-4 overflow-y-auto p-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    required
                    className="text-xs font-bold text-foreground/80"
                  >
                    Nome Completo
                  </FormLabel>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Ex: Rafaela Medeiros"
                        className="rounded-xl border-border bg-muted pl-9 text-xs focus:bg-card"
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-[11px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    required
                    className="text-xs font-bold text-foreground/80"
                  >
                    E-mail Corporativo
                  </FormLabel>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="rafaela@zarpou.com.br"
                        className="rounded-xl border-border bg-muted pl-9 text-xs focus:bg-card"
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-[11px]" />
                </FormItem>
              )}
            />

            <PasswordField form={form} isEditing={isEditing} />

            <ScreensPermissionField form={form} isSuperAdmin={isSuperAdmin} />

            <TwoFactorSection form={form} isEditing={isEditing} />

            <AccountStatusField
              form={form}
              isEditing={isEditing}
              isSelfAccount={isSelfAccount}
            />

            <div className="mt-auto flex items-center justify-end gap-2 border-t border-border/60 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="h-auto rounded-xl border-border bg-muted px-4 py-2 text-xs font-semibold text-foreground/70 hover:bg-border"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-auto rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white  hover:bg-primary/90"
              >
                {isSubmitting
                  ? "Salvando..."
                  : isEditing
                    ? "Salvar Alterações"
                    : "Cadastrar"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
