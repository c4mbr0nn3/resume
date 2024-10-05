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
      <Icon name="carbon:software-resource-cluster" class="text-emerald-600 mt-1" />
    </div>
    <Markdown :content="content" />
  </div>
</template>
