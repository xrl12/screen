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
import { open_new_window, show_alert } from '@/utils'

const btn_list = reactive<CustomButtonProps[]>([
  {
    on: {
      click: () => {
        open_new_window()
        return false
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
