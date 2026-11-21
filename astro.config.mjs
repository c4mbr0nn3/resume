import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import icon from 'astro-icon'
import { defineConfig, fontProviders } from 'astro/config'

export default defineConfig({
  site: 'https://resume.francescozorzi.me',
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Work Sans',
      cssVariable: '--font-work-sans',
      fallbacks: ['sans-serif'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/work-sans-latin-300-normal.woff2'],
            weight: 300,
            style: 'normal',
            display: 'swap',
          },
          {
            src: ['./src/assets/fonts/work-sans-latin-400-normal.woff2'],
            weight: 400,
            style: 'normal',
            display: 'swap',
          },
          {
            src: ['./src/assets/fonts/work-sans-latin-500-normal.woff2'],
            weight: 500,
            style: 'normal',
            display: 'swap',
          },
          {
            src: ['./src/assets/fonts/work-sans-latin-600-normal.woff2'],
            weight: 600,
            style: 'normal',
            display: 'swap',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Spectral',
      cssVariable: '--font-spectral',
      fallbacks: ['serif'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/spectral-latin-400-normal.woff2'],
            weight: 400,
            style: 'normal',
            display: 'swap',
          },
          {
            src: ['./src/assets/fonts/spectral-latin-400-italic.woff2'],
            weight: 400,
            style: 'italic',
            display: 'swap',
          },
          {
            src: ['./src/assets/fonts/spectral-latin-700-normal.woff2'],
            weight: 700,
            style: 'normal',
            display: 'swap',
          },
          {
            src: ['./src/assets/fonts/spectral-latin-700-italic.woff2'],
            weight: 700,
            style: 'italic',
            display: 'swap',
          },
        ],
      },
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
      filter: page => !page.includes('/pdf'),
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', it: 'it' },
      },
    }),
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
