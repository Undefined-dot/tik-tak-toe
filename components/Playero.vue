<template>
    <svg :width="width" :height="height" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="45" :fill="intColor" :stroke="extColor" stroke-width="30"/>
    </svg>
</template>

<script setup lang="ts">
    defineProps({
        intColor: String,
        extColor: String,
        width: String,
        height: String,
    })
</script>