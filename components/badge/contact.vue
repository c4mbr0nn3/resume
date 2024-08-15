<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <NuxtLink class="flex items-center gap-2 group" :to="item.to" target="_blank">
    <Icon :name="item.icon" class="w-5 h-5 text-emerald-600 group-hover:text-orange-600 transition-colors" />
    <span class="font-light text-slate-600 group-hover:text-orange-600 transition-colors">{{ item.label }}</span>
  </NuxtLink>
</template>
