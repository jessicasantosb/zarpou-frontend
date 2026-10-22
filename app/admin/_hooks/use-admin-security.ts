"use client";

import { useEffect, useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import { useAuthStore } from "@/stores/auth-store";
import { getFirstFailedPasswordMessage } from "@/lib/password-rules";
import {
  buildTotpSetup,
  generateBackupCodes,
  verifyTotpCode,
} from "@/lib/two-factor";

export function useAdminSecurity() {
  const { user, changePassword, enableTwoFactor, disableTwoFactor } = useAuthStore();

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [securityTab, setSecurityTab] = useState<"password" | "2fa">("password");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);

  const [admin2FaMethod, setAdmin2FaMethod] = useState<"email" | "authenticator">("email");
  const [adminTotpSecret, setAdminTotpSecret] = useState("");
  const [adminTotpQrUrl, setAdminTotpQrUrl] = useState("");
  const [adminBackupCodes, setAdminBackupCodes] = useState<string[]>([]);
  const [copiedAdminSecret, setCopiedAdminSecret] = useState(false);
  const [copiedAdminBackups, setCopiedAdminBackups] = useState(false);
  const [adminOtpCode, setAdminOtpCode] = useState("");
  const [isVerifyingTotp, setIsVerifyingTotp] = useState(false);
  const [adminEmailOtpCode, setAdminEmailOtpCode] = useState("");
  const [adminEmailSent, setAdminEmailSent] = useState(false);
  const [adminEmailCooldown, setAdminEmailCooldown] = useState(0);
  const [isSendingEmailCode, setIsSendingEmailCode] = useState(false);
  const [isSaving2Fa, setIsSaving2Fa] = useState(false);

  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault();

    if (!currentPassword) {
      toast.warning("Por favor, informe sua senha atual.");
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

    setIsSubmittingPassword(true);
    try {
      const res = await changePassword(currentPassword, newPassword);
      if (res.success) {
        toast.success("Sua senha administrativa foi alterada com sucesso!");
        setIsPasswordModalOpen(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(res.message || "Erro ao alterar a senha.");
      }
    } catch {
      toast.error("Ocorreu um erro ao atualizar a senha. Tente novamente.");
    } finally {
      setIsSubmittingPassword(false);
    }
  };

  useEffect(() => {
    if (isPasswordModalOpen && user) {
      setAdmin2FaMethod(
        user.twoFactorMethod === "authenticator" ? "authenticator" : "email"
      );
      const backups =
        user.backupCodes && user.backupCodes.length > 0 ? user.backupCodes : generateBackupCodes(5);
      setAdminBackupCodes(backups);
      setAdminOtpCode("");

      const email = user.email || "admin@zarpou.com.br";
      buildTotpSetup(email, "Zarpou Admin", user.twoFactorSecret).then(
        ({ secret, qrUrl }) => {
          setAdminTotpSecret(secret);
          setAdminTotpQrUrl(qrUrl);
        },
      );
    }
  }, [isPasswordModalOpen, user]);

  const handleGenerateNewSecret = () => {
    const email = user?.email || "admin@zarpou.com.br";
    buildTotpSetup(email, "Zarpou Admin").then(({ secret, qrUrl }) => {
      setAdminTotpSecret(secret);
      setAdminTotpQrUrl(qrUrl);
    });
    setAdminOtpCode("");
    toast.info("Novo QR Code gerado! Escaneie-o no aplicativo.");
  };

  const handleVerifyAndEnableAuthenticator = async () => {
    const cleanCode = adminOtpCode.trim().replace(/\D/g, "");
    if (cleanCode.length !== 6) {
      toast.warning("Por favor, digite o código de 6 dígitos gerado pelo seu app autenticador.");
      return;
    }

    setIsVerifyingTotp(true);
    try {
      const isValid = await verifyTotpCode(adminTotpSecret, cleanCode);
      if (!isValid) {
        toast.error("Código incorreto ou expirado. Verifique os 6 dígitos gerados no seu aplicativo autenticador e tente novamente.");
        return;
      }

      const res = await enableTwoFactor("authenticator", adminTotpSecret, adminBackupCodes);
      if (res.success) {
        toast.success("Autenticação em 2 etapas com App Autenticador ativada com sucesso!");
        setAdminOtpCode("");
      } else {
        toast.error(res.message || "Erro ao ativar 2FA.");
      }
    } catch (err) {
      console.error("Erro ao validar OTP:", err);
      toast.error("Erro ao validar código. Tente novamente.");
    } finally {
      setIsVerifyingTotp(false);
    }
  };

  useEffect(() => {
    if (adminEmailCooldown <= 0) return;
    const interval = setInterval(() => {
      setAdminEmailCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [adminEmailCooldown]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleSendAdminEmailCode = async () => {
    if (adminEmailCooldown > 0 || isSendingEmailCode) return;
    setIsSendingEmailCode(true);
    try {
      const email = user?.email || "admin@zarpou.com.br";
      await fetch("/api/auth/2fa/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: user?.name || "Administrador" }),
      });
      setAdminEmailSent(true);
      setAdminEmailCooldown(60);
      toast.success(`Código de verificação enviado para ${email}!`);
    } catch {
      toast.error("Erro ao enviar código de verificação por e-mail.");
    } finally {
      setIsSendingEmailCode(false);
    }
  };

  const handleConfirmEmail2Fa = async () => {
    const cleanCode = adminEmailOtpCode.trim().replace(/\D/g, "");
    if (cleanCode.length !== 6) {
      toast.warning("Por favor, digite o código de 6 dígitos recebido por e-mail.");
      return;
    }
    setIsSaving2Fa(true);
    try {
      const verification = await fetch("/api/auth/2fa/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user?.email || "admin@zarpou.com.br",
          code: cleanCode,
        }),
      });

      if (!verification.ok) {
        const data = await verification.json().catch(() => null);
        toast.error(
          data?.reason === "expired"
            ? data?.error || "O código de verificação expirou. Solicite um novo."
            : "Código incorreto. Verifique os dígitos recebidos no seu e-mail.",
        );
        return;
      }

      const res = await enableTwoFactor("email", undefined, adminBackupCodes);
      if (res.success) {
        toast.success("Autenticação em 2 etapas por E-mail ativada com sucesso!");
        setAdminEmailOtpCode("");
        setAdminEmailSent(false);
      } else {
        toast.error(res.message || "Erro ao ativar 2FA por e-mail.");
      }
    } finally {
      setIsSaving2Fa(false);
    }
  };

  const handleEnableEmail2Fa = async () => {
    setIsSaving2Fa(true);
    try {
      const res = await enableTwoFactor("email", undefined, adminBackupCodes);
      if (res.success) {
        toast.success("Autenticação em 2 etapas por E-mail ativada com sucesso!");
      } else {
        toast.error(res.message || "Erro ao ativar 2FA por e-mail.");
      }
    } finally {
      setIsSaving2Fa(false);
    }
  };

  const handleDisableAdmin2Fa = async () => {
    setIsSaving2Fa(true);
    try {
      const res = await disableTwoFactor();
      if (res.success) {
        toast.success("Autenticação em 2 etapas desativada com sucesso.");
      } else {
        toast.error(res.message || "Erro ao desativar 2FA.");
      }
    } finally {
      setIsSaving2Fa(false);
    }
  };

  const handleCopySecret = () => {
    navigator.clipboard.writeText(adminTotpSecret);
    setCopiedAdminSecret(true);
    toast.info("Chave copiada!");
    setTimeout(() => setCopiedAdminSecret(false), 2000);
  };

  const handleCopyBackupCodes = () => {
    navigator.clipboard.writeText(adminBackupCodes.join("\n"));
    setCopiedAdminBackups(true);
    toast.info("Códigos copiados!");
    setTimeout(() => setCopiedAdminBackups(false), 2000);
  };

  const handleCloseModal = () => {
    if (!isSubmittingPassword && !isSaving2Fa) {
      setIsPasswordModalOpen(false);
    }
  };

  return {
    user,
    isPasswordModalOpen,
    setIsPasswordModalOpen,
    securityTab,
    setSecurityTab,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    showCurrentPass,
    setShowCurrentPass,
    showNewPass,
    setShowNewPass,
    showConfirmPass,
    setShowConfirmPass,
    isSubmittingPassword,
    admin2FaMethod,
    setAdmin2FaMethod,
    adminTotpSecret,
    adminTotpQrUrl,
    adminBackupCodes,
    copiedAdminSecret,
    copiedAdminBackups,
    adminOtpCode,
    setAdminOtpCode,
    isVerifyingTotp,
    adminEmailOtpCode,
    setAdminEmailOtpCode,
    adminEmailSent,
    adminEmailCooldown,
    isSendingEmailCode,
    isSaving2Fa,
    handleChangePassword,
    handleGenerateNewSecret,
    handleVerifyAndEnableAuthenticator,
    handleSendAdminEmailCode,
    handleConfirmEmail2Fa,
    handleEnableEmail2Fa,
    handleDisableAdmin2Fa,
    handleCopySecret,
    handleCopyBackupCodes,
    formatTimer,
    handleCloseModal,
  };
}

export type AdminSecurity = ReturnType<typeof useAdminSecurity>;
