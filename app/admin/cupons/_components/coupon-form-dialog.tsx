"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitErrorHandler } from "react-hook-form";
import { Bell, Dice5, Loader2, Ticket, X } from "lucide-react";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
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
import { api } from "@/lib/api";
import {
  buildCouponFormValues,
  couponFormSchema,
  type CouponFormValues,
} from "@/schemas/coupon-form";
import { useCouponStore } from "@/stores/coupon-store";
import { Coupon } from "@/types/coupon";

interface CouponFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  coupon: Coupon | null;
}

const inputClass =
  "w-full h-11 px-3.5 rounded-xl border border-input text-xs font-medium outline-hidden focus:border-primary bg-muted";

export function CouponFormDialog({
  open,
  onOpenChange,
  coupon,
}: CouponFormDialogProps) {
  const { addCoupon, updateCoupon, markNotificationSent } = useCouponStore();
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<CouponFormValues>({
    resolver: zodResolver(couponFormSchema),
    defaultValues: buildCouponFormValues(coupon ?? undefined),
  });

  const watchedDiscountType = form.watch("discountType");
  const watchedNotify = form.watch("notifyOnCreate");

  const handleGenerateCode = async () => {
    setIsGenerating(true);
    try {
      const code = await useCouponStore.getState().generateCode(undefined, 10);
      form.setValue("code", code, { shouldValidate: true });
      toast.info(`Código aleatório gerado: ${code}`);
    } catch (err) {
      console.error("Erro ao gerar código de cupom:", err);
      toast.error("Erro ao gerar o código do cupom. Tente novamente.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleError: SubmitErrorHandler<CouponFormValues> = (errors) => {
    if (errors.code) {
      toast.warning(errors.code.message);
    } else if (errors.discountValue) {
      toast.warning(errors.discountValue.message);
    }
  };

  const onSubmit = async (values: CouponFormValues) => {
    const payload = {
      code: values.code.trim().toUpperCase(),
      description: values.description.trim() || null,
      discountType: values.discountType,
      discountValue: Number(values.discountValue),
      minOrderAmount:
        values.minOrderAmount === "" ? null : Number(values.minOrderAmount),
      maxUses: values.maxUses === "" ? null : Number(values.maxUses),
      perCustomerLimit: Number(values.perCustomerLimit),
      validFrom: values.validFrom || null,
      validTo: values.validTo || null,
      active: values.active,
    };

    try {
      if (coupon) {
        const shouldNotifyNow =
          values.notifyOnCreate && !coupon.notificationSent;

        await updateCoupon(coupon.id, payload);

        if (shouldNotifyNow) {
          markNotificationSent(coupon.id);
          api.post(`/coupons/${coupon.id}/notify`).catch(() => {});
          toast.success(
            "Cupom atualizado e notificações disparadas aos clientes (WhatsApp e E-mail)!",
          );
        } else {
          toast.success("Cupom atualizado com sucesso!");
        }
      } else {
        const created = await addCoupon(payload);

        if (values.notifyOnCreate) {
          markNotificationSent(created.id);
          api.post(`/coupons/${created.id}/notify`).catch(() => {});
          toast.success(
            "Cupom criado com sucesso! Notificações enviadas aos viajantes inscritos.",
          );
        } else {
          toast.success("Cupom criado com sucesso!");
        }
      }

      onOpenChange(false);
    } catch (err: unknown) {
      console.error("Erro ao salvar cupom:", err);
      const msg =
        err instanceof Error ? err.message : "Erro ao salvar cupom no servidor.";
      toast.error(msg);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        aria-describedby={undefined}
        className="grid max-h-[90vh] grid-rows-[auto_minmax(0,1fr)] gap-0 overflow-hidden rounded-3xl border-border bg-card p-0  sm:max-w-xl"
      >
        <div className="flex items-center justify-between p-6 pb-4 border-b border-border/60 shrink-0 bg-card">
          <DialogTitle className="flex items-center gap-2 text-lg font-bold text-foreground">
            <Ticket className="size-5 text-primary" />
            {coupon ? "Editar Cupom" : "Novo Cupom de Desconto"}
          </DialogTitle>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="text-muted-foreground hover:text-foreground/80 font-bold p-1 rounded-lg hover:bg-muted transition cursor-pointer"
          >
            <X className="size-5" />
          </button>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, handleError)}
            className="flex min-h-0 flex-col overflow-hidden"
          >
            <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="gap-0 space-y-1">
                    <FormLabel required className="font-bold text-foreground/80">
                      Código do Cupom
                    </FormLabel>
                    <div className="flex gap-2">
                      <FormControl className="flex-1">
                        <input
                          type="text"
                          name={field.name}
                          ref={field.ref}
                          onBlur={field.onBlur}
                          value={field.value}
                          placeholder="Ex: ZARPOU10"
                          onChange={(event) =>
                            field.onChange(event.target.value.toUpperCase())
                          }
                          className={`${inputClass} font-mono font-bold uppercase tracking-wide`}
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={handleGenerateCode}
                        disabled={isGenerating}
                        title="Gerar código aleatório"
                        className="flex items-center gap-1.5 px-4 rounded-xl border border-primary/40 bg-primary/5 text-primary text-[11px] font-bold hover:bg-primary/10 transition disabled:opacity-60 cursor-pointer shrink-0"
                      >
                        {isGenerating ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <Dice5 className="size-4" />
                        )}
                        Gerar
                      </button>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      Sempre em maiúsculas: apenas letras, números, &quot;-&quot; ou
                      &quot;_&quot;. Clique em Gerar para um código aleatório único.
                    </p>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="gap-0 space-y-1">
                    <FormLabel className="font-bold text-foreground/80">
                      Descrição (opcional)
                    </FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        name={field.name}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        value={field.value}
                        placeholder="Ex: Black Friday — desconto especial em pacotes"
                        onChange={(event) => field.onChange(event.target.value)}
                        className={inputClass}
                      />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="discountType"
                  render={({ field }) => (
                    <FormItem className="gap-0 space-y-1">
                      <FormLabel required className="font-bold text-foreground/80">
                        Tipo de Desconto
                      </FormLabel>
                      <FormControl>
                        <select
                          name={field.name}
                          ref={field.ref}
                          onBlur={field.onBlur}
                          value={field.value}
                          onChange={(event) =>
                            field.onChange(
                              event.target.value as "percent" | "fixed",
                            )
                          }
                          className={inputClass}
                        >
                          <option value="percent">Percentual (%)</option>
                          <option value="fixed">Valor fixo (R$)</option>
                        </select>
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="discountValue"
                  render={({ field }) => (
                    <FormItem className="gap-0 space-y-1">
                      <FormLabel required className="font-bold text-foreground/80">
                        {watchedDiscountType === "percent"
                          ? "Percentual (%)"
                          : "Valor (R$)"}
                      </FormLabel>
                      <FormControl>
                        <input
                          type="number"
                          min={0}
                          step="0.01"
                          name={field.name}
                          ref={field.ref}
                          onBlur={field.onBlur}
                          value={field.value}
                          placeholder={
                            watchedDiscountType === "percent" ? "10" : "50,00"
                          }
                          onChange={(event) => field.onChange(event.target.value)}
                          className={inputClass}
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <FormField
                  control={form.control}
                  name="minOrderAmount"
                  render={({ field }) => (
                    <FormItem className="gap-0 space-y-1">
                      <FormLabel className="font-bold text-foreground/80">
                        Pedido Mínimo (R$)
                      </FormLabel>
                      <FormControl>
                        <input
                          type="number"
                          min={0}
                          step="0.01"
                          name={field.name}
                          ref={field.ref}
                          onBlur={field.onBlur}
                          value={field.value}
                          placeholder="Opcional"
                          onChange={(event) => field.onChange(event.target.value)}
                          className={inputClass}
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maxUses"
                  render={({ field }) => (
                    <FormItem className="gap-0 space-y-1">
                      <FormLabel className="font-bold text-foreground/80">
                        Limite Total
                      </FormLabel>
                      <FormControl>
                        <input
                          type="number"
                          min={1}
                          step="1"
                          name={field.name}
                          ref={field.ref}
                          onBlur={field.onBlur}
                          value={field.value}
                          placeholder="Ilimitado"
                          onChange={(event) => field.onChange(event.target.value)}
                          className={inputClass}
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="perCustomerLimit"
                  render={({ field }) => (
                    <FormItem className="gap-0 space-y-1">
                      <FormLabel required className="font-bold text-foreground/80">
                        Por Cliente
                      </FormLabel>
                      <FormControl>
                        <input
                          type="number"
                          min={1}
                          step="1"
                          name={field.name}
                          ref={field.ref}
                          onBlur={field.onBlur}
                          value={field.value}
                          onChange={(event) => field.onChange(event.target.value)}
                          className={inputClass}
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="validFrom"
                  render={({ field }) => (
                    <FormItem className="gap-0 space-y-1">
                      <FormLabel className="font-bold text-foreground/80">
                        Válido desde
                      </FormLabel>
                      <FormControl>
                        <input
                          type="date"
                          name={field.name}
                          ref={field.ref}
                          onBlur={field.onBlur}
                          value={field.value}
                          onChange={(event) => field.onChange(event.target.value)}
                          className={inputClass}
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="validTo"
                  render={({ field }) => (
                    <FormItem className="gap-0 space-y-1">
                      <FormLabel className="font-bold text-foreground/80">
                        Válido até
                      </FormLabel>
                      <FormControl>
                        <input
                          type="date"
                          name={field.name}
                          ref={field.ref}
                          onBlur={field.onBlur}
                          value={field.value}
                          onChange={(event) => field.onChange(event.target.value)}
                          className={inputClass}
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-muted/40">
                <div>
                  <p className="text-xs font-bold text-foreground">
                    Cupom ativo
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    Cupons inativos não podem ser usados no checkout nem notificados.
                  </p>
                </div>
                <FormField
                  control={form.control}
                  name="active"
                  render={({ field }) => (
                    <FormControl>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={field.value}
                        onClick={() => field.onChange(!field.value)}
                        className={`relative w-11 h-6 rounded-full transition cursor-pointer ${
                          field.value ? "bg-primary" : "bg-border"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 size-5 rounded-full bg-card shadow transition-all ${
                            field.value ? "left-[22px]" : "left-0.5"
                          }`}
                        />
                      </button>
                    </FormControl>
                  )}
                />
              </div>

              <label
                className={`flex items-start gap-3 p-3.5 rounded-xl border transition cursor-pointer ${
                  watchedNotify
                    ? "border-primary/40 bg-primary/5"
                    : "border-border bg-muted/40"
                }`}
              >
                <input
                  type="checkbox"
                  checked={watchedNotify}
                  onChange={(event) =>
                    form.setValue("notifyOnCreate", event.target.checked)
                  }
                  disabled={Boolean(coupon?.notificationSent)}
                  className="mt-0.5 size-4 accent-primary"
                />
                <span>
                  <span className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                    <Bell className="size-3.5 text-primary" />
                    Notificar clientes inscritos
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    Envia o código do cupom por WhatsApp e E-mail para clientes
                    com opt-in de promoções.
                    {coupon?.notificationSent &&
                      " A notificação deste cupom já foi enviada — reenvie pela tabela."}
                  </span>
                </span>
              </label>
            </div>

            <div className="p-6 pt-4 border-t border-border/60 flex items-center justify-end gap-3 shrink-0 bg-card">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="px-4 py-2.5 rounded-xl border border-input text-foreground/70 font-semibold hover:bg-muted transition cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition  cursor-pointer"
              >
                {coupon ? "Salvar Alterações" : "Criar Cupom"}
              </button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
