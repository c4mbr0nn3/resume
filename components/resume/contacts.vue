<script setup>
const { basics } = useResume()

const { social: icons } = useIcons()

const contacts = computed(() => {
  const { email, url, profiles } = basics.value
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
      icon: icons.value[profile.network.toLowerCase()],
      to: profile.url,
      label: profile.username,
    }
  })

  return [emailData, urlData, ...profilesData]
})
</script>

<template>
  <div class="flex flex-col gap-2 | sm:flex-row sm:flex-wrap lg:gap-6">
    <BadgeContact v-for="item in contacts" :key="item.to" :item="item" />
  </div>
</template>
