<template>
  <div class="joy-test">
    <Header_1></Header_1>
    <div>{{computedNum}}</div>
    <div>
      <button @click="num++">num++ count is:{{num}}</button>
    </div>
    <div>{{`姓名:${obj.name},性别:${obj.gender},年龄:${obj.age}`}}</div>

    <TitlePoint title-name="this is a title"></TitlePoint>
    <div id="echarts"></div>

    <div class="table-box">
      <el-table :data="tableData" width="30%">
        <el-table-column type="index" label="编号" width="80"></el-table-column>
        <el-table-column v-for="item in tableHeader"
                         :prop="item.prop"
                         :label="item.label"
                         :key="item.prop"></el-table-column>
      </el-table>
    </div>

    <MapCore></MapCore>
  </div>
</template>
<script setup lang="ts">
  import * as echarts from 'echarts';
  import moment from "moment";

  import Header_1 from '@/components/header_1/Index.vue'
  import TitlePoint from '@/views/components/title_point/Index.vue';
  import MapCore from '@/components/mapCore/Index.vue'

  import {ref, reactive, defineProps, computed, watch, onMounted} from 'vue';

  const props = defineProps({})

  // mounted挂载完成后
  onMounted(() => {
    console.log('mounted')
    drawEcharts();
  })
  /*
  * vue3中主要用reactive和ref进行响应数据的监听。他俩的区别在于：
  ①reactive中必须存放对象（json、数组等），不能存放基本数据类型
  ②ref则可以存放基本数据类型【注：ref本质还是reactive】
  * */
  // ref 用于创建一个响应式数据
  let num = ref<number>(0)
  // reactive 创建一个复杂的响应数据
  let obj = reactive({
    name: 'xytao',
    gender: '男',
    age: 22
  })
  let echartsDom:any = null;
  const tableHeader = [
    {
      prop: 'name',
      label: '名称'
    },
    {
      prop: 'time',
      label: '时间'
    }
  ]
  let tableData = reactive([
    {
      name: 'el',
      time: moment().format('YYYY-MM-DD HH')
    },
    {
      name: 'D3',
      time: '2017-9-12 12'
    }
  ])

  // 绘制echarts图形
  const drawEcharts = () => {
    echartsDom = document.querySelector('#echarts')
    const myChart = echarts.init(echartsDom);
    myChart.setOption({
      yAxis: {
        type: 'value'
      },
      xAxis: {
        type: 'category',
        data: ['mon', 'thu', 'thr', 'wen', 'fri', 'sta', 'sun']
      },
      series: {
        data: [1, 1, 1, 1, 1, 0, 0],
        type: 'line'
      }
    }, true)
  }

  // 计算属性
  const computedNum = computed<number>(() => num.value * 2)
  // watch
  watch(num, (newVal, oldVal) => {
    console.log(newVal, oldVal);
  })
</script>

<style scoped lang="less">
  .joy-test {
    width: 100vw;
    height: 100vh;

    #echarts {
      height: 200px;
      width: 500px;
    }
    .table-box {
      width: 500px;
    }
  }
</style>
