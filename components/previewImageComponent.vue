<template>
    <div class="flex justify-center items-center cursor-pointer">
        <div class=" text-center">
            <div class="flex justify-center items-center">
                <nuxt-img @click="handleImageClick(objectData.object_number)" :src="objectData.image_thumbnail"
                    class="w-1/2" />
            </div>
            <span class="text-sm">
                Distance: {{
                        getDistanceBetweenObjectInLegoBlocks(currentMainObjectGeoLocation,
                            objectData.geo_location)
                }} X
                <nuxt-img src="/images/2_by_4_brick_perspective.svg" width="25px" class="inline" />
            </span>
        </div>
    </div>
</template>

<script lang="ts" setup>

// Define props passed down from the parent
const props = defineProps({
    objectData: Object,
    currentMainObjectGeoLocation: String
});

// Define emits to pass data back to the parent
const emit = defineEmits(["imageClicked"]);

// Methods
const handleImageClick = (object_number: string) => {
    emit("imageClicked", object_number);
}

const getDistanceBetweenObjectInLegoBlocks = (pointA: string, pointB: string): Number => {
    const deg2rad = (deg) => {
        return deg * (Math.PI / 180)
    }

    const lat1 = parseFloat(pointA.split(",")[0]);
    const lat2 = parseFloat(pointB.split(",")[0]);
    const lon1 = parseFloat(pointA.split(",")[1]);
    const lon2 = parseFloat(pointB.split(",")[1]);

    // Radius of the earth in km
    const R = 6371;

    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Distance in km
    const d = R * c;
    return Math.floor((d * 1_000_000) / 31.8);
}
</script>
