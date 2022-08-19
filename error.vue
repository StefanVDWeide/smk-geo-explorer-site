<template>
    <div>
        <h1 class="text-2xl">Oops! Looks like an error occured. Click the button below to go back to the homepage</h1>
        <button @click="handleError"
            class="text-black  bg-transparent  px-4 py-2 border-2 rounded border-black hover:bg-black  hover:text-white">Back
            home</button>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>
