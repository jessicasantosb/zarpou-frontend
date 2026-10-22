"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Resolver, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCustomerAuthStore } from "@/stores/customer-auth-store";
import {
  customerLoginSchema,
  userRegistrationSchema,
} from "@/schemas/customer-login";
import { passwordChecks } from "@/lib/password-rules";

export interface CustomerLoginValues {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  password: string;
}

export function useCustomerLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/minhas-viagens";

  const {
    login,
    register: registerAccount,
    pendingTwoFactor,
    verifyTwoFactor,
    cancelTwoFactor,
    sendTwoFactorEmailCode,
    switchTwoFactorMethod,
  } = useCustomerAuthStore();

  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  const form = useForm<CustomerLoginValues>({
    resolver: zodResolver(
      isRegister ? userRegistrationSchema : customerLoginSchema,
    ) as Resolver<CustomerLoginValues>,
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      cpf: "",
      password: "",
    },
  });

  const password = useWatch({ control: form.control, name: "password" });
  const cpf = useWatch({ control: form.control, name: "cpf" }) ?? "";

  const passwordCriteria = useMemo(() => {
    return {
      hasMinLength: passwordChecks.hasMinLength(password),
      hasUpperCase: passwordChecks.hasUpperCase(password),
      hasNumber: passwordChecks.hasNumber(password),
      hasSpecialChar: passwordChecks.hasSpecialChar(password),
    };
  }, [password]);

  const fulfilledCount = Object.values(passwordCriteria).filter(Boolean).length;

  const onInvalid = () => {
    if (isRegister) {
      const validation = userRegistrationSchema.safeParse(form.getValues());
      setError(
        validation.error?.issues[0]?.message ||
          "Por favor, preencha os campos corretamente.",
      );
      setLoading(false);
      return;
    }
    setError("Informe seu e-mail e senha para entrar.");
    setLoading(false);
  };

  const onValid = async (values: CustomerLoginValues) => {
    setError("");
    setLoading(true);

    try {
      if (isRegister) {
        const cleanPhone = values.phone ? values.phone.replace(/\D/g, "") : "";
        const cleanCpf = values.cpf ? values.cpf.replace(/\D/g, "") : "";
        await registerAccount({
          name: values.name,
          email: values.email,
          phone: cleanPhone,
          cpf: cleanCpf,
          password: values.password,
        });
        setSuccessMessage(
          "Conta criada com sucesso! Enviamos um e-mail de confirmação para você.",
        );
        setTimeout(() => {
          router.push(redirectTo);
        }, 1200);
      } else {
        const res = await login(values.email, values.password);
        setLoading(false);
        if (res.success) {
          if (!res.requiresTwoFactor) {
            router.push(redirectTo);
          }
        } else {
          setError(res.message || "E-mail ou senha inválidos.");
        }
      }
    } catch {
      setError("Erro ao autenticar. Tente novamente.");
      setLoading(false);
    }
  };

  const submit = form.handleSubmit(onValid, onInvalid);

  const handleSwitchMode = (registerMode: boolean) => {
    setIsRegister(registerMode);
    setError("");
    setSuccessMessage("");
  };

  const handleVerify = async (code: string) => {
    const res = await verifyTwoFactor(code);
    if (res.success) {
      setIsVerifyingOtp(true);
      router.push(redirectTo);
    }
    return res;
  };

  const handleCancelTwoFactor = () => {
    setIsVerifyingOtp(false);
    cancelTwoFactor();
  };

  const handleClearError = () => {
    if (error) setError("");
  };

  return {
    form,
    submit,
    isRegister,
    onSwitchMode: handleSwitchMode,
    showPassword,
    onToggleShowPassword: () => setShowPassword((prev) => !prev),
    error,
    onClearError: handleClearError,
    successMessage,
    loading,
    isVerifyingOtp,
    pendingTwoFactor,
    onSwitchTwoFactorMethod: switchTwoFactorMethod,
    onVerifyTwoFactor: handleVerify,
    onResendTwoFactorEmailCode: sendTwoFactorEmailCode,
    onCancelTwoFactor: handleCancelTwoFactor,
    cpf,
    passwordCriteria,
    fulfilledCount,
  };
}
