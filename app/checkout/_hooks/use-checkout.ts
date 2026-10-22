"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useBookingStore } from "@/stores/booking-store";
import { api } from "@/lib/api";
import { AppliedCoupon, CouponValidateResponse, PaymentMethod, TravelerInfo } from "@/types/checkout";

export function useCheckout() {
  const router = useRouter();
  const {
    currentBooking,
    calculatePricing,
    setTravelers,
    toggleAddon,
    fetchAddons,
    setPaymentMethod,
    setCoupon,
    confirmBooking,
  } = useBookingStore();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [installments, setInstallments] = useState(1);
  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethod>("credit_card");

  const [couponInput, setCouponInput] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const appliedCoupon = currentBooking.coupon ?? null;

  useEffect(() => {
    if (currentBooking.addons.length === 0) {
      fetchAddons();
    }
  }, [currentBooking.addons.length, fetchAddons]);

  const pricing = calculatePricing();

  const applyCouponCode = async (code: string): Promise<boolean> => {
    const clean = code.trim().toUpperCase();
    if (!clean) {
      toast.warning("Digite o código do cupom.");
      return false;
    }

    setIsApplyingCoupon(true);
    try {
      const res = await api.post<CouponValidateResponse>("/coupons/validate", {
        code: clean,
        order_amount: pricing.preCouponAmount ?? pricing.finalAmount,
      });
      const coupon: AppliedCoupon = {
        code: res.code,
        description: res.description,
        discountType: res.discount_type,
        discountValue: Number(res.discount_value),
        discountAmount: Number(res.discount_amount),
      };
      setCoupon(coupon);
      toast.success(
        `Cupom ${res.code} aplicado com sucesso! ${
          coupon.discountAmount > 0
            ? `Você economizou R$ ${coupon.discountAmount.toFixed(2)}.`
            : ""
        }`,
      );
      return true;
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Cupom inválido. Confira o código e tente novamente.";
      toast.error(msg);
      setCoupon(undefined);
      return false;
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  // Cupom vindo de link de e-mail/promoção (?cupom=CODE) ou de sessão anterior
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pending =
      params.get("cupom") || sessionStorage.getItem("zarpou-pending-coupon");
    if (!pending) return;
    sessionStorage.removeItem("zarpou-pending-coupon");
    const clean = pending.trim().toUpperCase();
    setCouponInput(clean);
    applyCouponCode(clean);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApplyCoupon = async () => {
    await applyCouponCode(couponInput);
  };

  const handleRemoveCoupon = () => {
    setCoupon(undefined);
    setCouponInput("");
  };

  const installmentOptions = Array.from({ length: 12 }, (_, index) => {
    const num = index + 1;
    const amount =
      (pricing.baseAmount + pricing.taxesAndFees + pricing.addonsAmount) / num;
    return {
      num,
      amount: amount.toFixed(2),
    };
  });

  const initialTraveler: TravelerInfo = currentBooking.travelers[0] || {
    id: "trav-1",
    fullName: "",
    documentType: "CPF",
    documentNumber: "",
    birthDate: "",
    gender: "M",
    email: "",
    phone: "",
    isPrimary: true,
  };

  const handleSubmitTraveler = (traveler: TravelerInfo) => {
    setTravelers([traveler]);
    setCurrentStep(2);
  };

  const handleSelectMethod = (method: PaymentMethod) => {
    setSelectedMethod(method);
    if (method === "credit_card") {
      setPaymentMethod("credit_card", installments);
    } else {
      setPaymentMethod(method);
    }
  };

  const handleInstallmentsChange = (value: number) => {
    setInstallments(value);
    setPaymentMethod("credit_card", value);
  };

  const handleFinalizeBooking = async () => {
    if (selectedMethod === "credit_card") {
      if (!cardNumber || !cardHolder || !cardExpiry || !cardCvv) {
        toast.error(
          "Por favor, preencha todos os dados do cartão de crédito.",
        );
        return;
      }
    }

    setIsSubmitting(true);
    setPaymentMethod(selectedMethod, installments, {
      cardNumber: cardNumber.replace(/\D/g, ""),
      holderName: cardHolder,
      expirationDate: cardExpiry,
      cvv: cardCvv,
      installments,
    });

    try {
      const booked = await confirmBooking();
      router.push(`/reserva/confirmada/${booked.id}`);
    } catch {
      toast.error("Houve um erro ao processar sua reserva. Tente novamente.");
      setIsSubmitting(false);
    }
  };

  const isHotel = currentBooking.productType === "hotel";
  const title = isHotel
    ? currentBooking.hotel?.name || "Hotel Zarpou"
    : currentBooking.flight?.outbound.originCity +
      " → " +
      currentBooking.flight?.outbound.destinationCity;

  return {
    booking: currentBooking,
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
    onCardNumberChange: setCardNumber,
    onCardHolderChange: (value: string) => setCardHolder(value.toUpperCase()),
    onCardExpiryChange: setCardExpiry,
    onCardCvvChange: setCardCvv,
    onInstallmentsChange: handleInstallmentsChange,
    onSelectMethod: handleSelectMethod,
    onToggleAddon: toggleAddon,
    onSubmitTraveler: handleSubmitTraveler,
    onFinalize: handleFinalizeBooking,
    onGoToStep: setCurrentStep,
    couponInput,
    appliedCoupon,
    isApplyingCoupon,
    onCouponInputChange: setCouponInput,
    onApplyCoupon: handleApplyCoupon,
    onRemoveCoupon: handleRemoveCoupon,
  };
}
