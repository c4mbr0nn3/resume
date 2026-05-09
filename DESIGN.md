# Design

## Theme

### Physical scene

A hiring manager opens the link on a laptop during work hours — bright room or office lighting. They scan quickly, looking for role titles, company names, technologies, and dates. The design supports rapid scanning with clear hierarchy and generous spacing. On mobile, the same person might revisit during a commute or between meetings — content remains fully readable without zooming.

**Mode:** Light-first with full dark mode support. Light feels like quality bond paper; dark feels like a terminal-lit late-night session. Both are first-class citizens.

### Color strategy: Restrained

Warm stone neutrals with a single rust/terra cotta accent.

### Color palette

OKLCH values. Dark-mode variants maintain the same relative hierarchy.

**Light mode:**
| Role | OKLCH | Tailwind | Usage |
|---|---|---|---|
| Surface | `oklch(0.98 0.005 70)` | stone-50 → white | Card background |
| Page bg | `oklch(0.96 0.008 65)` | stone-100 | Outer page background |
| Body text | `oklch(0.37 0.015 60)` | stone-600 → stone-700 | Paragraphs, descriptions |
| Muted text | `oklch(0.55 0.015 65)` | stone-600 (dark: stone-400) | Labels, dates, meta |
| Heading | `oklch(0.35 0.08 50)` | orange-700 | Name, primary headings |
| Accent | `oklch(0.5 0.12 50)` | orange-600 | Links, interactive elements |
| Accent strong | `oklch(0.45 0.14 48)` | orange-700 | Hover states |
| Accent light | `oklch(0.85 0.04 50)` | orange-200 | Badge borders |
| Accent fill | `oklch(0.92 0.03 55)` | orange-50 | Badge background |
| Mark strong | `oklch(0.5 0.12 50)` | orange-600 | Markdown `strong` |
| Mark em | `oklch(0.5 0.14 70)` | amber-600 | Markdown `em` |

**Dark mode:**
| Role | OKLCH | Tailwind | Usage |
|---|---|---|---|
| Surface | `oklch(0.2 0.01 65)` | stone-900 | Card background |
| Page bg | `oklch(0.15 0.01 65)` | stone-950 | Outer page |
| Body text | `oklch(0.7 0.015 60)` | stone-300 | Paragraphs |
| Muted text | `oklch(0.45 0.015 65)` | stone-500 | Labels, dates |
| Heading | `oklch(0.7 0.1 50)` | orange-400 | Name, headings |
| Accent | `oklch(0.65 0.12 50)` | orange-400 | Links, interactive |
| Accent strong | `oklch(0.7 0.12 48)` | orange-300 | Hover states |
| Accent light | `oklch(0.25 0.05 50)` | orange-800 | Badge borders |
| Accent fill | `oklch(0.15 0.04 55)` | orange-950 | Badge background |
| Mark strong | `oklch(0.65 0.12 50)` | orange-400 | Markdown `strong` |
| Mark em | `oklch(0.65 0.14 70)` | amber-400 | Markdown `em` |

Neutrals are tinted warm (hue ~60–65 at chroma 0.005–0.01) — never pure gray. The accent sits at a warm rust hue (hue ~50, chroma ~0.12), restrained enough for body use, vivid enough for clear interactivity.

### Surface

The resume renders on a rounded white card (`border-radius: 0.5rem` / `sm`) with a subtle shadow (`shadow-xl`). In dark mode the shadow disappears and a thin inset ring (`ring-1 ring-stone-700/50`) defines the boundary. No card nesting — single flat composition.

## Typography

### Font stack

| Role | Family | CSS var | Weights |
|---|---|---|---|---|
| Display / Serif | Spectral | `--font-spectral` | 400, 700 |
| UI / Sans | Work Sans | `--font-work-sans` | 300, 400, 500, 600 |
| Mono | Source Code Pro | `--font-source-code-pro` | 400 |

### Scale

- **Name (h1):** `text-5xl` → `lg:text-6xl` / font-bold font-serif / tracking-tight (light: orange-700, dark: orange-400)
- **Subtitle (h2):** `text-base` → `lg:text-lg` / font-serif / text-stone-500 (dark: stone-400)
- **Section headings:** uppercase, `text-sm`, font-semibold, font-serif, text-stone-600 (dark: stone-400), `tracking-widest`, bottom border (`border-b border-stone-200 dark:border-stone-700 pb-1`)
- **Item title (h3):** `text-lg`, font-semibold, `text-balance`
- **Date labels:** `text-sm`, font-mono, text-stone-600 (dark: stone-400)
- **Position / meta:** `text-sm`, font-serif, font-medium, text-stone-500 (dark: stone-400)
- **Body / description:** font-light, text-stone-600 (dark: stone-300), `leading-relaxed`, `text-pretty`
- **Badge text:** `text-sm`

### Line length

Body text capped at 65–75ch via the default container width.

## Elevation & space

### Card

The page body sits inside a container with `sm:p-10 lg:p-20` outer padding. The resume card uses `p-5 sm:p-10` inner padding. Gap between sections: `gap-5 sm:gap-10` (vertical stack).

### Layout grid

Desktop (lg+): 3-column grid — work + projects span 2 columns, skills + languages + education span 1 column.
Mobile: single column.

### Spacing rhythm

- Between content sections in the sidebar: `mb-5` per item block
- Between grid items: `gap-8`
- Badge gap: `gap-1`
- Contact row gap: `gap-2 sm:gap-3 lg:gap-6`

### Elevation

Light: `shadow-xl` on the resume card. No additional shadows on inner elements.
Dark: no shadow — `ring-1 ring-stone-700/50` replaces it.

### Border radius

- Card: `rounded-xl` on sm+, full-width (no radius) below sm
- Badges: `rounded` (4px)

## Components

### Badge / Skill
Inline text with icon in accent color with hover transition. No container, no border, no background fill.

### Badge / Contact
Inline link with icon. No container, no border. Text + icon in accent color, underline on hover via `transition-colors`.

### Section title
Uppercase serif label with `tracking-widest` and a full bottom border (`border-b border-stone-200 dark:border-stone-700`). Minimal height — just enough to anchor the section.

### WorkHighlight
Icon (carbon:chevron-right, amber-600/amber-400) + markdown content in a flex row. The icon sits at the top of the content, not centered.

### Links (ExternalLink)
Inline accent-colored link with a `carbon:launch` suffix icon. Underline on hover. If no URL, renders as plain accent text without icon.

### Theme toggle
Three-state toggle (system → light → dark) in the top-right corner, using carbon icons (screen / sun / moon). Stored in `theme` cookie for 1 year.

### Language switcher
Inline EN/IT links, also in the top-right corner. Active locale gets accent color + medium weight. Stores locale choice in `locale` cookie.

### Footer
Centered, smaller (`text-xs` for attribution). Build date, GitLab/GitHub links, Nathan Friend credit. All links use accent color.

## Motion & interaction

- Links and badges use `transition-colors` (200ms default, with Tailwind `transition-colors`)
- No layout-animating properties
- No bounce, no elastic — simple exponential ease-out
- Dark mode toggle has no transition (instant swap via class toggle — prefer predictability over flash)

## Iconography

Icons from Carbon Design System (via `@iconify-json/carbon`) for UI elements (at, link, launch, sun, moon, screen, translate, chevron-right), plus Simple Icons (`@iconify-json/simple-icons`) for brand logos (GitLab, GitHub), Devicon (`@iconify-json/devicon-plain`) for skill icons, and Nonicons (`@iconify-json/nonicons`) as fallback.

Icons are always `w-4 h-4` to `w-5 h-5`, never decorative alone — they accompany text.

## Responsive behavior

- **Mobile (<640px):** Card is full-width (no border-radius). Single column. Contact row stacks vertically.
- **Sm (640px+):** Card gains rounded corners + shadow. Contact row wraps. Section title + date go side by side.
- **Lg (1024px+):** 3-column grid activates. Name goes to `text-6xl`. Subtitle label becomes horizontal.
- **Container:** `max-width` via container utility, `sm:p-10 lg:p-20` outer padding.

## Resources

- **Source fonts:** Fontsource via Astro's font provider (Spectral, Work Sans, Source Code Pro)
- **Icons:** Carbon Design System, Simple Icons, Devicon, Nonicons
- **Markdown:** markdown-it with default renderer
- **Analytics:** Plausible (self-hosted, privacy-friendly)
- **Framework:** Tailwind CSS v4 via Vite plugin, no tailwind.config.js
