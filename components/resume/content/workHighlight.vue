<script setup>
defineProps({
  content: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="flex gap-2">
    <div class="mb-auto">
      <Icon name="carbon:checkmark-outline" class="text-emerald-600 mt-1" />
    </div>
    <Markdown :content="content" />
  </div>
</template>
