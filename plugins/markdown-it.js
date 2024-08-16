import md from 'markdown-it'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  const renderer = md()
  return {
    provide: {
      mdRenderer: renderer,
    },
  }
})
