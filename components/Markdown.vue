<script setup>
import { marked } from 'marked'

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
})

const compiledMarkdown = computed(() => {
  return marked(props.content)
})
</script>

<template>
  <ClientOnly>
    <div v-dompurify-html="compiledMarkdown" class="md-body" />
  </ClientOnly>
</template>

<style scoped>
.md-body :deep(a){
    font-weight: bolder;
    color: theme('colors.orange.600');
    text-decoration: none;
    transition: color 0.2s;
}
 .md-body :deep(a:hover){
    color: theme('colors.emerald.600');
}
 .md-body :deep(strong){
    color: theme('colors.orange.600');
}
</style>
