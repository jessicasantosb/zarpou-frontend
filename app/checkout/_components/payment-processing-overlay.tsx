import { LoadingScreen } from "@/components/shared/loading-screen";

export function PaymentProcessingOverlay() {
  return (
    <div className="fixed inset-0 z-50 bg-foreground/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-surface-dark border border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-xl">
        <LoadingScreen
          title="Processando Pagamento Seguro..."
          subtitle="Por favor, aguarde alguns instantes enquanto validamos sua transação e emitimos seus vouchers..."
          theme="dark"
          type="payment"
          fullScreen={false}
        />
      </div>
    </div>
  );
}
