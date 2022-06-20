import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const history = createWebHistory('/toys/')
const hash = createWebHashHistory('/toys/')

const Home:any = () => import('@/views/home/Index.vue')

const titleHome:any = import.meta.env.VITE_APP_TITLE;
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: '我的主页',
        alias: '/my-root', // 路由别名
        component: Home
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
