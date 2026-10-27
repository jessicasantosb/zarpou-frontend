"use client";

import { CheckCircle2, Compass, MapPin, Sparkles, User } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { StepsProps, SetStepProps } from "@/types/checkout-steps";
import { useContactForm } from "../_hooks/use-contact-form";
import { StepDestinationInfo } from "./_form-steps/step-destination-info";
import { StepFinish } from "./_form-steps/step-finish";
import { StepTravelInfo } from "./_form-steps/step-travel-info";
import { StepUser } from "./_form-steps/step-user";

type StepsElementsProps = {
  stepIndex: number;
  progressBar: number;
  stepTitle: string;
  stepSubtitle: string;
  stepField: React.JSX.Element;
};

const STEPS_NAV = [
  { id: "user", label: "Identificação", icon: User },
  { id: "destinationInfo", label: "Destino", icon: MapPin },
  { id: "travelInfo", label: "Preferências", icon: Compass },
  { id: "finish", label: "Revisão", icon: CheckCircle2 },
];

function buildSteps({ setStep }: SetStepProps): Record<StepsProps, StepsElementsProps> {
  return {
    user: {
      stepIndex: 1,
      progressBar: 25,
      stepTitle: "Dados do Viajante",
      stepSubtitle: "Como podemos chamar você e enviar seu itinerário?",
      stepField: <StepUser setStep={setStep} />,
    },
    destinationInfo: {
      stepIndex: 2,
      progressBar: 50,
      stepTitle: "Destino & Datas Desejadas",
      stepSubtitle:
        "Conte-nos para onde você deseja embarcar e o período previsto.",
      stepField: <StepDestinationInfo setStep={setStep} />,
    },
    travelInfo: {
      stepIndex: 3,
      progressBar: 75,
      stepTitle: "Preferências de Viagem",
      stepSubtitle:
        "Personalize sua experiência: hospedagem, aéreo e orçamentos.",
      stepField: <StepTravelInfo setStep={setStep} />,
    },
    finish: {
      stepIndex: 4,
      progressBar: 100,
      stepTitle: "Revisão e Envio",
      stepSubtitle: "Confirme seus dados e receba sua cotação sem compromisso.",
      stepField: <StepFinish />,
    },
  };
}

export function ContactForm() {
  const { step, setStep, stepContainerRef } = useContactForm();

  const elements = buildSteps({ setStep });
  const { stepIndex, progressBar, stepTitle, stepSubtitle, stepField } =
    elements[step];

  return (
    <div
      id="form-contato"
      ref={stepContainerRef}
      className="w-full scroll-mt-24"
    >
      <div className="bg-card rounded-3xl p-6 sm:p-8 md:p-10  border border-border/80">
        <div className="border-b border-border/60 pb-6 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/15 text-primary text-xs font-bold tracking-wide mb-2">
            <Sparkles className="size-3 text-secondary fill-secondary" />
            <span>Cotação &amp; Consultoria Grátis</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Monte seu Roteiro com Nossos Especialistas
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Preencha os dados em 4 passos rápidos. Nossos consultores retornarão
            com tarifas promocionais e opções personalizadas.
          </p>
        </div>

        <div className="mb-8">
          <div className="grid grid-cols-4 gap-2 mb-3">
            {STEPS_NAV.map((nav, idx) => {
              const Icon = nav.icon;
              const isCurrent = step === nav.id;
              const isDone = idx + 1 < stepIndex;

              return (
                <div
                  key={nav.id}
                  className={`flex flex-col items-center sm:items-start p-2.5 rounded-xl transition-all ${
                    isCurrent
                      ? "bg-primary/5 text-primary border border-primary/20"
                      : isDone
                        ? "text-foreground/80"
                        : "text-muted-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`size-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        isCurrent
                          ? "bg-primary text-white "
                          : isDone
                            ? "bg-emerald-500 text-white"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isDone ? "✓" : idx + 1}
                    </span>
                    <Icon className="size-4 hidden sm:block" />
                  </div>
                  <span className="text-[11px] font-bold mt-1.5 hidden sm:block truncate">
                    {nav.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] font-bold text-muted-foreground">
              <span className="text-primary font-bold">
                Passo {stepIndex} de 4: {stepTitle}
              </span>
              <span>{progressBar}% concluído</span>
            </div>
            <Progress value={progressBar} className="h-2 rounded-full" />
          </div>
        </div>

        <div className="mb-6 bg-muted/50 rounded-2xl p-4 border border-border/60 flex items-center justify-between">
          <div>
            <h4 className="font-extrabold text-foreground text-sm">
              {stepTitle}
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">{stepSubtitle}</p>
          </div>
          <span className="text-xs font-bold text-primary bg-secondary/20 px-2.5 py-1 rounded-lg">
            Etapa {stepIndex}/4
          </span>
        </div>

        <div className="transition-all duration-300">{stepField}</div>
      </div>
    </div>
  );
}
