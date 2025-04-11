<template>
  <div class="container"></div>
</template>
<script setup lang="ts">
import use_cut_img_store from '@/stores/module/CutImgStore.ts'
import { onMounted } from 'vue'

const store = use_cut_img_store()

for (let i = 0; i < imgs.length; i++) {
  console.log('imgs', imgs[i])
}
onMounted(() => {
  // const container = document.querySelector('.container')
  // container.innerHTML = `imgs${imgs}`
})
</script>

<style lang="scss">
.container {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0);
}
</style>
