import {reactive, ref} from "vue";

interface User {
    id: number,
    token: string,
    username?: string,
    user_pic?: string,
    nickname?: string,
    email?: string,
    authority: number,
    [key:string]:any
}

export const user = reactive({
    id: 0,
    token: '',
    username: '',
    user_pic: '',
    nickname: '',
    email: '',
    authority: 2
})

export const setToken = (val:User) => {
    user.id = val.id
    user.token = val.token
    user.username = typeof val.username === "string" ? val.username : ''
    user.user_pic = typeof val.user_pic === "string" ? val.user_pic : ''
    user.nickname = typeof val.nickname === "string" ? val.nickname : ''
    user.email = typeof val.email === "string" ? val.email : ''
    localStorage.setItem('token', val.token)
    user.authority = val.authority
}

