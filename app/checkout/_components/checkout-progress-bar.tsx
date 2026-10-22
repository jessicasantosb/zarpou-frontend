import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { step: 1, label: "Viajantes" },
  { step: 2, label: "Opcionais & Proteção" },
  { step: 3, label: "Pagamento Seguro" },
];

interface CheckoutProgressBarProps {
  currentStep: 1 | 2 | 3;
}

export function CheckoutProgressBar({ currentStep }: CheckoutProgressBarProps) {
  return (
    <div className="max-w-4xl mx-auto mb-8">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted -z-0" />
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary transition-all duration-300 -z-0"
          style={{
            width:
              currentStep === 1
                ? "0%"
                : currentStep === 2
                  ? "50%"
                  : "100%",
          }}
        />

        {STEPS.map((s) => (
          <div
            key={s.step}
            className="flex flex-col items-center relative z-10"
          >
            <div
              className={cn(
                "size-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-sm",
                currentStep >= s.step
                  ? "bg-primary text-white ring-4 ring-primary/20"
                  : "bg-card text-muted-foreground/70 border border-input",
              )}
            >
              {currentStep > s.step ? (
                <CheckCircle2 className="size-5" />
              ) : (
                s.step
              )}
            </div>
            <span
              className={cn(
                "text-xs font-semibold mt-2",
                currentStep >= s.step ? "text-primary" : "text-muted-foreground",
              )}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
