<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <h2 class="uppercase font-serif text-sm font-semibold mb-3 text-slate-500">
    {{ title }}
  </h2>
</template>
