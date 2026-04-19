# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # start dev server
pnpm build      # production build → dist/
pnpm preview    # preview built output
pnpm lint       # eslint check
pnpm lint:fix   # eslint auto-fix
```

Package manager: **pnpm** (not npm/yarn). Node >=22.12.0 required.

Commits must follow Conventional Commits (enforced by commitlint + husky).

## Architecture

Astro 6 site with Tailwind CSS v4, deployed to Netlify.

**i18n:** Two locales — `en` (default, no prefix) and `it` (at `/it/`). Astro's built-in i18n handles routing (`prefixDefaultLocale: false`). Each locale has:
- Resume data: `src/assets/resume.en.json` / `src/assets/resume.it.json` — JSON Resume schema subset (basics, work, education, skills, projects, languages)
- UI strings: `src/i18n/en.json` / `src/i18n/it.json` — loaded via `src/i18n/utils.ts` → `useTranslations(locale)`

**Locale detection:** `src/pages/index.astro` contains inline JS that reads the `locale` cookie. If unset, it detects browser language and redirects to `/it/` if Italian; otherwise stays on `/`. The cookie persists the choice for 1 year.

**Data flow:** Pages (`src/pages/index.astro`, `src/pages/it/index.astro`) import JSON data + call `useTranslations`, then pass everything as props down to `TheResume` → `Header` / `Summary` / `Content` (section components). Components are stateless; all data flows top-down as props.

**Icons:** `src/lib/icons.js` maps skill/social names (lowercase) to iconify icon IDs. Used by badge/skill components via `astro-icon`. To add a new skill icon, add an entry here and ensure the corresponding `@iconify-json/*` package is installed.

**Markdown:** Work and project descriptions support markdown via `src/lib/markdown.js` (markdown-it) and the `Markdown.astro` component.

**CSS:** Single global stylesheet `src/assets/css/main.css`, Tailwind v4 via Vite plugin (no `tailwind.config.*`). Dark mode uses the `dark` class on `<html>` toggled by a theme cookie.

## Resume content

To update resume content, edit `src/assets/resume.en.json` and `src/assets/resume.it.json`. The schema follows [JSON Resume](https://jsonresume.org/schema/) — only `basics`, `work`, `education`, `skills`, `languages`, and `projects` sections are implemented.
