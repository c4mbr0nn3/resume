<script setup>
defineProps({
  href: {
    type: String,
    default: null,
  },
  label: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <NuxtLink
    v-if="href"
    :to="href"
    class="inline-flex items-center gap-1 text-teal-600 hover:text-teal-700 transition-colors"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span>{{ label }}</span>
    <Icon name="carbon:launch" class="w-3.5 h-3.5" />
  </NuxtLink>
  <span v-else>{{ label }}</span>
</template>
