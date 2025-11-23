<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <NuxtLink class="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors" :to="item.to" target="_blank" rel="noopener noreferrer">
    <Icon :name="item.icon" class="w-5 h-5 " />
    <span class="font-light ">{{ item.label }}</span>
  </NuxtLink>
</template>
