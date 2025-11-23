<script setup>
const { work } = useResume()
</script>

<template>
  <section>
    <ResumeContentTitle title="Work Experience" />
    <div v-for="(item, i) in work" :key="i" class="mb-5">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-semibold">
          <ExternalLink :href="item.url" :label="item.name" />
        </h3>
        <p class="text-sm font-mono text-slate-500">
          {{ item.startDate }} - {{ item.endDate }}
        </p>
      </div>
      <p class="text-sm font-serif text-slate-500 font-medium">
        {{ item.position }}
      </p>
      <p class="mb-2 mt-1">
        <Markdown :content="item.summary" />
      </p>
      <p>
        <ResumeContentWorkHighlight v-for="(content, j) in item.highlights" :key="j" :content="content" class="mb-2" />
      </p>
    </div>
  </section>
</template>
