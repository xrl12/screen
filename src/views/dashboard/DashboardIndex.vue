<template>
  <el-card>
    <el-button v-for="btn in btn_list" :key="btn.key" v-bind="btn.attrs" v-on="btn.on">
      {{ btn.text }}
    </el-button>
  </el-card>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { v4 as uuidV4 } from 'uuid'
import type { CustomButtonProps } from '@/views/dashboard/type/DashboardIndexType.ts'
import { getInitStream, show_alert } from '@/utils'
import ScreenShot from 'js-web-screen-shot'

const getDesktopCapturerSource = async () => {
  return await window.electron['ev:send-desktop-capturer_source'](
    'ev:send-desktop-capturer_source',
    [],
  )
}

const btn_list = reactive<CustomButtonProps[]>([
  {
    on: {
      click: async () => {
        const sources = await getDesktopCapturerSource() // 这里返回的是设备上的所有窗口信息
        // 这里可以对`sources`数组下面id进行判断  找到当前的electron窗口  这里为了简单直接拿了第一个
        console.log(sources)
        const stream = await getInitStream(sources[0])

        new ScreenShot({
          enableWebRtc: true, // 启用webrtc
          screenFlow: stream!, // 传入屏幕流数据
          level: 999,
        })
        // open_new_window()
      },
    },
    attrs: {
      type: 'primary',
      size: 'small',
    },
    key: uuidV4(),
    text: '截屏',
  },
  {
    text: '录屏',
    key: uuidV4(),
    attrs: {
      type: 'primary',
      size: 'small',
    },
    on: {
      click: () => {
        show_alert({
          message: '该功能还在快马加鞭开发中,请您耐心等一下',
          type: 'warning',
        })
        return false
      },
    },
  },
])
</script>

<style scoped></style>
