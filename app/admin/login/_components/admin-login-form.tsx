import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Loader2, Lock, Mail } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { AdminLoginValues } from "@/schemas/admin-login";

interface AdminLoginFormProps {
  form: UseFormReturn<AdminLoginValues>;
  error: string;
  loading: boolean;
  onSubmit: () => void;
}

const inputClassName =
  "w-full h-12 pl-10 pr-4 rounded-xl border border-input text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-hidden";

export function AdminLoginForm({ form, error, loading, onSubmit }: AdminLoginFormProps) {
  return (
    <>
      <div className="text-center space-y-2">
        <div className="relative size-16 mx-auto mb-2">
          <Image src="/logo/logo.svg" alt="Zarpou" fill className="object-contain" />
        </div>
        <h1 className="text-2xl font-black text-foreground">Painel da Agência</h1>
        <p className="text-xs text-muted-foreground">
          Acesso administrativo e gestão da Zarpou Viagens
        </p>
      </div>

      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-xs font-semibold rounded-xl text-center">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-xs font-bold tracking-wide text-foreground/80">
                E-mail de Acesso
              </FormLabel>
              <div className="relative">
                <Mail className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <FormControl>
                  <input type="text" placeholder="admin@zarpou.com.br" {...field} className={inputClassName} />
                </FormControl>
              </div>
              <FormMessage className="text-[10px]" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-xs font-bold tracking-wide text-foreground/80">
                Senha
              </FormLabel>
              <div className="relative">
                <Lock className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <FormControl>
                  <input type="password" placeholder="••••••••" {...field} className={inputClassName} />
                </FormControl>
              </div>
              <FormMessage className="text-[10px]" />
            </FormItem>
          )}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2   transition cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin text-secondary" />
              <span>Acessando painel...</span>
            </>
          ) : (
            <>
              <span>Acessar Painel</span>
              <ArrowRight className="size-4 text-secondary" />
            </>
          )}
        </button>
      </form>

      <div className="text-center pt-2 border-t border-border/60">
        <Link
          href="/"
          className="text-xs font-semibold text-muted-foreground hover:text-primary transition"
        >
          ← Voltar para o site público
        </Link>
      </div>
    </>
  );
}
