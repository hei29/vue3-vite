import XtButton from './components/button/Index.vue'
import XtBack from './components/back/Index.vue'
import XtCheckGroup from './components/typeCheckGroup/Index.vue'

const components:any = {
    XtButton,
    XtBack,
    XtCheckGroup
}

const xUI = {
    install(Vue) {
        for (let name in components) {
            Vue.component(name, components[name])
        }
    }
}

export default xUI
