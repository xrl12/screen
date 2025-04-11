import './assets/base.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from '@/stores'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component)
// }
app.use(pinia)
app.use(router)
app.use(ElementPlus)

app.mount('#app')
