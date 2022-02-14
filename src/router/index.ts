import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const history = createWebHistory('/toys/')
const hash = createWebHashHistory('/toys/')

const MyHome:any = () => import('@/views/home/Index.vue')
const FullProcess = () => import('@/views/dataFullProcess/Index.vue')
const Test:any = () => import('../views/test/Index.vue')
const NotFound:any = () => import('@/views/404/Index.vue')

const titleHome:any = import.meta.env.VITE_APP_TITLE;
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/my-home'
    },
    {
        path: '/my-home',
        name: '我的主页',
        alias: '/my-root', // 路由别名
        component: MyHome
    },
    {
        path: '/home',
        name: '主页',
        alias: '/root', // 路由别名
        component: FullProcess
    },
    {
        path: '/test',
        name: titleHome,
        component: Test
    },
    {
        path: '/:pathMatch(.*)*',
        name: '未找到该页面',
        component: NotFound
    }
]

// "history": createWebHistory()
// "hash": createWebHashHistory()
// "abstract": createMemoryHistory()
const router = createRouter({
    // hash,
    history,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.name) {
        typeof to.name === "string" ? document.title = to.name : null;
    }
    next();
});

export default router
