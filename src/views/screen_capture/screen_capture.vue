<template>
  <div class="container">
    <!--    <el-button @click="back">返回主页</el-button>-->
  </div>
</template>
<script setup lang="ts">
import ScreenShot from 'js-web-screen-shot-alex'
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
// 当前展示的是第几个图片的缩影
let currentShowImgPathIndex = 0
// 是否是第一次展示图片
let isFirstShowImgPath = true
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
      store.addCutImgPath(cutInfo)
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

/**
 * @desc 监听热键
 * */
const listen_hot_key = (): void => {
  get_config().then((res: DefaultConfig) => {
    const hotkeyMethodMap = {
      [res.previous]: () => {
        if (isFirstShowImgPath) {
          currentShowImgPathIndex = store.getAllCutImgPath().length - 1
          if (currentShowImgPathIndex < 0) currentShowImgPathIndex = 0
          isFirstShowImgPath = false
        }
        const area = store.getCutImgPath(currentShowImgPathIndex)

        if (area) {
          currentShowImgPathIndex -= 1
          screenShotIns?.appointCropBoxArea({
            x: area.startX,
            y: area.startY,
            w: area.width,
            h: area.height,
          })
        }
        // store.getCutImgPath(currentShowImgPathIndex)
        // screenShotIns?.appointCropBoxArea({ w: 100, h: 100, x: 100, y: 100 })
      },
      [res.next]: () => {
        if (isFirstShowImgPath) return false
        const area = store.getCutImgPath(currentShowImgPathIndex)

        if (area) {
          currentShowImgPathIndex += 1
          screenShotIns?.appointCropBoxArea({
            x: area.startX,
            y: area.startY,
            w: area.width,
            h: area.height,
          })
        }
      },
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
  hotkeys.unbind()
})
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
}
</style>
