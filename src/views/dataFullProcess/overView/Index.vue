<template>
  <div class="over-view">
    <div class="title">
      <div class="left"></div>
      <div class="title-content">天擎数据中心</div>
      <div class="right"></div>
    </div>
    <div class="view-content">
      <div class="box-left">
        <div class="box-item" v-for="item in leftData" :key="item.name" :style="{marginRight: item.right, marginLeft: 'auto'}">
          <div class="value">{{}}</div>
          <div class="text">{{item.name}}</div>
        </div>
      </div>
      <div class="box-right">
        <div class="box-item" v-for="item in rightData" :key="item.name" :style="{marginLeft: item.left, marginRight: 'auto'}">
          <div class="box-bg"></div>
          <div class="text">{{item.name}}</div>
          <div class="value">{{item.rate}}</div>
        </div>
      </div>

      <div class="bottom_1">
        <div class="bottom_2"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

  import {reactive} from "vue";

  const leftData = reactive([
    {
      name: '交通站',
      all: 119,
      normal: 119,
      warn: 0,
      right: 0
    },
    {
      name: '区域站',
      all: 119,
      normal: 119,
      warn: 0,
      right: '36px'
    },
    {
      name: '无人站',
      all: 119,
      normal: 119,
      warn: 0,
      right: '82px'
    },
    {
      name: 'BUF小时数据',
      all: 119,
      normal: 119,
      warn: 0,
      right: '99px'
    },
    {
      name: '小时BUF',
      all: 119,
      normal: 119,
      warn: 0,
      right: '82px'
    },
    {
      name: '环境监测',
      all: 119,
      normal: 119,
      warn: 0,
      right: '36px'
    },
    {
      name: '雷达站',
      all: 119,
      normal: 119,
      warn: 0,
      right: 0
    }
  ])
  const rightData = reactive([
    {
      name: '公路交通气象数据',
      rate: '100%',
      left: 0
    },
    {
      name: '质控后地面自动数据',
      rate: '100%',
      left: '36px'
    },
    {
      name: '质控后地面自动数据',
      rate: '100%',
      left: '82px'
    },
    {
      name: '酸雨观测资料数据',
      rate: '100%',
      left: '99px'
    },
    {
      name: '高空探空综合数据',
      rate: '100%',
      left: '82px'
    },
    {
      name: 'GNSS/MET数据',
      rate: '100%',
      left: '36px'
    },
    {
      name: '多普勒雷达基数据',
      rate: '100%',
      left: 0
    }
  ])
</script>

<style scoped lang="less">
  .over-view {
    width: 100%;
    height: 100%;
    padding: 0 43px;
    box-sizing: border-box;
    position: relative;

    .title {
      width: 100%;
      height: 48px;
      display: flex;
      align-items: center;

      .left {
        width: 650px;
        height: 48px;
        background-image: url("./img/left-title.png");
        background-size: 100% 100%;
      }
      .title-content {
        flex: 1;
        height: 40px;
        line-height: 40px;
        margin: 0 4px;
        font-size: 18px;
        color: #FFFFFF;
        background-image: url("./img/title-content.png");
        background-size: 100% 100%;
      }
      .right {
        width: 650px;
        height: 48px;
        background-image: url("./img/right-title.png");
        background-size: 100% 100%;
      }
    }

    .view-content {
      width: 1660px;
      height: 714px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;

      .box-left {
        width: 290px;
        height: 100%;
        color: #FFFFFF;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .box-item {
          width: 170px;
          height: 40px;
          line-height: 40px;
          background-image: url("./img/box-content.png");
          background-size: 100% 100%;
          display: flex;

          .value {

          }
          .text {
            margin: 0 28px 0 auto;
            width: auto;
          }
        }
      }
      .box-right {
        width: 290px;
        height: 100%;
        margin-left: auto;
        color: #FFFFFF;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .box-item {
          width: 170px;
          height: 40px;
          line-height: 40px;
          display: flex;
          position: relative;

          .box-bg {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            background-image: url("./img/box-content.png");
            background-size: 100% 100%;
            transform: rotate(180deg);
          }

          .value {
            color: #00FFC5;
            font-size: 12px;
            transform: scale(0.83);
          }
          .text {
            margin: 0 auto 0 28px;
            width: auto;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }

      .bottom_1 {
        width: 1148px;
        height: 677px;
        position: absolute;
        left: 50%;
        bottom: -20px;
        transform: translateX(-50%);
        background-image: url("./img/bottom_1.png");
        background-size: 100% 100%;

        .bottom_2 {
          width: 677px;
          height: 399px;
          margin: -45px auto auto;
          background-image: url("./img/bottom_1.png");
          background-size: 100% 100%;
        }
      }
    }
  }
</style>
