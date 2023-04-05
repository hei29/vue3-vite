import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import XUI from './modules/xt-ui'
import myOrder from './directives' // 自定义指令

import { i18n } from '@/lang'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App);
// 全局注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 定义全局方法
app.config.globalProperties.back = () => {
    router.go(-1)
}
app.config.globalProperties.toPage = (name) => {
    router.push({name})
}

app.use(ElementPlus).use(router).use(XUI).use(i18n).use(myOrder).mount('#app')
