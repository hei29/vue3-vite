import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import XUI from './modules/xt-ui'
import myOrder from './directives' // 自定义指令


const app = createApp(App);

// 定义全局方法
app.config.globalProperties.$back = () => {
    router.go(-1)
}

app.use(ElementPlus).use(router).use(XUI).use(myOrder).mount('#app')
