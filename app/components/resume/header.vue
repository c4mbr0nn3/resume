<script setup>
const { basics } = useResume()

const name = computed(() => basics.value.name)
const labelParts = computed(() => basics.value.label.split('|').map(s => s.trim()))
const location = computed(() => {
  const { city, region } = basics.value.location
  return `${city}, ${region}`
})
</script>

<template>
  <section>
    <h1 class="text-5xl font-serif tracking-tight text-emerald-600 pb-1 | sm:text-6xl">
      {{ name }}
    </h1>
    <div class="flex flex-col font-serif text-slate-500 pb-3 | sm:flex-row sm:gap-2">
      <h2 class="flex flex-col | sm:block">
        <span>{{ labelParts[0] }}</span>
        <span class="hidden sm:inline"> | </span>
        <span>{{ labelParts[1] }}</span>
      </h2>
      <span class="hidden sm:inline">-</span>
      <span>{{ location }}</span>
    </div>
    <ResumeContacts />
  </section>
</template>
