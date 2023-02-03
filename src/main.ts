// vue的配置
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// elementUI的配置
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 路由的配置
import router from './router/index'
// pinia
import {createPinia} from 'pinia'
// element图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const pinia = createPinia()

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(pinia)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
