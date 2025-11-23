<script setup>
const { work } = useResume()
</script>

<template>
  <section>
    <ResumeContentTitle title="Work Experience" />
    <div v-for="(item, i) in work" :key="i" class="mb-5">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-semibold">
          <NuxtLink :to="item.url" class="text-teal-600  transition-all" :class="{ 'hover:text-teal-700': !!item.url }" target="_blank" rel="noopener noreferrer">
            {{ item.name }}
          </NuxtLink>
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
