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
.md-body :deep(a){
    font-weight: bolder;
    color: theme('colors.orange.600');
    text-decoration: underline;
    transition: color 0.2s;
}
.md-body :deep(a:hover){
    color: theme('colors.emerald.600');
}
.md-body :deep(strong){
    color: theme('colors.orange.600');
}
.md-body :deep(em){
    color: theme('colors.emerald.600');
    font-style: normal;
    font-weight: bolder;
}
</style>
