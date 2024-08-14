<script setup>
const { skills } = useResume()

const skillIcons = ref({
  'javascript': 'simple-icons:javascript',
  'vue.js': 'simple-icons:vuedotjs',
  'vuetify': 'simple-icons:vuetify',
  'html': 'simple-icons:html5',
  'css': 'simple-icons:css3',
  'java': 'nonicons:java-16',
  'c#': 'nonicons:c-sharp-16',
  '.net': 'simple-icons:dotnet',
  'postgresql': 'simple-icons:postgresql',
  'docker': 'simple-icons:docker',
  'kubernetes': 'simple-icons:kubernetes',
  'aws': 'simple-icons:amazonaws',
  'git': 'simple-icons:git',
  'github': 'simple-icons:github',
  'gitlab': 'simple-icons:gitlab',
})
</script>

<template>
  <section>
    <ResumeContentTitle title="Skills" />
    <div v-for="(item, i) in skills" :key="i" class="mb-5">
      <h3 class="text-lg font-semibold text-emerald-600 mb-1">
        {{ item.name }}
      </h3>
      <div class="flex items-center gap-2">
        <div
          v-for="skill in item.keywords"
          :key="skill"
          class="flex items-center gap-1 p-2 rounded  text-slate-600 hover:bg-slate-100 transition-colors text-sm"
        >
          <Icon v-if="skillIcons[skill.toLowerCase()]" :name="skillIcons[skill.toLowerCase()]" class="w-4 h-4" />
          {{ skill }}
        </div>
      </div>
    </div>
  </section>
</template>
