---
name: Zarpou Viagens e Turismo
description: A dependable, Portuguese-first travel service with human support and curated trips.
colors:
  primary: "#05345b"
  primary-hover: "#084574"
  primary-light: "#0b548f"
  secondary: "#ebb343"
  secondary-hover: "#dba130"
  secondary-ink: "#996b00"
  whatsapp: "oklch(0.739 0.171 152.55)"
  whatsapp-hover: "#20ba59"
  surface-dark: "#0f172a"
  background: "oklch(1 0 0)"
  foreground: "oklch(0.145 0 0)"
  card: "oklch(1 0 0)"
  muted: "oklch(0.97 0 0)"
  muted-foreground: "oklch(0.556 0 0)"
  border: "oklch(0.922 0 0)"
  input: "oklch(0.922 0 0)"
  ring: "oklch(0.708 0 0)"
  destructive: "oklch(0.577 0.245 27.325)"
  primary-foreground: "oklch(0.985 0 0)"
  secondary-foreground: "oklch(0.205 0 0)"
  neutral-white: "#ffffff"
typography:
  body:
    fontFamily: "Poppins, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "14px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-default:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    rounded: "{rounded.md}"
    height: "36px"
    padding: "8px 16px"
  button-whatsapp:
    backgroundColor: "{colors.whatsapp}"
    textColor: "{colors.neutral-white}"
    rounded: "{rounded.md}"
    height: "36px"
    padding: "8px 16px"
  input:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    height: "36px"
    padding: "4px 12px"
---

# Design System: Zarpou Viagens e Turismo

## Overview

**Creative North Star: “The trusted travel desk.”**

Zarpou pairs the reassurance of an experienced travel agency with human support and curated trips. Its visual language is grounded and dependable: the established navy and gold identity carries through the public booking experience and the agency's operational tools, while destination imagery keeps travel visible in the customer experience.

The intended direction is one consistent content density across marketing, booking, and admin surfaces. The current implementation varies between airier public pages and denser admin screens; treat that as a consistency gap to resolve over time, not a reason to change the product's identity.

**Key Characteristics:**
- Navy establishes the agency's identity; gold marks actions and highlights.
- Poppins is the single type family.
- Portuguese-first copy uses sentence case.
- Keep one consistent density across surfaces.

## Colors

The source of truth is the CSS variables in `app/globals.css`. Use semantic Tailwind classes that map to these values.

### Primary
- **Travel navy** (`{colors.primary}`): institutional identity, brand headings, and key links. `primary-hover` and `primary-light` are its interaction and gradient companions.

### Secondary
- **Journey gold** (`{colors.secondary}`): primary actions and meaningful highlights. Use `secondary-hover` for interaction and `secondary-ink` where a darker gold text treatment is needed.
- **WhatsApp green** (`{colors.whatsapp}`): reserve for WhatsApp contact actions; use `whatsapp-hover` on hover.

### Neutral
- **Background and card** (`{colors.background}`, `{colors.card}`): white page and content surfaces.
- **Foreground** (`{colors.foreground}`): primary text.
- **Muted** (`{colors.muted}`, `{colors.muted-foreground}`): quiet surfaces, supporting text, and metadata.
- **Border and input** (`{colors.border}`, `{colors.input}`): dividers and control outlines.
- **Admin dark surface** (`{colors.surface-dark}`): sidebar, login, and other dark admin surfaces; use light text and subtle light borders there.
- **Destructive** (`{colors.destructive}`): errors and destructive actions.

Status colors such as emerald, amber, and sky appear in the current UI for status-specific meaning. Do not use them as decorative accents.

## Typography

**Display Font:** Poppins (sans-serif fallback)  
**Body Font:** Poppins (sans-serif fallback)

**Character:** A single, familiar typeface keeps the agency's customer and operational experiences cohesive. Build hierarchy with weight, semantic color, and spacing before adding new type styles.

### Hierarchy
- **Body** (400, 16px default): general copy and form content.
- **Titles** (commonly 600–800): page and section headings; observed sizes vary by surface.
- **Labels** (commonly 600, small size, slight tracking): form labels and compact metadata; use sentence case.

### Named Rules
**The One-Family Rule.** Use Poppins throughout; the project has no second display or mono family defined as part of its visual identity.

## Layout

Use the Tailwind spacing scale in 4px increments. The shared `Container` uses a 64rem maximum width with small mobile gutters; the public header uses a 72rem maximum width. The admin layout uses a 16rem navigation rail and a scrollable content area.

Keep content density consistent across marketing, booking, and admin. Existing pages do not yet follow that target uniformly, so avoid extending the current density split when adding or revising screens. Preserve responsive layouts and allow navigation and content to reflow on smaller screens.

## Elevation & Depth

The established approach combines light borders with restrained shadows for cards and controls. Dark admin surfaces rely on fine light borders because shadows have little separation on dark backgrounds. Keep elevation quiet; larger shadows are reserved for modal or floating layers. The shared Button and Card primitives currently use `shadow-xs`, so retain that treatment where building on existing components.

## Shapes

The base radius is 10px, with the Tailwind theme mapping `rounded-sm` to 6px, `rounded-md` to 8px, `rounded-lg` to 10px, and `rounded-xl` to 14px. Shared buttons and inputs use the 8px scale; cards commonly use 14px. Keep nested corners visually related and avoid introducing unrelated radius values.

## Components

- **Button:** use `components/ui/button.tsx`. Its default action is gold with dark text; outline, ghost, destructive, and WhatsApp variants are available. Default height is 36px, with visible keyboard focus and disabled states.
- **WhatsApp action:** use the dedicated `whatsapp` button variant or shared WhatsApp link component. Green belongs to this channel.
- **Card:** use `components/ui/card.tsx` for the shared card surface and border treatment. Page-specific cards may add layout, but should keep semantic colors and the established radius family.
- **Input:** use `components/ui/input.tsx` and the shared form primitives. Inputs are 36px high with semantic focus and invalid states.
- **Admin navigation:** use the dark `surface-dark` rail with restrained separators and gold for the active item.
- **Customer authentication:** use `components/shared/auth-page-shell.tsx` to keep the customer auth frame consistent.

## Do's and Don'ts

- **Do** use semantic color tokens from `app/globals.css` and the shared UI primitives.
- **Do** keep gold for actions and highlights, navy for institutional identity, and green for WhatsApp.
- **Do** keep customer-facing copy in Brazilian Portuguese and sentence case; uppercase is for real codes and status abbreviations.
- **Do** maintain a consistent content density across public and operational surfaces as the system is brought into alignment.
- **Don't** introduce decorative color, new type families, arbitrary radii, or dramatic shadows.
- **Don't** treat unverified pricing, registration, service-level, or review claims as design-system facts; see `PRODUCT.md` for the current verification note.
