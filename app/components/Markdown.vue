<script setup>
defineProps({
  content: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div
    class="md-body font-light text-slate-600"
    v-html="$mdRenderer.render(content)"
  />
</template>

<style scoped>
.md-body :deep(a) {
  font-weight: bolder;
  color: var(--color-teal-600);
  text-decoration: underline;
  transition: color 0.2s;
}

.md-body :deep(a:hover) {
  color: var(--color-teal-700);
}

.md-body :deep(strong) {
  color: var(--color-teal-600);
}

.md-body :deep(em) {
  color: var(--color-slate-700);
  font-style: italic;
  font-weight: 500;
}
</style>
