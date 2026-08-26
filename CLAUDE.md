# CLAUDE.md

**pnpm** only. Node via `.nvmrc` (`nvm use`). Conventional Commits (commitlint + husky), one line, no body. Ask before committing/pushing.

## Architecture

Astro + Tailwind CSS v4 (Vite plugin, no `tailwind.config.*`), deployed to Netlify.

**i18n:** `en` (default, no prefix) + `it` (`/it/`), Astro built-in i18n (`prefixDefaultLocale: false`). UI strings: `src/i18n/{en,it}.json` via `src/i18n/utils.ts` → `useTranslations(locale)`. Locale detection: `src/pages/index.astro` inline JS reads `locale` cookie; if unset, detects browser language, redirects to `/it/` if Italian (cookie persists 1 year).

**Resume data:** `src/assets/resume.{en,it}.json` — the files to edit for content changes. Schema: [JSON Resume](https://jsonresume.org/schema/); only `basics`, `work`, `education`, `skills`, `languages`, `projects` implemented.

**Data flow:** Pages (`src/pages/index.astro`, `src/pages/it/index.astro`) import JSON + `useTranslations`, pass props to `TheResume` → `Header` / `Summary` / `Content` (section components). Stateless, top-down props.

**Icons:** `src/lib/icons.js` maps skill/social names (lowercase) → iconify IDs, used via `astro-icon`. Add new icon: add entry + install `@iconify-json/*`.

**Markdown:** Work/project descriptions use `src/lib/markdown.js` (markdown-it) + `Markdown.astro`.

**CSS:** Single stylesheet `src/assets/css/main.css`. Dark mode via `dark` class on `<html>` (theme cookie).

## MCP Tools

| Tool | When |
|------|------|
| `Astro_docs_search_astro_docs` | Astro APIs, config, routing, i18n, integrations |
| chrome-devtools-mcp | Live browser inspection, console errors, network requests, performance traces, screenshots |