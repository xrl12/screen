<template>
  <div class="container">
    <!--    <el-button @click="back">返回主页</el-button>-->
  </div>
</template>
<script setup lang="ts">
import ScreenShot from 'js-web-screen-shot'
import { onMounted, onUnmounted } from 'vue'
import { get_capture_screen, get_config, getInitStream, set_full_screen } from '@/utils/index.ts'
import { useRouter } from 'vue-router'
import use_cut_img_store from '@/stores/module/CutImgStore.ts'
import fixed from '@/assets/icon/fixed.png'
import fixedAct from '@/assets/icon/fixed-act.png'
import hotkeys from 'hotkeys-js'
import { get } from 'lodash'
import type { DefaultConfig } from '../../../SCelectron/enum/type'

const router = useRouter()
const store = use_cut_img_store()
let screenShotIns: ScreenShot | null = null
const doScreenShot = async () => {
  const sources = await get_capture_screen() // 这里返回的是设备上的所有窗口信息
  // 这里可以对`sources`数组下面id进行判断  找到当前的electron窗口  这里为了简单直接拿了第一个
  const stream = await getInitStream(sources[0])
  screenShotIns = new ScreenShot({
    enableWebRtc: true, // 启用webrtc
    screenFlow: stream!, // 传入屏幕流数据
    level: 9999999,
    completeCallback: ({ cutInfo }) => {
      store.setCutImgPath(cutInfo)
      router.push({ name: 'dashboard', params: { is_cancel: 'true' } })
    },
    cancelCallback: () => {
      router.push({ name: 'dashboard', params: { is_cancel: 'true' } })
    },
    closeCallback: () => {
      router.push({ name: 'dashboard', params: { is_cancel: 'true' } })
    },
    userToolbar: [
      {
        title: 'star',
        icon: fixed,
        activeIcon: fixedAct,
        clickFn: () => {},
      },
    ],
  })
}
// /**
//  * @desc 手动指定区域截图
//  * */
// const appoint_screen_area = (x: number, y: number, width: number, height: number): void => {}

/**
 * @desc 监听热键
 * */
const listen_hot_key = (): void => {
  get_config().then((res: DefaultConfig) => {
    const hotkeyMethodMap = {
      [res.next]: () => {
        const area = store.getCutImgPath(0)
        const canvas = screenShotIns?.getCanvasController()
        // screenShotIns.setCutArea(area.x, area.y, area.width, area.height)
        // console.log('canvas', canvas)

        // screenShotIns?.completeScreenshot()
      },
      [res.previous]: () => {},
    }
    hotkeys(Object.values(res).join(','), function (_, handler) {
      const hotKey = handler.key
      get(hotkeyMethodMap, hotKey, () => {})()
    })
  })
}
onMounted(() => {
  set_full_screen()
  doScreenShot()
  listen_hot_key()
})

onUnmounted(() => {
  screenShotIns = null
  console.log('hello world')
  hotkeys.unbind()
})
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
}
</style>
