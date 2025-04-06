<template>
  <div class="container">
    <!--    <el-button @click="back">返回主页</el-button>-->
  </div>
</template>
<script setup lang="ts">
import ScreenShot from 'js-web-screen-shot'
import { onMounted } from 'vue'
import { get_capture_screen, get_config, getInitStream, set_full_screen } from '@/utils/index.ts'
import { useRouter } from 'vue-router'
import use_cut_img_store from '@/stores/module/CutImgStore.ts'
import type { DefaultConfig } from '../../../SCelectron/enum/type'
import hotkeys from 'hotkeys-js'
import { get } from 'lodash'

const router = useRouter()
const store = use_cut_img_store()
const doScreenShot = async () => {
  const sources = await get_capture_screen() // 这里返回的是设备上的所有窗口信息
  // 这里可以对`sources`数组下面id进行判断  找到当前的electron窗口  这里为了简单直接拿了第一个
  const stream = await getInitStream(sources[0])
  new ScreenShot({
    enableWebRtc: true, // 启用webrtc
    screenFlow: stream!, // 传入屏幕流数据
    level: 9999999,
    completeCallback: ({ base64 }) => {
      store.setImg(base64)
      router.push({ name: 'dashboard', params: { is_cancel: 'true' } })
    },
    cancelCallback: () => {
      router.push({ name: 'dashboard', params: { is_cancel: 'true' } })
    },
    closeCallback: () => {
      router.push({ name: 'dashboard', params: { is_cancel: 'true' } })
    },
  })
}
onMounted(() => {
  set_full_screen()
  doScreenShot()
  get_config().then((res: DefaultConfig) => {
    const hotkeyMethodMap = {
      [res.screen_capture]: () => router.push({ name: 'screen_capture' }),
      [res.next]: () => open(`/show_img/`),
    }
    hotkeys(Object.values(res).join(','), function (_, handler) {
      const hotKey = handler.key
      get(hotkeyMethodMap, hotKey, () => console.log('没有获取到热键'))()
    })
  })
})
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
}
</style>
