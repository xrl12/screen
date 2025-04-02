<template>
  <router-view />
</template>
<script setup lang="ts">
import { get_config } from '@/utils'
import { onMounted } from 'vue'

onMounted(async () => {
  const config = await get_config()
  console.log(config)
})

</script>

<style scoped></style>
