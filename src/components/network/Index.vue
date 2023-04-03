<template>
    <div class="echarts_dom"></div>
</template>

<script setup lang="ts">
  import {onMounted, onUnmounted, ref, watch} from "vue";
  import {ECharts} from "echarts";
  import * as echarts from 'echarts'
  import { elementResize } from '@/store/resize'

  onMounted(() => {
    echartsDom.value = document.querySelector('.echarts_dom') as HTMLElement
    drawEcharts(props.netSpeed)
    elementResize(echartsDom.value, () => {
      echartsObj.value && echartsObj.value?.resize()
    })
  })
  const props = defineProps({
    netSpeed: Number
  })
  watch(() => props.netSpeed, (val:any) => {
    echartsObj.value && echartsObj.value?.setOption({
      series: {
        data: [{
          name: 'mbps',
          value: val
        }]
      }
    })
  }, {
    deep: true
  })
  onUnmounted(() => {
    echartsObj.value && echartsObj.value.dispose()
  })

  const echartsDom = ref<any>()
  const echartsObj = ref<ECharts>()
  const drawEcharts = (speed) => {
    echartsObj.value = echarts.init(echartsDom.value)
    echartsObj.value?.setOption({
        series: {
          type: 'gauge',
          name: '网速仪表盘',
          // 仪表盘起始角度。圆心 正右手侧为0度，正上方为90度，正左手侧为180度
          startAngle: 180,
          endAngle: 0,
          clockwise: true, //仪表盘刻度是否是顺时针增长。
          radius: '100%',
          center: ['50%', '75%'],
          data: [
            {
              name: 'mbps',
              value: speed
            }
          ],
          min: 0,
          max: 40,
          axisLine: {
            // roundCap: true,
            lineStyle: {
              width: 12,
              color: [
                [0.15, '#FF6E76'],
                [0.4, '#58D9F9'],
                [1, '#7CFFB2']
              ]
            }
          },
          pointer: {
            // icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
            length: '12%',
            width: 4,
            offsetCenter: [0, '-70%'],
            itemStyle: {
              color: 'inherit'
            }
          },
          axisLabel:{
            color: '#464646',
            fontSize: 15,
            distance: 5,
            // rotate: 'tangential',
            // formatter: (val) => {
            //   if(val === 3) {
            //     return 'slow'
            //   } else if(val === 11) {
            //     return 'normal'
            //   } else if(val === 28) {
            //     return 'fast'
            //   }
            //   return ''
            // }
          },
          splitNumber: 4,
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          detail: {
            fontSize: 30,
            offsetCenter: [0, '-35%'],
            valueAnimation: true,
            color: 'inherit'
          },
          title: {
            offsetCenter: [0, '-10%'],
            fontSize: 20
          },
        }
    })
  }
</script>

<style scoped lang="less">
  .echarts_dom {
    width: 100%;
    height: 100%;
    max-height: 400px;
  }
</style>
