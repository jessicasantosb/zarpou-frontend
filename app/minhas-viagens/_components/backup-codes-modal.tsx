import { toast } from "react-toastify";
import { Copy, Key, X } from "lucide-react";

interface BackupCodesModalProps {
  codes: string[];
  onClose: () => void;
}

export function BackupCodesModal({ codes, onClose }: BackupCodesModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-card rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-xl border border-border/60 relative animate-in zoom-in-95 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
          <div className="flex items-center gap-2">
            <Key className="size-5 text-secondary" />
            <h3 className="font-bold text-foreground text-base">
              Seus Códigos de Recuperação
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground/70 p-1 rounded-lg"
          >
            <X className="size-5" />
          </button>
        </div>

        <p className="text-xs text-muted-foreground">
          Utilize um destes códigos caso não consiga acessar seu método de
          autenticação principal:
        </p>

        <div className="grid grid-cols-2 gap-2 bg-muted p-4 rounded-2xl border border-border">
          {codes.map((code, idx) => (
            <div
              key={idx}
              className="bg-card p-2.5 rounded-xl border border-border font-mono text-center text-xs font-bold text-foreground"
            >
              {code}
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(codes.join("\n"));
              toast.info("Códigos copiados!");
            }}
            className="px-5 py-2.5 bg-primary text-white font-bold text-xs rounded-xl flex items-center gap-2"
          >
            <Copy className="size-3.5" />
            <span>Copiar Códigos</span>
          </button>
        </div>
      </div>
    </div>
  );
}
