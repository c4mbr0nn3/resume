<script setup>
defineProps({
  skill: {
    type: String,
    required: true,
  },
})

const { skill: icons } = useIcons()
</script>

<template>
  <div class="flex items-center gap-1 p-2 rounded border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors text-sm">
    <Icon v-if="icons[skill.toLowerCase()]" :name="icons[skill.toLowerCase()]" class="w-4 h-4" />
    {{ skill }}
  </div>
</template>
