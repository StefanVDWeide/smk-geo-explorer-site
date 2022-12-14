<template>
    <div>
        <h1 class="text-xl md:text-2xl mb-8">Explore Denmark via art objects from the <NuxtLink to="https://www.smk.dk/"
                target="_blank" class="underline">SMK</NuxtLink>. Each object has
            a
            topographical motive
            somewhere in Denmark. Start with a random object and it's
            four
            closets neighbors. Click any of the neighbors to keep exploring. Distance to the main object is of course
            shown in 2x4 Lego
            bricks. (Stuck in a loop? Click <span @click="resetMainObject" class="underline cursor-pointer">here</span>
            to reset)
        </h1>
        <div v-if="currentMainObject && fourNearestObjects" class="flex justify-center items-center">
            <div class="w-full">
                <div
                    class="grid grid-rows-2 md:grid-rows-1 grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center">
                    <transition mode="out-in">
                        <div v-bind:key="currentMainObject.object_number">
                            <MainImageComponent :objectData="currentMainObject" />
                        </div>
                    </transition>
                    <div
                        class="grid grid-rows-2 grid-cols-2 gap-y-4 border-t-2 md:border-t-0 md:border-l-2 border-black pt-8 md:pt-0">
                        <transition mode="out-in" v-for="object in fourNearestObjects">
                            <PreviewImageComponent v-bind:key="object.object_number" :object-data="object"
                                :currentMainObjectGeoLocation="currentMainObject.geo_location"
                                @image-clicked="(object) => getNewMainObject(object)" />
                        </transition>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import objectIDs from "@/data.json";
import { artObject, APIBody } from "@/types/interfaces";

// Local state
const startObjectNumber = ref("");
const fourNearestObjects = ref<artObject[]>([]);
const currentMainObject = ref<artObject | undefined>();
const title = ref("Denmark Art Explorer");
const description = ref("Explore Denmark through art objects from the SMK");

useHead({
    title: title.value,
    meta: [{
        name: "description",
        content: description
    }]
})

// Methods
const getObjectsWithImages = (objectsList: artObject[], clearCurrentList: boolean) => {
    if (clearCurrentList) {
        fourNearestObjects.value = [];
    };

    for (const object of objectsList) {
        if (fourNearestObjects.value.length === 4) {
            return;
        }
        // Added extra check for geo_location
        if (object.has_image && object.geo_location) {
            fourNearestObjects.value.push(object);
        }
    };
    resetMainObject();
}

const getNewMainObject = async (objectNumber: string): Promise<void> => {
    try {
        const newMainObject = await $fetch(`https://api.smk.dk/api/v1/art/?object_number=${objectNumber}&lang=en`);
        const newFourNearestObjects = await $fetch(`https://api.smk.dk/api/v1/geo_id/?object_number=${objectNumber}&lang=en&rows=50`)

        currentMainObject.value = newMainObject.items[0];
        getObjectsWithImages(newFourNearestObjects.items, true);

    } catch (error) {
        console.log(error);
    }
}

const resetMainObject = async (): Promise<void> => {
    getRandomStartObject();
    await getNewMainObject(startObjectNumber.value);
}

const getRandomStartObject = (): void => {
    const numberOfIDs: number = objectIDs.length;
    const randomIndex: number = Math.floor(Math.random() * (numberOfIDs - 1) + 1);
    startObjectNumber.value = objectIDs[randomIndex];
}

// Explicitly call function as oposed to using IIFE for readability
// https://flaviocopes.com/javascript-iife/
getRandomStartObject();

// Fetch the data from the API

const [{ data: mainObject, error: mainObjectError }, { data: nearestObjects, error: nearestObjectsError }] = await Promise.all([
    useFetch<APIBody>(`https://api.smk.dk/api/v1/art/?object_number=${startObjectNumber.value}&lang=en`),
    useFetch<APIBody>(`https://api.smk.dk/api/v1/geo_id/?object_number=${startObjectNumber.value}&lang=en&rows=50`)
])

// Set the local state
if (mainObjectError.value || nearestObjectsError.value) {
    throw createError({ statusCode: 500, statusMessage: "An error occured while fetching the objects" })
}

// Set a timeout to ensure the API calls have completed. Eventhough we await the call, useFetch returns null initially
setTimeout(() => {
    // The initial object is sourced from a list of known objects with images thus no checkes needed
    currentMainObject.value = mainObject.value.items[0];
    getObjectsWithImages(nearestObjects.value.items, false);
}, 1000);

</script>

<style>
/* Transition animations */
.v-enter-active {
    transition: all 0.3s ease-out;
}

.v-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.v-enter-from,
.v-leave-to {
    transform: translateY(20px);
    opacity: 0;
}
</style>
