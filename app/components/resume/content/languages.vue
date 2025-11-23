<script setup>
const { languages } = useResume()
</script>

<template>
  <section>
    <ResumeContentTitle title="Languages" />
    <div class="flex flex-col flex-wrap gap-3 mb-5">
      <div v-for="(item, i) in languages" :key="i" class="flex items-center gap-1">
        <h3 class="font-medium text-emerald-600">
          {{ item.language }}:
        </h3>
        <span class="font-light text-slate-600">{{ item.fluency }}</span>
      </div>
    </div>
  </section>
</template>
