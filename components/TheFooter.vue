<template>
  <footer class=" text-center text-slate-500 font-light py-10 | sm:pb-10">
    <div class="flex flex-col items-center justify-center gap-1 | sm:flex-row sm:gap-3">
      <p>Last update: September 2024</p>
      <span class="hidden | sm:block">-</span>
      <p class="flex items-center">
        You can find the source code on&nbsp;
        <NuxtLink to="https://gitlab.com/j1mm0/resume" class="flex items-center gap-1 text-emerald-600 hover:text-orange-600 transition-all">
          GitLab
          <Icon name="simple-icons:gitlab" />
        </NuxtLink>
      </p>
    </div>
    <div class="text-xs mt-3 | sm:mt-2">
      Thanks to
      <NuxtLink to="https://nathanfriend.io" class="text-emerald-600 hover:text-orange-600 transition-all">
        Nathan Friend
      </NuxtLink>
      for the inspiration!
    </div>
  </footer>
</template>
