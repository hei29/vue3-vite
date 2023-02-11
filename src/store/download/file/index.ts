import { ElMessage } from 'element-plus'

export function getDownloadData(content, name) {
    const blob = new Blob([content])
    if ('download' in document.createElement('a')) {
        // 非ie下载
        const downloadLink = document.createElement('a')
        downloadLink.download = name
        downloadLink.style.display = 'none'
        downloadLink.href = window.URL.createObjectURL(blob)
        document.body.appendChild(downloadLink)
        downloadLink.click()
        URL.revokeObjectURL(downloadLink.href) // 释放URL对象
        document.body.removeChild(downloadLink)

        ElMessage.success('下载成功')
    } else {
        // ie10+
        // navigator.MsSaveBlob(blob, name)
    }
}
