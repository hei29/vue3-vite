<template>
  <div></div>
</template>

<script setup lang="ts">
  import {onMounted, reactive, ref} from 'vue'

onMounted(() => {
  getNetMsg()
  // 监听网络变化
  navigator.connection.addEventListener('change', () => {
    getNetMsg()
  })
  // 监听网络类型变化? wifi > 流量
  navigator.connection.addEventListener('onchange', (val) => {
    alert(val)
  })
})

// const connection = ref<NetworkInformation>()
let netMsg = reactive({
  type: '',
  speed: '',
  rtt: ''
})
// 获取网络信息
const getNetMsg = () => {
  // effectiveType 网络连接种类, 值可能是'slow-2g'、'2g'、'3g'或者'4g'。
  // downlink 估算的下行速度/带宽, 返回以 Mb/s(Mbps) 为单位的有效带宽
  // rtt 估算的往返时间
  // saveData 打开/请求数据保护模式
  const { effectiveType: type, downlink: speed, rtt }:any = navigator.connection
  netMsg = {
    type,
    speed,
    rtt
  }
}

</script>

<style scoped lang="less">

</style>
