import html2canvas from "html2canvas";
import JsPDF from "jspdf";
import moment from "moment";


let pWidth = 595.28
let pHeight = 841.89

const defaultOptions = {
    name: moment().format('YYYY-MM-DD'),
    scale: window.devicePixelRatio * 2,
    padding: 0,
    width: 595.28 * 2,
    allowTaint: true,
    onclone: function (dom) {
        const screen = dom.querySelector('#app')
        screen.style.width = 595.28 * 2 + 'px'
        screen.style.padding = '10px'
    }
}

export function getPdf(dom, options:any = {}) {
    options = Object.assign(defaultOptions, options)
    html2canvas(dom, options).then((canvas:any) => {
        let position = 0

        // 生成的画布元素宽高
        let canvasWidth = canvas.width / options.scale
        let canvasHeight = canvas.height / options.scale

        // 页面等比例缩放后宽高
        let pageWidth = pWidth
        let pageHeight = (pWidth / canvasWidth) * canvasHeight

        // 返回图片dataUrl,参数:图片格式和清新度0-1
        let jpeg = canvas.toDataURL('img/jpeg', 1.0)

        // 方向默认垂直, 尺寸ponits, 格式a4[595.28, 841.89]
        let doc = new JsPDF(undefined, 'pt', 'a4')

        // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度841.89
        // 当内容未超过pdf一页显示的范围，无需分页
        if (pageHeight < pHeight) {
            doc.addImage(jpeg, 'JPEG', 0, 0, pageWidth, pageHeight)
        } else {
            const canvasHeightInter = pHeight * (canvasWidth / pWidth) // *对应pageHeight一页的canvasHeight高度
            while (canvasHeight > 0) {
                doc.addImage(jpeg, 'JPEG', 0, position, pageWidth, pageHeight)
                canvasHeight -= canvasHeightInter
                position -= pHeight

                // 未避免添加空白页
                if (canvasHeight > 0) doc.addPage()
            }
        }
        doc.save(options.name + '.pdf')
    })
}

