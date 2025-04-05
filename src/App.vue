<template>
  <router-view />
</template>
<script setup lang="ts">
import { get_config } from '@/utils'
import { onMounted } from 'vue'
import type { DefaultConfig } from '../SCelectron/enum/type'
import hotkeys from 'hotkeys-js'
import { useRouter } from 'vue-router'

const router = useRouter()
onMounted(() => {
  get_config().then((res: DefaultConfig) => {
    hotkeys(Object.values(res).join(','), function (_, handler) {
      if (handler.key === res.screen_capture) {
        router.push({ name: 'screen_capture' })
      }
      // console.log(event, 'event')
      // console.log(handler, 'handler')
      // console.log('hello world')
    })
  })
})
</script>

<style scoped></style>
