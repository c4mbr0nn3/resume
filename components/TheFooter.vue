<script setup>
const copyright = computed(() => {
  const year = new Date().getFullYear()
  const date = new Date()
  // TODO: get the last commit date from the git repository
  const month = date.toLocaleString('default', { month: 'long' })
  return `Last update: ${month} ${year}`
})
</script>

<template>
  <footer class=" text-center text-slate-500 font-light pt-10">
    <div class="flex items-center justify-center gap-3">
      <p>{{ copyright }} </p>
      -
      <p class="flex items-center">
        You can find the source code on&nbsp;
        <NuxtLink to="https://gitlab.com/j1mm0/resume" class="flex items-center gap-1 text-emerald-600 hover:text-orange-600 transition-all">
          GitLab
          <Icon name="simple-icons:gitlab" />
        </NuxtLink>
      </p>
    </div>
    <div class="text-xs mt-2">
      Thanks to
      <NuxtLink to="https://nathanfriend.io" class="text-emerald-600 hover:text-orange-600 transition-allte">
        Nathan Friend
      </NuxtLink>
      for the inspiration!
    </div>
  </footer>
</template>
