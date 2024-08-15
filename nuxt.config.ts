// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxt/fonts',
    '@nuxt/icon',
  ],

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Francesco Zorzi - Resume',
      meta: [
        { name: 'description', content: 'Francesco Zorzi - Resume' },
      ],
      htmlAttrs: {
        lang: 'en',
      },
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
