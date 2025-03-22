<template>
  <el-card>
    <el-button v-for="btn in btn_list" :key="btn.key" v-bind="btn.attrs" v-on="btn.on">
      {{ btn.text }}
    </el-button>
  </el-card>
</template>
<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { v4 as uuidV4 } from 'uuid'
import type { CustomButtonProps } from '@/views/dashboard/type/DashboardIndexType.ts'
import { show_alert } from '@/utils'
import { useRouter, useRoute } from 'vue-router'
import { cancel_full_screen } from '@/utils'

const router = useRouter()
const route = useRoute()

const btn_list = reactive<CustomButtonProps[]>([
  {
    on: {
      click: () => {
        router.push({ name: 'screen_capture' })
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
onMounted(() => {
  if (route.params?.is_cancel) {
    cancel_full_screen()
  }
})
</script>

<style scoped></style>
