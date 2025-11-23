<script setup>
const { skills } = useResume()
</script>

<template>
  <section>
    <ResumeContentTitle title="Skills" />
    <div v-for="(item, i) in skills" :key="i" class="mb-5">
      <h3 class="text-lg font-semibold text-emerald-600 mb-1">
        {{ item.name }}
      </h3>
      <ListSkill :items="item.keywords" />
    </div>
  </section>
</template>
