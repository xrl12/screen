<template>
  <div class="container">
    <img :src="img_url" alt="" />
  </div>
</template>
<script setup lang="ts">
// import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'

// /**
//  * @desc 将base64转换为图片
//  * @param {string} base64
//  * */
// const convertBase2Img = (base64: string) => {
//   const img = new Image()
//   img.src = base64
//   return img
// }

const img_url = ref<string | undefined>(void 0)
// const route = useRoute()
onMounted(() => {
  // 获取当前URL的查询参数部分
  const queryString = window.location.search
  // 使用 URLSearchParams 解析查询参数
  const params = new URLSearchParams(queryString)
  img_url.value = params.get('img_url') as string
})
</script>

<style lang="scss">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & img {
    width: 100%;
    height: auto; /* 保持宽高比 */
    max-width: 100%; /* 限制图片最大宽度 */
    max-height: 100%; /* 限制图片最大高度 */
    object-fit: contain; /* 确保图片完整显示 */
  }
}
</style>
