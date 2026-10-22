"use client";

import { useEffect, useRef, useState } from "react";
import { StepsProps } from "@/types/checkout-steps";

export function useContactForm() {
  const [step, setStep] = useState<StepsProps>("user");
  const stepContainerRef = useRef<HTMLDivElement>(null);
  const prevStep = useRef<StepsProps>(step);

  useEffect(() => {
    if (prevStep.current !== step) {
      prevStep.current = step;

      stepContainerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [step]);

  return {
    step,
    setStep,
    stepContainerRef,
  };
}
