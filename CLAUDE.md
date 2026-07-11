# CLAUDE.md

Caveman mode must be always on.

## Commands

```bash
pnpm dev        # dev server
pnpm build      # build → dist/
pnpm preview    # preview build
pnpm lint       # eslint check
pnpm lint:fix   # eslint auto-fix
```

**pnpm** only. Node 24 (`.nvmrc`, `nvm use`). Conventional Commits (commitlint + husky), one line, no body. Ask before committing/pushing.

## Architecture

Astro 7 + Tailwind CSS v4 (Vite plugin, no `tailwind.config.*`), deployed to Netlify.

**i18n:** `en` (default, no prefix) + `it` (`/it/`), Astro built-in i18n (`prefixDefaultLocale: false`). Each locale has resume data (`src/assets/resume.{en,it}.json`, JSON Resume subset: basics, work, education, skills, projects, languages) and UI strings (`src/i18n/{en,it}.json` via `src/i18n/utils.ts` → `useTranslations(locale)`).

**Locale detection:** `src/pages/index.astro` inline JS reads `locale` cookie; if unset, detects browser language, redirects to `/it/` if Italian. Cookie persists 1 year.

**Data flow:** Pages (`src/pages/index.astro`, `src/pages/it/index.astro`) import JSON + `useTranslations`, pass props to `TheResume` → `Header` / `Summary` / `Content` (section components). Stateless, top-down props.

**Icons:** `src/lib/icons.js` maps skill/social names (lowercase) → iconify IDs, used via `astro-icon`. Add new icon: add entry + install `@iconify-json/*`.

**Markdown:** Work/project descriptions use `src/lib/markdown.js` (markdown-it) + `Markdown.astro`.

**CSS:** Single stylesheet `src/assets/css/main.css`. Dark mode via `dark` class on `<html>` (theme cookie).

## Resume content

Edit `src/assets/resume.{en,it}.json`. Schema: [JSON Resume](https://jsonresume.org/schema/) — only `basics`, `work`, `education`, `skills`, `languages`, `projects` implemented.

## MCP Tools

| Tool | When |
|------|------|
| `Astro_docs_search_astro_docs` | Astro APIs, config, routing, i18n, integrations |
| `context7_resolve-library-id` + `context7_query-docs` | Up-to-date JS/TS library docs (React, Tailwind, etc.) |

## Skills

| Skill | When |
|-------|------|
| `caveman` | Token-efficient responses (`/caveman [lite\|full\|ultra]`) |
| `caveman-commit` | Conventional Commits (`/commit`) |
| `impeccable` | Frontend/UI design review, polish, accessibility, theming, layout, UX |

## Design Context

Brand: **Precise · Warm · Confident**. See `PRODUCT.md` (strategy) + `DESIGN.md` (visual system) at root. Load: `node .agents/skills/impeccable/scripts/load-context.mjs`.