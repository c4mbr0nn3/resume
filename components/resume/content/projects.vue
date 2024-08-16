<script setup>
const { projects } = useResume()
</script>

<template>
  <section>
    <ResumeContentTitle title="Projects" />
    <div v-for="(item, i) in projects" :key="i" class="mb-5">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-semibold">
          <NuxtLink :to="item.url" class="text-emerald-600  transition-all" :class="{ 'hover:text-orange-600': !!item.url }">
            {{ item.name }}
          </NuxtLink>
        </h3>
        <p class="text-sm font-mono text-slate-500">
          {{ item.startDate }} - {{ item.endDate }}
        </p>
      </div>
      <p class="font-light text-slate-600 mb-2 mt-1">
        <Markdown :content="item.description" />
      </p>
      <ListSkill :items="item.highlights" />
    </div>
  </section>
</template>
