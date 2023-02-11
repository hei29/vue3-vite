import { ElMessage } from 'element-plus'

export default function downloadVideo(data) {
    const downloadLink = document.createElement('a')
    downloadLink.download = data.name
    downloadLink.style.display = 'none'
    downloadLink.href = data.url
    document.body.appendChild(downloadLink)
    downloadLink.click()
    URL.revokeObjectURL(downloadLink.href) // 释放URL对象
    document.body.removeChild(downloadLink)

    // ElMessage.success('下载成功')
}
