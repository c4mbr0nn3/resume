<script setup>
const { basics } = useResume()

const name = computed(() => basics.value.name)
const label = computed(() => basics.value.label)
const location = computed(() => {
  const { city, region } = basics.value.location
  return `${city}, ${region}`
})
</script>

<template>
  <section>
    <h1 class="text-5xl font-serif tracking-tight text-emerald-600 pb-1">
      {{ name }}
    </h1>
    <div class="flex gap-2 font-serif text-slate-500 pb-3">
      <h2>
        {{ label }}
      </h2>
      -
      <span>{{ location }}</span>
    </div>
    <ResumeContacts />
  </section>
</template>
