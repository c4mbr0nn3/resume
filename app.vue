<script setup>
const { fetch } = useResume()

await fetch()
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>

<style>
body{
  background-color: theme("colors.slate.100");
}
</style>
