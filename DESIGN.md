# Design

## Theme

### Physical scene

A hiring manager opens the link on a laptop during work hours — bright room or office lighting. They scan quickly, looking for role titles, company names, technologies, and dates. The design supports rapid scanning with clear hierarchy and generous spacing. On mobile, the same person might revisit during a commute or between meetings — content remains fully readable without zooming.

**Mode:** Light-first with full dark mode support. Light feels like quality bond paper; dark feels like a terminal-lit late-night session. Both are first-class citizens.

### Color strategy: Restrained

Tinted neutrals (warm zinc) with a single indigo accent.

### Color palette

OKLCH values. Dark-mode variants maintain the same relative hierarchy.

**Light mode:**
| Role | OKLCH | Tailwind | Usage |
|---|---|---|---|
| Surface | `oklch(0.98 0.005 275)` | zinc-50 → white | Card background |
| Page bg | `oklch(0.96 0.008 270)` | zinc-100 | Outer page background |
| Body text | `oklch(0.37 0.015 270)` | zinc-600 → zinc-700 | Paragraphs, descriptions |
| Muted text | `oklch(0.55 0.015 275)` | zinc-600 (dark: zinc-400) | Labels, dates, meta |
| Heading | `oklch(0.25 0.02 270)` | indigo-700 | Name, primary headings |
| Accent | `oklch(0.45 0.15 275)` | indigo-600 | Links, interactive elements |
| Accent strong | `oklch(0.4 0.18 270)` | indigo-700 | Hover states |
| Accent light | `oklch(0.85 0.04 280)` | indigo-200 | Badge borders |
| Accent fill | `oklch(0.92 0.03 280)` | indigo-50 | Badge background |
| Mark strong | `oklch(0.45 0.15 275)` | indigo-600 | Markdown `strong` |
| Mark em | `oklch(0.5 0.18 300)` | violet-600 | Markdown `em` |

**Dark mode:**
| Role | OKLCH | Tailwind | Usage |
|---|---|---|---|
| Surface | `oklch(0.2 0.01 270)` | zinc-900 | Card background |
| Page bg | `oklch(0.15 0.01 270)` | zinc-950 | Outer page |
| Body text | `oklch(0.7 0.015 265)` | zinc-300 | Paragraphs |
| Muted text | `oklch(0.45 0.015 270)` | zinc-500 | Labels, dates |
| Heading | `oklch(0.7 0.1 270)` | indigo-400 | Name, headings |
| Accent | `oklch(0.65 0.12 270)` | indigo-400 | Links, interactive |
| Accent strong | `oklch(0.7 0.12 265)` | indigo-300 | Hover states |
| Accent light | `oklch(0.25 0.04 275)` | indigo-800 | Badge borders |
| Accent fill | `oklch(0.15 0.04 275)` | indigo-950 | Badge background |
| Mark strong | `oklch(0.65 0.12 270)` | indigo-400 | Markdown `strong` |
| Mark em | `oklch(0.65 0.18 295)` | violet-400 | Markdown `em` |

Neutrals are tinted with a warm-indigo hue (chroma 0.005–0.01) — never pure gray. The accent sits at chroma ~0.15, restrained enough for body use, vivid enough for clear interactivity.

### Surface

The resume renders on a rounded white card (`border-radius: 0.5rem` / `sm`) with a subtle shadow (`shadow-xl`). In dark mode the shadow disappears and a thin inset ring (`ring-1 ring-zinc-700/50`) defines the boundary. No card nesting — single flat composition.

## Typography

### Font stack

| Role | Family | CSS var | Weights |
|---|---|---|---|---|
| Display / Serif | Spectral | `--font-spectral` | 400, 700 |
| UI / Sans | Work Sans | `--font-work-sans` | 300, 400, 500, 600 |
| Mono | Source Code Pro | `--font-source-code-pro` | 400 |

### Scale

- **Name (h1):** `text-5xl` → `lg:text-6xl` / font-bold font-serif / tracking-tight (light: indigo-700, dark: indigo-400)
- **Subtitle (h2):** `text-base` → `lg:text-lg` / font-serif / text-zinc-500 (dark: zinc-400)
- **Section headings:** uppercase, `text-sm`, font-semibold, font-serif, text-zinc-600 (dark: zinc-400), `tracking-widest`, bottom border (`border-b border-zinc-200 dark:border-zinc-700 pb-1`)
- **Item title (h3):** `text-lg`, font-semibold, `text-balance`
- **Date labels:** `text-sm`, font-mono, text-zinc-600 (dark: zinc-400)
- **Position / meta:** `text-sm`, font-serif, font-medium, text-zinc-500 (dark: zinc-400)
- **Body / description:** font-light, text-zinc-600 (dark: zinc-300), `leading-relaxed`, `text-pretty`
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
Dark: no shadow — `ring-1 ring-zinc-700/50` replaces it.

### Border radius

- Card: `rounded-xl` on sm+, full-width (no radius) below sm
- Badges: `rounded` (4px)

## Components

### Badge / Skill
Border + background fill (`border-indigo-200 bg-indigo-50` light, `border-indigo-800 bg-indigo-950` dark). Hover shifts background. Optional skill icon (16px) left-aligned.

### Badge / Contact
Inline link with icon. No container, no border. Text + icon in accent color, underline on hover via `transition-colors`.

### Section title
Uppercase serif label with `tracking-widest` and a full bottom border (`border-b border-zinc-200 dark:border-zinc-700`). Minimal height — just enough to anchor the section.

### WorkHighlight
Icon (carbon:software-resource-cluster, violet-500) + markdown content in a flex row. The icon sits at the top of the content, not centered.

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

Icons from Carbon Design System (via `@iconify-json/carbon`) for UI elements (at, link, launch, sun, moon, screen, translate, software-resource-cluster), plus Simple Icons (`@iconify-json/simple-icons`) for brand logos (GitLab, GitHub), Devicon (`@iconify-json/devicon-plain`) for skill icons, and Nonicons (`@iconify-json/nonicons`) as fallback.

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
