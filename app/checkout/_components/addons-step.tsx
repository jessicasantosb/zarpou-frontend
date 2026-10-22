import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { AddonItem } from "@/types/checkout";

interface AddonsStepProps {
  addons: AddonItem[];
  onToggle: (addonId: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export function AddonsStep({ addons, onToggle, onBack, onNext }: AddonsStepProps) {
  return (
    <div className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-xs space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-border/60">
        <div>
          <h2 className="text-xl font-extrabold text-foreground">
            2. Personalize sua Viagem (Opcionais)
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Adicione coberturas extras e comodidades com tarifas exclusivas de
            parceiro.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {addons.length === 0 ? (
          <div className="p-8 text-center bg-muted border border-dashed border-border rounded-2xl">
            <p className="text-sm font-semibold text-foreground/80">
              Nenhum serviço opcional adicional para esta viagem no momento.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Você pode avançar diretamente para a etapa de pagamento.
            </p>
          </div>
        ) : (
          addons.map((addon) => (
            <div
              key={addon.id}
              onClick={() => onToggle(addon.id)}
              className={cn(
                "p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-4",
                addon.selected
                  ? "border-primary bg-primary/5 shadow-xs"
                  : "border-border hover:border-input bg-card",
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "size-6 rounded-lg border-2 mt-0.5 flex items-center justify-center shrink-0",
                    addon.selected
                      ? "bg-primary border-primary text-white"
                      : "border-input bg-card",
                  )}
                >
                  {addon.selected && <CheckCircle2 className="size-4" />}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">
                    {addon.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {addon.description}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-base font-extrabold text-primary">
                  + R$ {addon.price.toFixed(2)}
                </span>
                <p className="text-[10px] text-muted-foreground">
                  único por reserva
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="pt-4 border-t border-border/60 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-3 border border-input text-foreground/80 font-semibold text-xs rounded-xl hover:bg-muted/50 transition flex items-center gap-1.5"
        >
          <ArrowLeft className="size-4" />
          Voltar
        </button>

        <button
          type="button"
          onClick={onNext}
          className="px-8 py-3.5 bg-secondary hover:bg-secondary/90 text-primary font-bold text-sm rounded-xl flex items-center gap-2 shadow-lg shadow-secondary/20 transition cursor-pointer"
        >
          Ir para Pagamento
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
