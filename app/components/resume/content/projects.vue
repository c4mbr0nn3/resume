<script setup>
const { projects } = useResume()
</script>

<template>
  <section>
    <ResumeContentTitle title="Projects" />
    <div v-for="(item, i) in projects" :key="i" class="mb-5">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-semibold">
          <ExternalLink :href="item.url" :label="item.name" />
        </h3>
        <p class="text-sm font-mono text-slate-500">
          {{ item.startDate }} - {{ item.endDate }}
        </p>
      </div>
      <p class="mb-2 mt-1">
        <Markdown :content="item.description" />
      </p>
      <p>
        <ListSkill :items="item.highlights" />
      </p>
    </div>
  </section>
</template>
