<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="flex flex-wrap items-center gap-1">
    <BadgeSkill v-for="item in items" :key="item" :skill="item" />
  </div>
</template>
