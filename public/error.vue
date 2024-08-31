<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})

throw createError({
  statusCode: 404,
  statusMessage: 'Page Not Found',
  data: {
    myCustomField: true
  }
})

</script>

<template>
  <div class="container-error">
    <h1>{{ error?.statusCode }}</h1>
    <NuxtLink to="/">Go back home</NuxtLink>
  </div>
</template>

<style>
    .container-error {
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
}
</style>
