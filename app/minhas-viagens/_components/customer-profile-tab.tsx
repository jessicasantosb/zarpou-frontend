"use client";

import { Check } from "lucide-react";
import { useCustomerProfile } from "../_hooks/use-customer-profile";
import { BackupCodesModal } from "./backup-codes-modal";
import { ChangePasswordCard } from "./change-password-card";
import { NotificationChannelsCard } from "./notification-channels-card";
import { ProfileInfoCard } from "./profile-info-card";
import { TwoFactorCard } from "./two-factor-card";
import { TwoFactorSetupModal } from "./two-factor-setup-modal";

export function CustomerProfileTab() {
  const {
    customerUser,
    feedbackMessage,
    whatsappPromotions,
    emailPromotions,
    onToggleWhatsapp,
    onToggleEmail,
    onToggleAll,
    name,
    onNameChange,
    phone,
    onPhoneChange,
    cpf,
    onCpfChange,
    isSavingProfile,
    onSaveProfile,
    currentPassword,
    onCurrentPasswordChange,
    newPassword,
    onNewPasswordChange,
    confirmPassword,
    onConfirmPasswordChange,
    showCurrentPass,
    onToggleCurrentPass,
    showNewPass,
    onToggleNewPass,
    showConfirmPass,
    onToggleConfirmPass,
    isChangingPassword,
    onChangePassword,
    is2FaModalOpen,
    modalStep,
    selectedMethod,
    onSelectedMethodChange,
    totpSecret,
    totpQrUrl,
    verificationCode,
    onVerificationCodeChange,
    generatedBackupCodes,
    isProcessing2Fa,
    copiedSecret,
    copiedBackups,
    showBackupCodesModal,
    onShowBackupCodesModal,
    onHideBackupCodesModal,
    onStart2FaSetup,
    onSendSetupEmailCode,
    onAdvance2FaSetup,
    onConfirm2FaSetup,
    onFinish2FaSetup,
    onDisable2Fa,
    onCopySecret,
    onCopyBackups,
    onSet2FaModalOpen,
    onSetModalStep,
  } = useCustomerProfile();

  return (
    <div className="space-y-6">
      {feedbackMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-bold rounded-2xl flex items-center gap-2 shadow-xs animate-fade-in">
          <Check className="size-4 text-emerald-600 shrink-0" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      <NotificationChannelsCard
        whatsappPromotions={whatsappPromotions}
        emailPromotions={emailPromotions}
        customerPhone={customerUser?.phone}
        customerEmail={customerUser?.email}
        onToggleWhatsapp={onToggleWhatsapp}
        onToggleEmail={onToggleEmail}
        onToggleAll={onToggleAll}
      />

      <ProfileInfoCard
        name={name}
        phone={phone}
        cpf={cpf}
        customerEmail={customerUser?.email}
        isSavingProfile={isSavingProfile}
        onNameChange={onNameChange}
        onPhoneChange={onPhoneChange}
        onCpfChange={onCpfChange}
        onSubmit={onSaveProfile}
      />

      <ChangePasswordCard
        currentPassword={currentPassword}
        newPassword={newPassword}
        confirmPassword={confirmPassword}
        showCurrentPass={showCurrentPass}
        showNewPass={showNewPass}
        showConfirmPass={showConfirmPass}
        isChangingPassword={isChangingPassword}
        onCurrentPasswordChange={onCurrentPasswordChange}
        onNewPasswordChange={onNewPasswordChange}
        onConfirmPasswordChange={onConfirmPasswordChange}
        onToggleCurrentPass={onToggleCurrentPass}
        onToggleNewPass={onToggleNewPass}
        onToggleConfirmPass={onToggleConfirmPass}
        onSubmit={onChangePassword}
      />

      <TwoFactorCard
        customerUser={customerUser}
        onStartSetup={onStart2FaSetup}
        onDisable={onDisable2Fa}
        onShowBackupCodes={onShowBackupCodesModal}
      />

      {is2FaModalOpen && (
        <TwoFactorSetupModal
          modalStep={modalStep}
          selectedMethod={selectedMethod}
          totpQrUrl={totpQrUrl}
          totpSecret={totpSecret}
          verificationCode={verificationCode}
          generatedBackupCodes={generatedBackupCodes}
          isProcessing2Fa={isProcessing2Fa}
          copiedSecret={copiedSecret}
          copiedBackups={copiedBackups}
          customerEmail={customerUser?.email}
          onSelectedMethodChange={onSelectedMethodChange}
          onVerificationCodeChange={onVerificationCodeChange}
          onAdvance={onAdvance2FaSetup}
          onSendEmailCode={onSendSetupEmailCode}
          onBackToStep1={() => onSetModalStep(1)}
          onConfirm={onConfirm2FaSetup}
          onFinish={onFinish2FaSetup}
          onCopySecret={onCopySecret}
          onCopyBackups={onCopyBackups}
          onClose={() => onSet2FaModalOpen(false)}
        />
      )}

      {showBackupCodesModal && (
        <BackupCodesModal
          codes={customerUser?.backupCodes || []}
          onClose={onHideBackupCodesModal}
        />
      )}
    </div>
  );
}
