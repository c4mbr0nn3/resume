// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  nitro: {
    preset: 'netlify-static',
  },
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  modules: [
    '@vueuse/nuxt',
    '@nuxt/fonts',
    '@nuxt/icon',
  ],

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },

  css: [
    '~/assets/css/main.css',
  ],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
