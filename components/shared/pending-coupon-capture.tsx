"use client";

import { useEffect } from "react";

/**
 * Captura o parâmetro `?cupom=CODE` vindo de links (e-mail/WhatsApp de cupons)
 * e guarda em sessionStorage para o checkout pré-preencher e validar o cupom
 * no passo de pagamento. O parâmetro é removido da URL para não poluir.
 */
export function PendingCouponCapture() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cupom = params.get("cupom");
    if (!cupom) return;

    sessionStorage.setItem("zarpou-pending-coupon", cupom.toUpperCase());
    params.delete("cupom");
    const query = params.toString();
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`,
    );
  }, []);

  return null;
}
