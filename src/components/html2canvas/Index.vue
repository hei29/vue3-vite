<template>
  <div class="html2canvas">
    <div class="fn-content" :class="{hide: !control}">
      <div class="get-pdf xbox" @click="getPdfFile">导出pdf</div>
      <div class="get-screenshot xbox" @click="getScreenshot">截图</div>
    </div>
    <div class="circle">
      <div class="base-circle"></div>
      <div class="on-off" @click="toggleSwitch">
        <img src="./img/screenshot.png" alt="">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps, Ref, ref} from 'vue'
import html2canvas from 'html2canvas'
import moment from "moment";
import {getPdf} from "../../store/pdf";

const props = defineProps({
  DOM: {
    type: HTMLElement,
    default: document.querySelector('#app')
  }
})

const control = ref<boolean>(false)
const toggleSwitch = () => {
  control.value = !control.value
}

// 导出pdf
const getPdfFile = () => {
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

  getPdf(document.querySelector('#app'), defaultOptions)
}

// 导出图片
const getScreenshot = () => {
  // html2canvas(props.DOM).then(canvas => {
  //   document.body.appendChild(canvas)
  // });
  const save2 = props.DOM
  html2canvas(save2, {
    allowTaint: true, ///允许跨域图片
    useCORS: true, //是否尝试使用CORS从服务器加载图像
    width: save2.offsetWidth, //为了解决安卓手机截图后出现白边的问题
    height: save2.offsetHeight //为了解决安卓手机截图后出现白边的问题
  }).then((canvas:any) => {
    let height = save2.offsetHeight + "px";
    let width = save2.offsetWidth + "px";
    canvas.style = `width:${width};height:${height};position:fixed;z-index:9999;`;
    //为canvas添加样式
    let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
    let a:any = document.createElement("a"); // 生成一个a元素
    a.download = "photo"; // 设置图片名称
    a.href = url; // 将生成的URL设置为a.href属性

    // 写法1.
    // let event = new MouseEvent("click"); // 创建一个单击事件
    // a.dispatchEvent(event) // 触发a的单击事件

    // 写法2
    a.click();
    a = null;
  })
}
</script>

<style scoped lang="less">
  .html2canvas {
    width: 25vh;
    height: 25vh;
    min-width: 180px;
    min-height: 180px;
    position: fixed;
    bottom: 0;
    right: 0;

    .circle {
      width: 28%;
      height: 28%;
      position: absolute;
      bottom: 3%;
      right: 3%;

      .base-circle {
        width: 100%;
        height: 100%;
        border-radius: 99999px;
        background-color: #FFFFFF;
      }

      .on-off {
        width: 70%;
        height: 70%;
        background-color: #33691e;
        border-radius: 9999px;
        cursor: pointer;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        img {
          width: 60%;
          height: 60%;
          margin: 20% auto;
        }
      }
    }

    .fn-content {
      width: 50vh;
      height: 50vh;
      border-radius: 9999px;
      background-color: #33691e;
      transition: .7s;
      position: absolute;
      top: 100%;
      left: 100%;
      transform: translate(-50%,-50%);

      .xbox {
        color: #FFFFFF;
        font-size: 18px;
        cursor: pointer;
        padding: 6px 16px;
        border-radius: 4px;
        border: 1px solid #FFFFFF;

        &:hover {
          background-color: #2c3e50;
        }
      }
      .get-screenshot {
        position: absolute;
        left: 38px;
        top: 50%;
        transform: translateY(-52px);
      }
      .get-pdf {
        position: absolute;
        left: 48px;
        top: 50%;
        transform: translateY(-102px);
      }
    }

    .hide {
      width: 0;
      height: 0;
      transition: .7s;
    }
  }
</style>
