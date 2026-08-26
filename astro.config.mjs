import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import icon from 'astro-icon'
import { defineConfig, fontProviders } from 'astro/config'

export default defineConfig({
  site: 'https://resume.francescozorzi.me',
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Work Sans',
      cssVariable: '--font-work-sans',
      weights: [300, 400, 500, 600],
      styles: ['normal'],
      subsets: ['latin'],
      display: 'swap',
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Spectral',
      cssVariable: '--font-spectral',
      weights: [400, 700],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      display: 'swap',
      fallbacks: ['serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Source Code Pro',
      cssVariable: '--font-source-code-pro',
      weights: [400],
      styles: ['normal'],
      subsets: ['latin'],
      display: 'swap',
      fallbacks: ['monospace'],
    },
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'it'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    icon(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', it: 'it' },
      },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
})
