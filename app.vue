<template>
  <div class="container min-h-screen mx-auto pb-24 px-6 md:px-12 font-gtflexa">
    <navbar-component />
    <div>
      <NuxtPage />
    </div>
  </div>
</template>

<script lang="ts" setup>
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - DAE` : 'Denmark Art Explorer';
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  charset: 'utf-8',
  meta: [
    { name: 'description', content: 'My amazing site.' }
  ],
  link: [
    {
      rel: "icon",
      href: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🇩🇰</text></svg>"
    }
  ]
})
</script>
