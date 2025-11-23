// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    preset: 'netlify-static',
  },
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
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

  tailwindcss: {
    config: {
      theme: {
        container: {
          center: true,
        },
        extend: {
          fontFamily: {
            serif: ['Merriweather', 'serif'],
            sans: ['Inter', 'sans-serif'],
            mono: ['Source Code Pro', 'monospace'],
          },
        },
      },
    },
  },
})
