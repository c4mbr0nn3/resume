# CLAUDE.md

**pnpm** only. Node via `.nvmrc` (`nvm use`). Conventional Commits (commitlint + husky), one line, no body. Ask before committing/pushing.

## Architecture

Astro + Tailwind CSS v4 (Vite plugin; theme lives in `src/assets/css/main.css` via `@theme`), deployed to Netlify.

**i18n:** `en` (default, no prefix) + `it` (`/it/`), configured in `astro.config.mjs`. UI strings: `src/i18n/{en,it}.json` via `src/i18n/utils.ts` → `useTranslations(locale)`. Language switching is manual via `LanguageSwitcher`: clicking EN/IT writes a `locale` cookie that nothing reads (no auto-redirect).

**Resume data:** `src/assets/resume.{en,it}.json` — content lives here, components render it. Keep both locales' keys and shapes identical. Schema: [JSON Resume](https://jsonresume.org/schema/); implemented: `basics`, `work`, `education`, `skills`, `languages`, `projects`.

**Data flow:** Pages (`src/pages/index.astro`, `src/pages/it/index.astro`) import JSON + `useTranslations`, pass props to `TheResume` → `Header` / `Summary` / `Content` (section components). Stateless, top-down props.

**SEO:** `BaseLayout` owns canonical, hreflang, OG/Twitter meta, fonts, and JSON-LD. `src/lib/seo.ts` derives the Person schema from resume data — `jobTitle` is the first `|` segment of `basics.label`.

**Icons:** `src/lib/icons.js` maps skill/social names (lowercase) → iconify IDs, used via `astro-icon`. Add new icon: add entry + install `@iconify-json/*`.

**Markdown:** Work/project descriptions use `src/lib/markdown.js` (markdown-it) + `Markdown.astro`.

**Copy rules (content slop):** Every sentence names a thing, a number, or an owner — no stock phrases ("scalable solutions", "best practices", "closely collaborated"), no unquantified impact adverbs ("significantly", "drastically"), no vague objects ("various projects", "hands-on experience with..."). No em-dashes (`—`); en-dashes only for numeric ranges (`2–3`). **Bold discipline:** max 3 `**bold**` per text block, kept symmetrical across locales; never bold stack names/versions already listed in that entry's `highlights` chips; bold is for the metric, the scope, or the one distinctive item. EN and IT must tell the same story — same facts, same qualifiers.

**CSS:** Single stylesheet `src/assets/css/main.css`; print rules force light A4/Letter output and pin reveal end-states. Dark mode via `dark` class on `<html>`: the `theme` cookie boots in `BaseLayout` (no-flash script) and toggles in `LanguageSwitcher`.

**Motion:** Reveals are gated on `html.js`: sections carry `data-reveal-group`; items are direct children or `data-reveal-list` wrappers. First-load entrances use `.line-mask` (heading lines) and `data-rise` with `--i`. Keep content visible without JS and honor `prefers-reduced-motion`.

**404:** root + `/it/404/`; `netlify.toml` rewrites unmatched `/it/*` to the Italian page with status 404 (Netlify only auto-serves the root 404).

## Verify

No test suite. Before reporting done: `pnpm lint` clean and `pnpm build` succeeds; use the chrome-devtools MCP for runtime and visual checks.

## MCP Tools

| Tool | When |
|------|------|
| `Astro_docs_search_astro_docs` | Astro APIs, config, routing, i18n, integrations |
| chrome-devtools-mcp | Live browser inspection, console errors, network requests, performance traces, screenshots |