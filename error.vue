<template>
    <button @click="handleError">Clear errors</button>
</template>

<script lang="ts" setup>
const props = defineProps({
    error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>
