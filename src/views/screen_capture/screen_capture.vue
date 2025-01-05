<template>
  <div></div>
</template>

<script setup lang="ts">
import ScreenShot from 'js-web-screen-shot'
import { onMounted } from 'vue'
import { get_capture_screen } from '@/utils/index.ts'

const doScreenShot = async () => {
  // 下面这两块自己考虑
  const sources = await get_capture_screen() // 这里返回的是设备上的所有窗口信息
  // 这里可以对`sources`数组下面id进行判断  找到当前的electron窗口  这里为了简单直接拿了第一个
  console.log(sources)
  throw new Error('hello world')
  const stream = await getInitStream(
    sources.filter((e) => e.name == 'electron js-web-screen-shot demo')[0],
  )

  new ScreenShot({
    enableWebRtc: true, // 启用webrtc
    screenFlow: stream!, // 传入屏幕流数据
    level: 999,
  })
}

onMounted(() => {
  doScreenShot()
})
</script>

<style scoped lang="scss"></style>
