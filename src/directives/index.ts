
// 自定义指令
const defineDirective = (app: any) => {
    // lazy指令名称
    app.directive('lazy', {
        mounted(el: HTMLImageElement, bindings: any) {
            // el表示使用指令DOM元素
            // bindings 表示指令相关的信息，是一个对象 如v-lazy=“xxx”, bindings即是xxx对应的内容
            // 指令的功能：实现图片的懒加载
            // 1.图片是否进入可视区
            const oberver = new IntersectionObserver(([{isIntersecting}]) => {
                // true进入可视区域,false未进入可视区域
                if(isIntersecting) {
                    // 1.给图片的src属性赋值图片地址,赋值后才会开始图片的请求
                    el.src = bindings.value
                    // 取消图片的监听, 默认是会一直监听的, 如果不取消就会一直执行
                    oberver.unobserve(el)
                    // 3.加载的图片失败(显示默认的图片地址或其他操作)
                    el.onerror = () => {
                        console.log('图片加载失败')
                    }
                }
            })
            // 监听dom元素
            oberver.observe(el)
        }
    })
}

export default {
    install(Vue) {
        // 自定义指令
        defineDirective(Vue)
    }
}
