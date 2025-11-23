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
- `app/components/resume/` - Resume sections (header, contacts, content/)
- `app/components/resume/content/` - Individual sections (work, education, skills, projects, languages)

### Key Patterns
- **Markdown rendering**: Work and project descriptions support markdown via `markdown-it` plugin (`app/plugins/markdown-it.js`). The `Markdown.vue` component renders content using the injected `$mdRenderer`.
- **Icon system**: Uses `@nuxt/icon` with Iconify (Carbon, Nonicons, Simple Icons libraries). Icon mappings are defined in `app/composables/useIcons.js`.
- **Composables**: Auto-imported from `app/composables/` directory

## Color Palette

The project uses Tailwind CSS color classes with a minimal, professional palette:

- **Emerald** (Primary accent):
  - `emerald-600` - Main headings (h1 name), links, company/project titles
  - `emerald-700` - Contact badges
- **Orange** (Hover/interaction):
  - `orange-500` - Contact link hover state
  - `orange-600` - General link hover state
- **Slate** (Neutrals):
  - `slate-100` - Page background (`app.vue`), skill badge hover
  - `slate-500` - Secondary text (section titles, dates, positions, footer)
- **White** - Resume card background (`TheResume.vue`)

## Code Style

- ESLint with `@antfu/eslint-config` (strict, no Prettier)
- VS Code auto-fix on save enabled (`.vscode/settings.json`)
- Conventional commits enforced by commitlint + husky
  - Format: `type(scope): message` (e.g., `feat: add section`, `fix(resume): typo`)

## Deployment

- Platform: Netlify with `netlify-static` preset
- Triggered by push to main branch
- Static generation via `npm run build`

## Data Updates

Edit `app/assets/resume.json` to update resume content. Markdown is supported in work description and project details fields.

## License Note

Code is MIT licensed. Resume data in `app/assets/resume.json` is personal data with separate license terms.
