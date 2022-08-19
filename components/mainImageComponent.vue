<template>
    <div>
        <NuxtLink :to="objectData.frontend_url" target="_blank">
            <div class="flex justify-center items-center h-64 md:h-[500px]">
                <nuxt-img :src="objectData.image_thumbnail" class="max-h-full" />
            </div>
        </NuxtLink>
        <h2 class="text-2xl mt-4 md:mt-0">{{ objectData.titles[0].title }}</h2>
        <span class="block text-1xl font-thin">{{ objectData.artist[0] }} - {{
                objectData.production_date[0].period
        }}</span>
        <NuxtLink :to="`https://www.google.com/maps/search/?api=1&query=${objectData.geo_location}`" target="_blank"
            class="block text-1xl font-thin">See on the map</NuxtLink>
    </div>
</template>

<script lang="ts" setup>

// Define props passed down from the parent
const props = defineProps({
    objectData: Object
})
</script>
