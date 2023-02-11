import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const Home:any = () => import('@/views/pages/home/Index.vue')

const titleHome:any = import.meta.env.VITE_APP_TITLE;
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/pages'
    },
    {
        path: '/pages',
        redirect: '/pages/home',
        component: () => import('@/views/pages/Index.vue'),
        children: [
            {
                path: 'home',
                name: '主页',
                component: () => import('@/views/pages/home/Index.vue')
            },
            {
                path: 'AzurLanne',
                name: '碧蓝航线',
                component: () => import('@/views/pages/AzurLanne/Index.vue'),
                redirect: 'AzurLanne/role',
                children: [
                    {
                        path: 'role',
                        name: '图鉴',
                        component: () => import('@/views/pages/AzurLanne/role/Index.vue')
                    },
                    {
                        path: 'ikon',
                        name: '插画',
                        component: () => import('@/views/pages/AzurLanne/ikon/Index.vue')
                    }
                ]
            }
        ]
    },
    {
        path: '/login',
        name: '登录',
        component: () => import('@/views/login/Index.vue')
    },
    {
        path: '/userInfo',
        name: '个人中心',
        component: () => import('@/views/userInfo/Index.vue')
    },
    {
        path: '/userManage',
        name: '用户管理',
        component: () => import('@/views/userManage/Index.vue')
    }
]

// "history": createWebHistory()
// "hash": createWebHashHistory()
// "abstract": createMemoryHistory()
const router = createRouter({
    // history: createWebHashHistory(),
    history: createWebHistory(),
    routes
})


import {user, setToken} from '@/hooks/user'
import {userInfo} from '@/api/user'

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    if (to.name) {
        typeof to.name === "string" ? document.title = to.name : null;
    }
    if (!user.token && token) {
        userInfo().then((res) => {
            if (res.status === 200) {
                const data = {
                    ...res.data,
                    token
                }
                setToken(data)
                next()
            } else {
                localStorage.removeItem('token')
                next({name: '登录'})
            }

        })
    } else if (user.token === token || to.path==='/login') {
        next();
    } else {
        next({name: '登录'})
    }
});

export default router
