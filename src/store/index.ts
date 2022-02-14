
import { defineStore } from 'pinia'

export const useTodoStore = defineStore({
    id: 'todo',
    state: () => ({
        name: 'xytao'
    }),
    getters: {
        logName(state) {
            return `名字：${state.name}`
        }
    },
    actions: {
        setName(name) {
            this.name = name
        }
    }

})
