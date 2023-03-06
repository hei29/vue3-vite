let timeOut:any = null

export const elementResize = (dom, callback:Function) => {
    const resizeObserver = new ResizeObserver((entries) => {
        entries.forEach(entry => {
            const { width, height } = entry.contentRect // 获取元素宽度和高度
            // 处理元素宽高变化的逻辑
            if(timeOut) clearTimeout(timeOut)
            timeOut = setTimeout(() => {
                callback()
            }, 100)
        });
    })
    resizeObserver.observe(dom)
}

