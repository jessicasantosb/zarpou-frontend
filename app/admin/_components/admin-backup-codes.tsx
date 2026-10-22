import { Copy } from "lucide-react";

interface AdminBackupCodesProps {
  codes: string[];
  copied: boolean;
  onCopy: () => void;
}

export function AdminBackupCodes({ codes, copied, onCopy }: AdminBackupCodesProps) {
  return (
    <div className="space-y-1.5 pt-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-foreground/80">Códigos de Recuperação</span>
        <button
          type="button"
          onClick={onCopy}
          className="text-[11px] text-primary hover:underline font-bold flex items-center gap-1 cursor-pointer"
        >
          <Copy className="size-3" />
          <span>{copied ? "Copiados!" : "Copiar códigos"}</span>
        </button>
      </div>
      <p className="text-[10px] text-muted-foreground">
        Guarde estes códigos em local seguro. Você pode usar qualquer um deles caso perca acesso ao seu app ou e-mail.
      </p>
      <div className="grid grid-cols-3 gap-1.5 bg-muted p-2.5 rounded-xl border border-border font-mono text-center text-[11px] font-bold text-foreground/80">
        {codes.slice(0, 3).map((c, i) => (
          <span key={i} className="bg-card py-1 rounded border border-border/60">{c}</span>
        ))}
      </div>
    </div>
  );
}
