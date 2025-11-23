<script setup>
const { basics } = useResume()
</script>

<template>
  <section v-if="basics?.summary">
    <Markdown :content="basics.summary" />
  </section>
</template>
