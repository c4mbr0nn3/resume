<script setup>
const { fetch } = useResume()

const description = 'Software Engineer Manager leading dev team, overseeing IT projects. Expertise in Vue.js, .NET, PostgreSQL. Manages workload, recruits talent, sets standards.'
const title = 'Francesco Zorzi - Resume'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://picsum.photos/id/988/1200/630',
  ogUrl: 'https://resume.francescozorzi.me/',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: 'https://picsum.photos/id/988/1200/630',
  twitterCard: 'summary',
})

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    },
  ],
  script: [
    {
      src: 'https://analytics.zorygo.ovh/js/pa-rZeXMBjHeyBgH948AJs7u.js',
      async: true,
    },
    { innerHTML: 'window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()' },
  ],
})

await fetch()
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>

<style>
body {
  background-color: var(--color-slate-50);
}
</style>
