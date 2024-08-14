<script setup>
const { resume } = useResume()

const name = computed(() => resume.value.basics.name)
</script>

<template>
  <section>
    <h1 class="text-5xl font-serif tracking-tight text-emerald-500 pb-3">
      {{ name }}
    </h1>
    <ResumeContacts />
  </section>
</template>
