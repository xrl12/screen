import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '/',
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/views/dashboard/DashboardIndex.vue'),
          meta: { title: '主页' },
        },
        {
          path: 'screen_capture',
          name: 'screen_capture',
          component: () => import('@/views/screen_capture/screen_capture.vue'),
          meta: { title: '截屏' },
        },
      ],
      meta: { title: '主页' },
    },
  ],
})

export default router
