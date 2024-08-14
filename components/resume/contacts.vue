<script setup>
const { resume } = useResume()

const socialIcons = ref({
  github: 'cib:github',
  linkedin: 'cib:linkedin',
  twitter: 'cib:twitter',
  gitlab: 'cib:gitlab',
})

const contacts = computed(() => {
  const { email, url, profiles } = resume.value.basics
  const emailData = {
    icon: 'carbon:email',
    to: `mailto:${email}`,
    label: email,
  }
  const urlData = {
    icon: 'carbon:link',
    to: url,
    label: computed(() => new URL(url).hostname),
  }

  const profilesData = profiles.map((profile) => {
    return {
      icon: socialIcons.value[profile.network.toLowerCase()],
      to: profile.url,
      label: profile.username,
    }
  })

  return [emailData, urlData, ...profilesData]
})
</script>

<template>
  <div class="flex gap-6">
    <NuxtLink v-for="item in contacts" :key="item.to" class="flex items-center gap-2 group" :to="item.to" target="_blank">
      <Icon :name="item.icon" class="w-5 h-5 text-emerald-500 group-hover:text-slate-500 transition-colors" />
      <span class="font-light text-emerald-900 group-hover:text-slate-900 transition-colors">{{ item.label }}</span>
    </NuxtLink>
  </div>
</template>
