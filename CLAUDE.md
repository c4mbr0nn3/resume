# CLAUDE.md

**pnpm** only. Node via `.nvmrc` (`nvm use`). Conventional Commits (commitlint + husky), one line, no body. Ask before committing/pushing.

## Architecture

Astro + Tailwind CSS v4 (Vite plugin, no `tailwind.config.*`), deployed to Netlify.

**i18n:** `en` (default, no prefix) + `it` (`/it/`). UI strings: `src/i18n/{en,it}.json` via `src/i18n/utils.ts` → `useTranslations(locale)`. Language switching is manual via `LanguageSwitcher`: clicking EN/IT writes a `locale` cookie that nothing reads (no auto-redirect).

**Resume data:** `src/assets/resume.{en,it}.json` — edit content here, not in components. Schema: [JSON Resume](https://jsonresume.org/schema/); only `basics`, `work`, `education`, `skills`, `languages`, `projects` implemented.

**Data flow:** Pages (`src/pages/index.astro`, `src/pages/it/index.astro`) import JSON + `useTranslations`, pass props to `TheResume` → `Header` / `Summary` / `Content` (section components). Stateless, top-down props.

**Icons:** `src/lib/icons.js` maps skill/social names (lowercase) → iconify IDs, used via `astro-icon`. Add new icon: add entry + install `@iconify-json/*`.

**Markdown:** Work/project descriptions use `src/lib/markdown.js` (markdown-it) + `Markdown.astro`.

**CSS:** Single stylesheet `src/assets/css/main.css`. Dark mode via `dark` class on `<html>` (theme cookie).

**Motion:** Reveals are gated on `html.js`: sections carry `data-reveal-group`; items are direct children or `data-reveal-list` wrappers. Keep content visible without JS and honor `prefers-reduced-motion`.

**404:** root + `/it/404/`; `netlify.toml` rewrites unmatched `/it/*` to the Italian page with status 404 (Netlify only auto-serves the root 404).

## MCP Tools

| Tool | When |
|------|------|
| `Astro_docs_search_astro_docs` | Astro APIs, config, routing, i18n, integrations |
| chrome-devtools-mcp | Live browser inspection, console errors, network requests, performance traces, screenshots |