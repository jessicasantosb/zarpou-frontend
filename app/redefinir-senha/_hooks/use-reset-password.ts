"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Resolver, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { PasswordCriteria } from "@/components/shared/password-checklist";
import { api, ApiError } from "@/lib/api";
import { passwordChecks } from "@/lib/password-rules";
import {
  resetPasswordSchema,
  ResetPasswordValues,
} from "@/schemas/password-reset";

export function useResetPassword() {
  const router = useRouter();
  const token = useSearchParams().get("token");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema) as Resolver<ResetPasswordValues>,
    defaultValues: { password: "", confirmPassword: "" },
  });

  const password = useWatch({ control: form.control, name: "password" });

  const passwordCriteria = useMemo<PasswordCriteria>(
    () => ({
      hasMinLength: passwordChecks.hasMinLength(password),
      hasUpperCase: passwordChecks.hasUpperCase(password),
      hasNumber: passwordChecks.hasNumber(password),
      hasSpecialChar: passwordChecks.hasSpecialChar(password),
    }),
    [password],
  );
  const fulfilledCount = Object.values(passwordCriteria).filter(Boolean).length;

  const onSubmit = form.handleSubmit(async (values) => {
    if (!token) return;
    setError("");
    setLoading(true);
    try {
      const res = await api.post<{ success: boolean; message: string }>(
        "/auth/customer/password/reset",
        { token, password: values.password },
        { skipAuth: true },
      );
      toast.success(res.message || "Senha redefinida com sucesso!");
      router.push("/login");
    } catch (err) {
      if (err instanceof ApiError && err.status === 429) {
        setError(
          "Muitas tentativas em pouco tempo. Aguarde alguns minutos e solicite um novo link.",
        );
      } else {
        setError(
          err instanceof Error
            ? err.message
            : "Não foi possível redefinir sua senha. Solicite um novo link.",
        );
      }
      setLoading(false);
    }
  });

  return {
    token,
    form,
    showPassword,
    setShowPassword,
    showConfirm,
    setShowConfirm,
    passwordCriteria,
    fulfilledCount,
    error,
    setError,
    loading,
    onSubmit,
  };
}
