
import request from '../interceptor';

// 登录
export const login = (data) => {
    return request({
        url: '/api/user/login',
        method: 'post',
        data
    })
}

// 注册
export const register = (data) => {
    return request({
        url: '/api/user/register',
        method: 'post',
        data
    })
}

// 发送邮箱验证码
export const sendMail = (data) => {
    return request({
        url: '/api/user/mail',
        method: 'post',
        data
    })
}

// 获取当前用户权限下所有用户信息
export const userManage = () => {
    return request({
        url: '/api/userMsg/userManage',
        method: 'get'
    })
}

// 获取用户信息
export const userInfo = () => {
    return request({
        url: '/api/userMsg/info',
        method: 'get'
    })
}

// 更新用户信息
export const updateUserMsg = (data) => {
    return request({
        url: '/api/userMsg/update',
        method: 'post',
        data
    })
}

// 更新用户头像
export const updateUserPic = (data) => {
    return request({
        url: '/api/userMsg/updateAvatar',
        method: 'post',
        data
    })
}

//修改密码
export const updateUserPwd = (data) => {
    return request({
        url: '/api/userMsg/updatePwd',
        method: 'post',
        data
    })
}
