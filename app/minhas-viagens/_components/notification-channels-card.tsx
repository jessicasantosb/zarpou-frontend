import type React from "react";
import {
  Bell,
  BellOff,
  BellRing,
  Mail,
  MessageSquare,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

interface NotificationChannelsCardProps {
  whatsappPromotions: boolean;
  emailPromotions: boolean;
  customerPhone?: string;
  customerEmail?: string;
  onToggleWhatsapp: (enabled: boolean) => void;
  onToggleEmail: (enabled: boolean) => void;
  onToggleAll: () => void;
}

export function NotificationChannelsCard({
  whatsappPromotions,
  emailPromotions,
  customerPhone,
  customerEmail,
  onToggleWhatsapp,
  onToggleEmail,
  onToggleAll,
}: NotificationChannelsCardProps) {
  const areAllEnabled = whatsappPromotions && emailPromotions;
  const isAnyEnabled = whatsappPromotions || emailPromotions;

  return (
    <div className="bg-card rounded-3xl p-6 sm:p-8 border border-border shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-border/60">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 text-primary text-[11px] font-black tracking-wide mb-1">
            <Sparkles className="size-3 text-secondary fill-secondary" />
            Notificações & Promoções
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-foreground">
            Canais de Notificação
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Escolha por onde deseja receber ofertas relâmpago, cupons
            exclusivos e novidades de viagens da Zarpou.
          </p>
        </div>

        <button
          type="button"
          onClick={onToggleAll}
          title={
            areAllEnabled
              ? "Clique para descadastrar de todos os canais"
              : "Clique para cadastrar em todos os canais"
          }
          className={`group flex items-center gap-3 px-4 py-2.5 rounded-2xl border transition-all duration-300 cursor-pointer shadow-xs shrink-0 self-start sm:self-auto ${
            areAllEnabled
              ? "bg-primary/10 hover:bg-primary/15 text-primary border-primary/20"
              : isAnyEnabled
                ? "bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200"
                : "bg-muted hover:bg-muted text-muted-foreground border-border"
          }`}
        >
          <div
            className={`size-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
              areAllEnabled
                ? "bg-primary text-white shadow-xs"
                : isAnyEnabled
                  ? "bg-amber-600 text-white shadow-xs"
                  : "bg-border text-muted-foreground"
            }`}
          >
            {areAllEnabled ? (
              <BellRing className="size-5" />
            ) : isAnyEnabled ? (
              <Bell className="size-5" />
            ) : (
              <BellOff className="size-5" />
            )}
          </div>

          <div className="text-left pr-1">
            <span className="text-xs font-black block leading-tight">
              {areAllEnabled ? "Descadastrar Todos" : "Cadastrar Todos"}
            </span>
            <span className="text-[10px] text-muted-foreground font-medium block">
              {areAllEnabled
                ? "Desativar WhatsApp e E-mail"
                : "Ativar WhatsApp e E-mail"}
            </span>
          </div>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
        <div
          className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-full ${
            whatsappPromotions
              ? "bg-emerald-50/50 border-emerald-200 shadow-xs"
              : "bg-muted/70 border-border"
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`size-11 rounded-xl flex items-center justify-center shrink-0 ${
                    whatsappPromotions
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <MessageSquare className="size-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-foreground text-base">
                    Notificações no WhatsApp
                  </h3>
                  <span
                    className={`inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full mt-0.5 ${
                      whatsappPromotions
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : "bg-muted text-foreground/70"
                    }`}
                  >
                    {whatsappPromotions ? "Ativado" : "Desativado"}
                  </span>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={whatsappPromotions}
                  onChange={(e) => onToggleWhatsapp(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-12 h-6.5 bg-border peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2.5px] after:left-[3px] after:bg-card after:border-input after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            <p className="text-xs text-foreground/70 leading-relaxed">
              Receba alertas instantâneos de passagens baratas, ofertas
              relâmpago e promoções exclusivas direto no seu WhatsApp.
            </p>
          </div>

          <div className="pt-3 border-t border-border/60 flex items-center justify-between text-[11px] mt-4">
            <span className="text-muted-foreground font-medium">
              Número cadastrado:
            </span>
            <strong className="text-foreground">
              {customerPhone || "Não informado"}
            </strong>
          </div>
        </div>

        <div
          className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-full ${
            emailPromotions
              ? "bg-blue-50/50 border-blue-200 shadow-xs"
              : "bg-muted/70 border-border"
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`size-11 rounded-xl flex items-center justify-center shrink-0 ${
                    emailPromotions
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Mail className="size-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-foreground text-base">
                    Notificações por E-mail
                  </h3>
                  <span
                    className={`inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full mt-0.5 ${
                      emailPromotions
                        ? "bg-blue-100 text-blue-900 border border-blue-200"
                        : "bg-muted text-foreground/70"
                    }`}
                  >
                    {emailPromotions ? "Ativado" : "Desativado"}
                  </span>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={emailPromotions}
                  onChange={(e) => onToggleEmail(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-12 h-6.5 bg-border peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2.5px] after:left-[3px] after:bg-card after:border-input after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <p className="text-xs text-foreground/70 leading-relaxed">
              Receba nossa newsletter semanal com novidades, roteiros da
              temporada e descontos imperdíveis de viagens.
            </p>
          </div>

          <div className="pt-3 border-t border-border/60 flex items-center justify-between text-[11px] mt-4">
            <span className="text-muted-foreground font-medium">
              E-mail cadastrado:
            </span>
            <strong className="text-foreground truncate max-w-[200px]">
              {customerEmail}
            </strong>
          </div>
        </div>
      </div>

      <div className="bg-muted/50 p-4 rounded-2xl border border-border/80 flex items-start gap-3 text-xs text-muted-foreground">
        <ShieldCheck className="size-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-bold text-foreground">
            Privacidade & Controle Total (LGPD)
          </span>
          <p className="text-[11px] text-muted-foreground">
            Você pode alterar suas preferências ou se descadastrar de nossas
            comunicações a qualquer momento com apenas um clique nesta tela.
          </p>
        </div>
      </div>
    </div>
  );
}
