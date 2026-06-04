# Design System

## Color Palette

Strategy: **Restrained light** — pure white surface, cobalt as brand anchor, amber as accent.

Seed: oklch(0.650 0.100 230) — cobalt/indigo (hue 230°)

```css
/* Base */
--color-bg:        oklch(1.000 0.000 0);       /* pure white */
--color-surface:   oklch(0.970 0.003 230);     /* light panel, faint cobalt tint */
--color-surface-2: oklch(0.940 0.006 230);     /* hover/elevated */
--color-border:    oklch(0.880 0.008 230);     /* divider */

/* Brand */
--color-primary:       oklch(0.48 0.14 230);   /* cobalt — CTAs, links, active */
--color-primary-hover: oklch(0.43 0.14 230);
--color-accent:        oklch(0.72 0.18 85);    /* amber — badges, trending */

/* Text */
--color-ink:    oklch(0.12 0.006 230);         /* near-black — 16:1 vs bg */
--color-muted:  oklch(0.44 0.008 230);         /* secondary — 4.6:1 vs bg */
--color-subtle: oklch(0.65 0.006 230);         /* placeholder — 2.8:1 vs bg */
```

Text on color fills: use white on primary (cobalt). Use dark ink on accent (amber L=0.72, use oklch(0.12 0 0)).

## Typography

Font stack:
- Display/heading: `'Pretendard Variable'` (variable, wght 400–800) — Korean + Latin
- Body: same family, weight contrast carries hierarchy
- Mono: `'Geist Mono'` — code snippets, technical labels

Scale (clamp-based, fluid):
```css
--text-xs:   0.75rem;
--text-sm:   0.875rem;
--text-base: 1rem;
--text-lg:   1.125rem;
--text-xl:   clamp(1.25rem, 2vw, 1.5rem);
--text-2xl:  clamp(1.5rem, 3vw, 2rem);
--text-3xl:  clamp(2rem, 4vw, 3rem);
--text-hero: clamp(2.5rem, 6vw, 5rem);
```

Rules:
- Body line-length: max 68ch
- Heading letter-spacing: -0.025em to -0.035em
- `text-wrap: balance` on h1–h3
- Weight scale: 400 body → 600 label → 700 heading → 800 display

## Spacing & Layout

Max content width: 1280px. Gutters: 20px mobile / 32px tablet / 48px desktop.

## Border Radius

```css
--radius-sm:   4px;    /* tags, badges, inputs */
--radius-md:   8px;    /* cards */
--radius-lg:   12px;   /* panels */
--radius-full: 9999px; /* pills */
```

No radius above 12px on cards or sections.

## Shadows

Light mode: soft drop shadows, no glow.

```css
--shadow-sm: 0 1px 3px oklch(0 0 0 / 0.07), 0 0 0 1px var(--color-border);
--shadow-md: 0 4px 12px oklch(0 0 0 / 0.08), 0 0 0 1px var(--color-border);
```

## Motion

```css
--duration-fast: 120ms;
--duration-base: 200ms;
--duration-slow: 350ms;
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
```

All animations require `@media (prefers-reduced-motion: reduce)`.

## Component Conventions

### Cards
- Background: `--color-surface`
- Border: `--color-border` (1px solid)
- Radius: `--radius-md` (8px)
- Hover: surface-2 background + slight shadow lift

### Badges / Tags
- Primary: cobalt fill, white text
- Accent/trending: amber fill, dark ink text
- Neutral: surface-2 fill, muted text
- Shape: `--radius-sm` (4px) square or `--radius-full` pill

### Buttons
- Primary: cobalt fill, white text, no border, radius-md
- Ghost: transparent, border (--color-border), muted text → ink on hover
- Size: default 40px / sm 32px / lg 48px

### Navigation
- Background: white with `backdrop-blur` when scrolled
- Active link: ink color, weight 600
- Inactive: muted color

## Z-index Scale

```css
--z-sticky:   200;
--z-modal-bg: 300;
--z-modal:    400;
--z-toast:    500;
```
