# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal resume single-page application built with Nuxt 4 + Vue 3, styled with Tailwind CSS, deployed on Netlify. Resume data follows the JSON Resume schema with markdown support for descriptions.

**Live URL**: https://resume.francescozorzi.me/

## Commands

```bash
# Development
npm run dev          # Start dev server on http://localhost:3000
npm run build        # Build for production
npm run generate     # Generate static site
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint checks
npm run lint:fix     # Auto-fix ESLint issues
```

## Architecture

### Core Data Flow
- Resume data lives in `app/assets/resume.json` (JSON Resume schema)
- `app/composables/useResume.js` provides reactive state via `useState()`
- Components consume data through the `useResume()` composable

### Component Structure
- `app/pages/index.vue` - Single page container
- `app/components/TheResume.vue` - Main resume wrapper
- `app/components/resume/` - Resume sections (header, contacts, summary, content/)
- `app/components/resume/content/` - Individual sections (work, education, skills, projects, languages)

### Key Patterns
- **Markdown rendering**: Work and project descriptions support markdown via `markdown-it` plugin (`app/plugins/markdown-it.js`). The `Markdown.vue` component renders content using the injected `$mdRenderer`.
- **Icon system**: Uses `@nuxt/icon` with Iconify (Carbon, Nonicons, Simple Icons, Devicon Plain libraries). Icon mappings are defined in `app/composables/useIcons.js`.
- **Composables**: Auto-imported from `app/composables/` directory

### Styling Setup (Tailwind CSS v4)
- **CSS Entry Point**: `app/assets/css/main.css` - Main CSS file with Tailwind v4 import
- **Configuration**: CSS-first approach using `@theme` directive for custom theme values
- **Vite Integration**: Uses `@tailwindcss/vite` plugin configured in `nuxt.config.ts`
- **Custom Fonts**: Defined in CSS via `--font-serif`, `--font-sans`, `--font-mono` variables
- **Container Utility**: Centered containers using `@utility container` with `margin-inline: auto`
- **CSS Variables**: Component styles use CSS variables (e.g., `var(--color-teal-600)`) instead of `theme()` function

## Color Palette

The project uses Tailwind CSS color classes with a modern, minimal teal palette:

- **Teal** (Primary accent):
  - `teal-600` - Main headings (h1 name), links, bold text in markdown (skills/achievements)
  - `teal-700` - Hover states
- **Emerald** (Accents):
  - `emerald-600` - Work highlight bullet icons
- **Slate** (Neutrals):
  - `slate-50` - Page background (`app.vue`)
  - `slate-500` - Secondary text (section titles, dates, positions, footer)
  - `slate-600` - Body text in markdown
- **White** - Resume card background (`TheResume.vue`)

### Markdown Styling
In `Markdown.vue`, text emphasis is styled:
- **Bold** (`**text**`) → `teal-600` - Used for skills, technologies, achievements
- **Italic** (`*text*`) → `slate-700` + italic style + medium weight (500) - Used for category labels like *Backend:*, *Manager:*

## Code Style

- ESLint with `@antfu/eslint-config` (strict, no Prettier)
- VS Code auto-fix on save enabled (`.vscode/settings.json`)
- Conventional commits enforced by commitlint + husky
  - Format: `type(scope): message` (e.g., `feat: add section`, `fix(resume): typo`)

## Deployment

- Platform: Netlify with `netlify-static` preset (configured in `nuxt.config.ts`)
- Triggered by push to main branch
- Build command: `npm run build` (standard build)
- Static generation: `npm run generate` (creates static output for deployment)

## Data Updates

Edit `app/assets/resume.json` to update resume content. Markdown is supported in work description and project details fields.

## License Note

Code is MIT licensed. Resume data in `app/assets/resume.json` is personal data with separate license terms.
