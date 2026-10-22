"use client";

import { Container } from "@/components/shared/container";
import { AddonsStep } from "./_components/addons-step";
import { CheckoutProgressBar } from "./_components/checkout-progress-bar";
import { CheckoutSummarySidebar } from "./_components/checkout-summary-sidebar";
import { PaymentProcessingOverlay } from "./_components/payment-processing-overlay";
import { PaymentStep } from "./_components/payment-step";
import { TravelerStep } from "./_components/traveler-step";
import { useCheckout } from "./_hooks/use-checkout";

export default function CheckoutPage() {
  const {
    booking,
    currentStep,
    pricing,
    isHotel,
    title,
    initialTraveler,
    isSubmitting,
    installmentOptions,
    selectedMethod,
    installments,
    cardNumber,
    cardHolder,
    cardExpiry,
    cardCvv,
    onCardNumberChange,
    onCardHolderChange,
    onCardExpiryChange,
    onCardCvvChange,
    onInstallmentsChange,
    onSelectMethod,
    onToggleAddon,
    onSubmitTraveler,
    onFinalize,
    onGoToStep,
    couponInput,
    appliedCoupon,
    isApplyingCoupon,
    onCouponInputChange,
    onApplyCoupon,
    onRemoveCoupon,
  } = useCheckout();

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 relative">
      {isSubmitting && <PaymentProcessingOverlay />}

      <Container>
        <CheckoutProgressBar currentStep={currentStep} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            {currentStep === 1 && (
              <TravelerStep
                initialTraveler={initialTraveler}
                onComplete={onSubmitTraveler}
              />
            )}

            {currentStep === 2 && (
              <AddonsStep
                addons={booking.addons}
                onToggle={onToggleAddon}
                onBack={() => onGoToStep(1)}
                onNext={() => onGoToStep(3)}
              />
            )}

            {currentStep === 3 && (
              <PaymentStep
                pricing={pricing}
                selectedMethod={selectedMethod}
                installments={installments}
                installmentOptions={installmentOptions}
                cardNumber={cardNumber}
                cardHolder={cardHolder}
                cardExpiry={cardExpiry}
                cardCvv={cardCvv}
                isSubmitting={isSubmitting}
                onSelectMethod={onSelectMethod}
                onCardNumberChange={onCardNumberChange}
                onCardHolderChange={onCardHolderChange}
                onCardExpiryChange={onCardExpiryChange}
                onCardCvvChange={onCardCvvChange}
                onInstallmentsChange={onInstallmentsChange}
                couponInput={couponInput}
                appliedCoupon={appliedCoupon}
                isApplyingCoupon={isApplyingCoupon}
                onCouponInputChange={onCouponInputChange}
                onApplyCoupon={onApplyCoupon}
                onRemoveCoupon={onRemoveCoupon}
                onBack={() => onGoToStep(2)}
                onFinalize={onFinalize}
              />
            )}
          </div>

          <CheckoutSummarySidebar
            booking={booking}
            pricing={pricing}
            isHotel={isHotel}
            title={title}
            selectedMethod={selectedMethod}
            installments={installments}
          />
        </div>
      </Container>
    </div>
  );
}
