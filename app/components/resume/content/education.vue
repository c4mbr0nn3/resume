<script setup>
const { education } = useResume()
</script>

<template>
  <section>
    <ResumeContentTitle title="Education" />
    <div v-for="(item, i) in education" :key="i" class="mb-5">
      <div class="flex flex-col justify-between | sm:flex-row sm:items-center">
        <h3 class="text-lg font-semibold">
          <ExternalLink :href="item.url" :label="item.institution" />
        </h3>
        <p class="text-sm font-mono text-slate-500">
          {{ item.startDate }} - {{ item.endDate }}
        </p>
      </div>
      <p class="font-light text-slate-600">
        {{ item.studyType }} in {{ item.area }}
      </p>
    </div>
  </section>
</template>
