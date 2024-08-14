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
  <footer class=" text-center text-slate-500 font-light p-10 flex items-center justify-center gap-3">
    <p>{{ copyright }} </p>
    -
    <p class="flex items-center">
      You can find the source code on&nbsp;
      <NuxtLink to="https://gitlab.com/username/repo" class="flex items-center gap-1 text-emerald-600 hover:text-orange-600 transition-all">
        GitLab
        <Icon name="cib:gitlab" />
      </NuxtLink>
    </p>
  </footer>
</template>
