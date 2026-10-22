"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCustomerAuthStore } from "@/stores/customer-auth-store";
import { useConfirm } from "@/components/shared/confirm-dialog-provider";
import { formatCellphone } from "@/lib/format-cellphone";
import { formatCpf, isValidCPF } from "@/lib/format-cpf";
import { getFirstFailedPasswordMessage } from "@/lib/password-rules";
import {
  buildTotpSetup,
  generateBackupCodes,
  verifyTotpCode,
  maskEmail,
} from "@/lib/two-factor";

export function useCustomerProfile() {
  const { confirm } = useConfirm();
  const {
    customerUser,
    updateNotifications,
    updateProfile,
    changePassword,
    enableTwoFactor,
    disableTwoFactor,
  } = useCustomerAuthStore();

  const [whatsappPromotions, setWhatsappPromotions] = useState(
    customerUser?.notifications?.whatsappPromotions ?? true,
  );
  const [emailPromotions, setEmailPromotions] = useState(
    customerUser?.notifications?.emailPromotions ?? true,
  );

  const [name, setName] = useState(customerUser?.name || "");
  const [phone, setPhone] = useState(
    customerUser?.phone ? formatCellphone(customerUser.phone) : "",
  );
  const [cpf, setCpf] = useState(
    customerUser?.cpf ? formatCpf(customerUser.cpf) : "",
  );
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [is2FaModalOpen, setIs2FaModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState<1 | 2 | 3>(1);
  const [selectedMethod, setSelectedMethod] = useState<
    "email" | "authenticator"
  >("email");
  const [totpSecret, setTotpSecret] = useState("");
  const [totpQrUrl, setTotpQrUrl] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [generatedBackupCodes, setGeneratedBackupCodes] = useState<string[]>(
    [],
  );
  const [isProcessing2Fa, setIsProcessing2Fa] = useState(false);
  const [copiedSecret, setCopiedSecret] = useState(false);
  const [copiedBackups, setCopiedBackups] = useState(false);
  const [showBackupCodesModal, setShowBackupCodesModal] = useState(false);

  useEffect(() => {
    if (customerUser) {
      setName(customerUser.name || "");
      setPhone(customerUser.phone ? formatCellphone(customerUser.phone) : "");
      setCpf(customerUser.cpf ? formatCpf(customerUser.cpf) : "");
      setWhatsappPromotions(
        customerUser.notifications?.whatsappPromotions ?? true,
      );
      setEmailPromotions(customerUser.notifications?.emailPromotions ?? true);
    }
  }, [customerUser]);

  const showFeedback = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => {
      setFeedbackMessage(null);
    }, 3500);
  };

  const handleToggleWhatsapp = async (enabled: boolean) => {
    setWhatsappPromotions(enabled);
    await updateNotifications({ whatsappPromotions: enabled });
    const msg = enabled
      ? "✓ Você agora receberá ofertas e promoções relâmpago pelo WhatsApp!"
      : "✕ Você cancelou o recebimento de promoções pelo WhatsApp.";
    showFeedback(msg);
    if (enabled) {
      toast.success("Notificações de promoções ativadas no WhatsApp!");
    } else {
      toast.info("Notificações no WhatsApp desativadas.");
    }
  };

  const handleToggleEmail = async (enabled: boolean) => {
    setEmailPromotions(enabled);
    await updateNotifications({ emailPromotions: enabled });
    const msg = enabled
      ? "✓ Você agora receberá novidades e ofertas exclusivas por e-mail!"
      : "✕ Você cancelou o recebimento de promoções por e-mail.";
    showFeedback(msg);
    if (enabled) {
      toast.success("Notificações e newsletter ativadas por e-mail!");
    } else {
      toast.info("Notificações por e-mail desativadas.");
    }
  };

  const areAllEnabled = whatsappPromotions && emailPromotions;

  const handleToggleAll = async () => {
    const shouldEnable = !areAllEnabled;

    setWhatsappPromotions(shouldEnable);
    setEmailPromotions(shouldEnable);

    await updateNotifications({
      whatsappPromotions: shouldEnable,
      emailPromotions: shouldEnable,
    });

    if (shouldEnable) {
      toast.success(
        "Notificações ativadas para todos os canais (WhatsApp e E-mail)!",
      );
      showFeedback(
        "✓ Todos os canais de notificação foram ativados com sucesso!",
      );
    } else {
      toast.info("Você foi descadastrado de todos os canais de notificação.");
      showFeedback(
        "✕ Você foi descadastrado de todos os canais de notificação.",
      );
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const cleanPhone = phone.replace(/\D/g, "");
    const cleanCpf = cpf.replace(/\D/g, "");

    if (cleanCpf && !isValidCPF(cleanCpf)) {
      setIsSavingProfile(false);
      toast.error(
        "O CPF informado é inválido. Por favor, confira os números digitados.",
      );
      return;
    }

    await updateProfile({
      name,
      phone: cleanPhone,
      cpf: cleanCpf,
    });
    setIsSavingProfile(false);
    toast.success("Dados do perfil atualizados com sucesso!");
    showFeedback("Dados do perfil atualizados com sucesso!");
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword) {
      toast.warning("Por favor, digite sua senha atual.");
      return;
    }

    const failedRuleMessage = getFirstFailedPasswordMessage(newPassword);
    if (failedRuleMessage) {
      toast.warning(failedRuleMessage);
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.warning("A confirmação não confere com a nova senha digitada.");
      return;
    }

    if (currentPassword === newPassword) {
      toast.warning("A nova senha deve ser diferente da sua senha atual.");
      return;
    }

    setIsChangingPassword(true);
    try {
      const res = await changePassword(currentPassword, newPassword);
      if (res.success) {
        toast.success("Senha alterada com sucesso!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(res.message || "Erro ao alterar a senha.");
      }
    } catch {
      toast.error("Ocorreu um erro ao atualizar sua senha. Tente novamente.");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleStart2FaSetup = async () => {
    setIs2FaModalOpen(true);
    setModalStep(1);
    setSelectedMethod("email");
    setVerificationCode("");
    setCopiedSecret(false);
    setCopiedBackups(false);

    const { secret, qrUrl } = await buildTotpSetup(
      customerUser?.email || "viajante@zarpou.com.br",
      "Zarpou Viagens",
    );
    setTotpSecret(secret);
    setTotpQrUrl(qrUrl);
  };

  const handleSendSetupEmailCode = async () => {
    if (!customerUser?.email) return;
    setIsProcessing2Fa(true);
    try {
      await fetch("/api/auth/2fa/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: customerUser.email,
          name: customerUser.name,
        }),
      });
      toast.info(`Código enviado para ${maskEmail(customerUser.email)}`);
      setModalStep(2);
    } catch {
      toast.error("Erro ao enviar código de verificação por e-mail.");
    } finally {
      setIsProcessing2Fa(false);
    }
  };

  const handleAdvance2FaSetup = () => {
    if (selectedMethod === "email") {
      handleSendSetupEmailCode();
    } else {
      setModalStep(2);
    }
  };

  const handleConfirm2FaSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = verificationCode.trim().replace(/\D/g, "");
    if (cleanCode.length !== 6) {
      toast.warning("Digite o código completo de 6 dígitos.");
      return;
    }

    setIsProcessing2Fa(true);
    try {
      if (selectedMethod === "authenticator") {
        const isValid = await verifyTotpCode(totpSecret, cleanCode);
        if (!isValid) {
          toast.error(
            "Código do aplicativo autenticador incorreto ou expirado.",
          );
          setIsProcessing2Fa(false);
          return;
        }
      } else {
        const verification = await fetch("/api/auth/2fa/verify-code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: customerUser?.email, code: cleanCode }),
        });

        if (!verification.ok) {
          const data = await verification.json().catch(() => null);
          toast.error(
            data?.reason === "expired"
              ? data?.error || "O código de verificação expirou. Solicite um novo."
              : "Código recebido por e-mail incorreto.",
          );
          setIsProcessing2Fa(false);
          return;
        }
      }

      const backups = generateBackupCodes(5);
      setGeneratedBackupCodes(backups);

      const secretToSave =
        selectedMethod === "authenticator" ? totpSecret : undefined;
      const res = await enableTwoFactor(
        selectedMethod,
        secretToSave,
        backups,
      );
      if (res.success) {
        toast.success("Autenticação em 2 etapas ativada com sucesso!");
      }
      setModalStep(3);
    } finally {
      setIsProcessing2Fa(false);
    }
  };

  const handleFinish2FaSetup = () => {
    setIs2FaModalOpen(false);
  };

  const handleDisable2Fa = async () => {
    const confirmed = await confirm({
      title: "Desativar Autenticação em Duas Etapas",
      description:
        "Tem certeza que deseja desativar a verificação em duas etapas da sua conta? Isso tornará o acesso à sua conta menos protegido.",
      confirmText: "Desativar 2FA",
      cancelText: "Cancelar",
      variant: "warning",
      icon: "warning",
    });

    if (!confirmed) {
      return;
    }
    const res = await disableTwoFactor();
    if (res.success) {
      toast.success("Autenticação em 2 fatores desativada.");
    } else {
      toast.error(res.message || "Erro ao desativar.");
    }
  };

  return {
    customerUser,
    feedbackMessage,
    whatsappPromotions,
    emailPromotions,
    onToggleWhatsapp: handleToggleWhatsapp,
    onToggleEmail: handleToggleEmail,
    onToggleAll: handleToggleAll,
    name,
    onNameChange: setName,
    phone,
    onPhoneChange: setPhone,
    cpf,
    onCpfChange: setCpf,
    isSavingProfile,
    onSaveProfile: handleSaveProfile,
    currentPassword,
    onCurrentPasswordChange: setCurrentPassword,
    newPassword,
    onNewPasswordChange: setNewPassword,
    confirmPassword,
    onConfirmPasswordChange: setConfirmPassword,
    showCurrentPass,
    onToggleCurrentPass: () => setShowCurrentPass((prev) => !prev),
    showNewPass,
    onToggleNewPass: () => setShowNewPass((prev) => !prev),
    showConfirmPass,
    onToggleConfirmPass: () => setShowConfirmPass((prev) => !prev),
    isChangingPassword,
    onChangePassword: handleChangePassword,
    is2FaModalOpen,
    modalStep,
    selectedMethod,
    onSelectedMethodChange: setSelectedMethod,
    totpSecret,
    totpQrUrl,
    verificationCode,
    onVerificationCodeChange: setVerificationCode,
    generatedBackupCodes,
    isProcessing2Fa,
    copiedSecret,
    copiedBackups,
    showBackupCodesModal,
    onShowBackupCodesModal: () => setShowBackupCodesModal(true),
    onHideBackupCodesModal: () => setShowBackupCodesModal(false),
    onStart2FaSetup: handleStart2FaSetup,
    onSendSetupEmailCode: handleSendSetupEmailCode,
    onAdvance2FaSetup: handleAdvance2FaSetup,
    onConfirm2FaSetup: handleConfirm2FaSetup,
    onFinish2FaSetup: handleFinish2FaSetup,
    onDisable2Fa: handleDisable2Fa,
    onCopySecret: (secret: string) => {
      navigator.clipboard.writeText(secret);
      setCopiedSecret(true);
      toast.info("Chave copiada para a área de transferência!");
      setTimeout(() => setCopiedSecret(false), 2000);
    },
    onCopyBackups: (codes: string[]) => {
      navigator.clipboard.writeText(codes.join("\n"));
      setCopiedBackups(true);
      toast.info("Códigos copiados para a área de transferência!");
      setTimeout(() => setCopiedBackups(false), 2000);
    },
    onSet2FaModalOpen: setIs2FaModalOpen,
    onSetModalStep: setModalStep,
  };
}
