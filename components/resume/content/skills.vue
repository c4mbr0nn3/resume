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
      <div class="flex flex-wrap items-center gap-1">
        <BadgeSkill v-for="skill in item.keywords" :key="skill" :skill="skill" />
      </div>
    </div>
  </section>
</template>
