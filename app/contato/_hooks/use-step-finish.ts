"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { sendContactEmail } from "@/lib/send-contact-email";
import { whatsappNumber } from "@/lib/whatsapp-link";
import { useConfigStore } from "@/stores/config-store";
import { useInfoStore } from "@/stores/info-store";

export function useStepFinish() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">(
    "idle",
  );
  const { config } = useConfigStore();

  const { client, destinationInfo, travelInfo, resetInfo } = useInfoStore(
    (state) => state,
  );

  const whatsappNum = config?.whatsapp || whatsappNumber;

  const handleSubmit = async () => {
    setStatus("loading");

    const values = {
      ...client,
      ...destinationInfo,
      ...travelInfo,
    };

    try {
      await sendContactEmail(values);
      setStatus("success");
      toast.success("Solicitação enviada com sucesso!");
    } catch (error) {
      setStatus("idle");
      console.error(error);
      toast.error("Erro ao enviar a mensagem. Tente novamente.");
    }
  };

  const handleReset = () => {
    resetInfo();
    setStatus("idle");
  };

  return {
    status,
    client,
    destinationInfo,
    whatsappNum,
    onSubmit: handleSubmit,
    onReset: handleReset,
  };
}
