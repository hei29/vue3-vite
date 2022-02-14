
import {reactive, ref} from 'vue'

export const num = ref<number>(0)
export const title = ref<string>('主页')
export const objHome = reactive({
    name: '白草枯',
    time: 2099,
    detail: null
})

export default {
    num,
    title,
    objHome
}
