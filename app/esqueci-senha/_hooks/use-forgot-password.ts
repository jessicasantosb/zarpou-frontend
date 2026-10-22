"use client";

import { useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api, ApiError } from "@/lib/api";
import {
  forgotPasswordSchema,
  ForgotPasswordValues,
} from "@/schemas/password-reset";

export function useForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [error, setError] = useState("");

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema) as Resolver<ForgotPasswordValues>,
    defaultValues: { email: "" },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setError("");
    setLoading(true);
    try {
      // Resposta idêntica exista ou não a conta (evita enumeração de e-mails)
      await api.post<{ success: boolean; message: string }>(
        "/auth/customer/password/forgot",
        { email: values.email },
        { skipAuth: true },
      );
      setSentTo(values.email);
    } catch (err) {
      if (err instanceof ApiError && err.status === 429) {
        setError(
          "Muitas solicitações em pouco tempo. Aguarde alguns minutos e tente novamente.",
        );
      } else {
        setError(
          err instanceof Error
            ? err.message
            : "Não foi possível processar sua solicitação. Tente novamente.",
        );
      }
    } finally {
      setLoading(false);
    }
  });

  const sendToAnotherEmail = () => {
    setSentTo(null);
    form.reset();
  };

  return {
    form,
    loading,
    sentTo,
    error,
    onSubmit,
    sendToAnotherEmail,
  };
}
