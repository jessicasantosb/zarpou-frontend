# Zarpou — sistema de interface (decidido; aplicar, não re-explorar)

Agência de viagens Zarpou: produto B2C (busca/reserva de hotéis, passagens, pacotes)
com área do cliente ("Minhas Viagens") e painel admin B2B (empresas, reservas, faturamento).

## Direção e sensibilidade

- Confiança de operadora de viagens + calor humano de atendimento. Não é fintech, não é startup genérica.
- Marketing (frontend-design): arejado, imagem/destino lideram, dourado como assinatura.
- Produto/admin (interface-design): calmo, denso o suficiente para operação, mesma paleta.

## Stack e restrições de implementação

- Next.js 15 (App Router) · React 19 · Tailwind **v4** — tokens no `@theme` de `app/globals.css`.
  **Nunca hex/rgb literal em componentes**: usar classes semânticas (`bg-primary`, `text-muted-foreground`,
  `border-border`). Tokens novos entram em `globals.css`, não inline.
- Primitivas Radix já instaladas: dialog, dropdown-menu, label, progress, slot.
- `components/ui/` (padrão shadcn + CVA): button, card, carousel, carousel-dots, dialog, form, input,
  input-password, label, otp-input, progress, sheet, skeleton, textarea. **Usar antes de criar.**
- Ícones: lucide-react. Movimento: `motion` + `tw-animate-css`; carrosséis: embla.
- Forms: react-hook-form + zod + `components/ui/form`.
- Estados globais: zustand. Toasts: react-toastify.

## Paleta (derivada de `globals.css`)

- `--primary: #05345b` marinho — institucional: textos de marca, headers, links, títulos de destaque.
- `--primary-hover: #084574` e `--primary-light: #0b548f` — hover e gradientes (`from-primary via-primary-light`).
- `--secondary: #ebb343` dourado — **CTA e destaque**; atenção: no Button, a variante `default`
  é dourada (`bg-secondary`, texto escuro) — o botão principal do site é dourado, não marinho.
- `--secondary-hover: #dba130` (hover do dourado) e `--secondary-ink: #996b00` (texto sobre dourado claro).
- `--whatsapp` verde + `--whatsapp-hover: #20ba59` — exclusivamente ações de WhatsApp
  (variante `whatsapp` do Button, botões de contato). Não existe verde secundário: um só.
- `--surface-dark: #0f172a` — superfícies escuras do admin (sidebar, login, overlays);
  sobre ela, bordas/hovers com `border-white/10` e `hover:bg-white/10`, texto `text-white/80|60`.
- Neutros oklch: background branco, foreground quase-preto, `muted`/`accent` 0.97, bordas 0.922.
- `destructive` para erros/destruição; não inventar vermelhos novos.
- **Proibido hex arbitrário em classe Tailwind** (`bg-[#...]`): tudo resolve para os tokens acima.
  Gradientes de marca usam `from-primary via-primary-light to-primary` (nunca azuis soltos).
- Cores com significado obrigatório: dourado = ação/destaque · marinho = institucional ·
  verde = WhatsApp · vermelho = destrutivo. Sem decoração colorida.

## Tipografia

- **Poppins** em tudo (`font-poppins` no body). Sem segunda família por enquanto.
- Hierarquia por peso/cor antes de tamanho (peso 600 → 500 → 400 com opacidade).
- Níveis de texto do sistema: `text-foreground` (primário) · `text-foreground/80` (secundário) ·
  `text-foreground/70` (terciário) · `text-muted-foreground` (metadado/disabled).
- **Labels em sentence case** — nunca `uppercase`. Eyebrows e form labels usam `tracking-wide` + bold.
  Caixa alta só em dado real: códigos IATA, chaves TOTP, OTP, número de cartão, siglas de status/badge.
- Exemplos/labels da skill interface-design são em inglês: **aqui o copy é pt-BR, sentence case**.

## Espaçamento, raio e profundidade

- Raio base `--radius: 0.625rem` (10px); `rounded-md` é o padrão de componentes; não misturar sharp/soft.
- Profundidade: **borda + sombra sutil estilo shadcn** (`shadow-xs` em botões/cards elevados).
  Nunca sombra dramática; dark: anel `ring` no lugar de sombra.
- Sombra máxima do projeto é `shadow-xl` (modais e painéis flutuantes). `shadow-2xl` não existe mais.
- Marketing: seções com respiro grande (py 16–24). Admin: denso (padding de card 16–20px).

## Botão (valores de referência)

- Tamanhos: sm h-8 · default h-9 px-4 · lg h-10 px-6 · icon size-9.
- Focus: `focus-visible:ring-ring/50 ring-[3px]`. Hover padrão: `hover:bg-secondary/90 hover:scale-99`.
- WhatsApp: variante `whatsapp` (bg `#06C270`, texto branco) — reservada ao canal.

## Motion

- < 300ms para UI; ease-out; só transform/opacity; `prefers-reduced-motion` respeitado.
- Entradas de página no marketing podem existir; no admin, animação mínima (ferramenta repetida).

## Copy

- pt-BR sempre. Voz próxima e profissional (agência, não banco). Sentence case em títulos e botões.
- Verbo no botão diz o que acontece ("Confirmar reserva", não "Enviar").
- Nomes de domínio: locador/PNR, check-in, hóspede, faturamento corporativo (não "invoice"/"locator").

## Pendências conhecidas (próximos lotes)

- **Migração público → tokens:** concluída. Superfícies públicas, autenticação, checkout, contato,
  chat, minhas-viagens e componentes compartilhados usam apenas tokens semânticos (bg-card,
  text-foreground, text-muted-foreground, border-border, border-input, bg-muted,
  bg-destructive/*). Overlays sobre foto usam from-foreground/via-foreground.
- **Cores de status:** emerald/amber/sky seguem como paleta Tailwind crua, igual ao admin;
  vermelho de erro/ação destrutiva já foi unificado em destructive (text/bg/border + tints).
  Próximo passo opcional: tokens --success/--warning + escala de tints (50/100/200).
- **Exceções intencionais:** templates de e-mail (app/api/(utils)/*) mantêm hex porque clientes
  de e-mail não resolvem CSS vars; text-red-400 no menu escuro do admin preserva contraste sobre
  surface-dark.
- Telas de autenticação do cliente compartilham components/shared/auth-page-shell.tsx; telas novas
  devem usá-lo em vez de recriar a moldura min-h-screen + Container + card.
