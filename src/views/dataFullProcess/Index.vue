<template>
  <div class="data-full-process">
    <div class="header_hn">
      <div class="title"></div>
      <div class="page-boxes">
        <div class="page-list">
          <div class="page-item"
               v-for="(item, index) in pageList"
               :class="{active: pageIndex === index}"
               @click="pageIndex = index"
               :key="item.label">{{item.label}}</div>
        </div>
        <div class="page-bottom"></div>
      </div>
      <div class="date-content">
        <div class="date-msg">
          <div class="date">{{timeMsg.date}}</div>
          <div class="week">{{timeMsg.week}}</div>
          <div class="time">{{timeMsg.time}}</div>
          <div class="user">
            <div class="user-name">用户名</div>
            <div class="return"></div>
          </div>
        </div>
        <div class="date-bottom"></div>
      </div>
    </div>
    <div class="body_hn">
      <OverView></OverView>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {onMounted, reactive, ref} from "vue";
  import moment from "moment";

  import OverView from './overView/Index.vue'

  onMounted(() => {
    setInterval(() => {
      timeMsg.date = moment().format('YYYY-MM-DD')
      timeMsg.week = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][moment().day()]
      timeMsg.time = moment().format('HH:mm:ss')
    }, 1000)
  })

  const pageIndex = ref<number>(0)
  const pageList = reactive([
    {
      label: '详情总览'
    },
    {
      label: '上行数据'
    },
    {
      label: '下行数据'
    },
    {
      label: '特色资料'
    },
    {
      label: '高分卫星'
    },
    {
      label: '行业资料'
    }
  ])

  const timeMsg = reactive({
    date: moment().format('YYYY-MM-DD'),
    week: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][moment().day()],
    time: moment().format('HH:mm:ss')
  })
</script>

<style scoped lang="less">
  .data-full-process {
    width: 100vw;
    height: 100vh;
    background: url("./img/bg.png") no-repeat;
    background-size: 100% 100%;

    .header_hn {
      width: 100%;
      height: 98px;
      overflow: hidden;
      position: relative;
      display: flex;

      .title {
        height: 84px;
        width: 418px;
        margin: 14px 68px 0 36px;
        background: url("./img/header_title.png") no-repeat;
        background-size: auto 100%;
      }

      .page-boxes {
        margin-top: 38px;
        height: 38px;

        .page-list {
          width: 100%;
          display: flex;
          .page-item {
            height: 100%;
            line-height: 38px;
            font-size: 20px;
            color: #FFFFFF;
            width: 126px;
            cursor: pointer;
          }
          .active {
            background: url("./img/page_box_active.png") no-repeat;
            background-size: 100% 100%;
          }
        }
        .page-bottom {
          height: 4px;
          background-image: url("./img/page-bottom.png");
          background-size: 100% 100%;
        }
      }

      .date-content {
        width: 412px;
        margin: 43px 35px 0 auto;
        color: #FFFFFF;

        .date-msg {
          height: 28px;
          line-height: 28px;
          font-size: 28px;
          display: flex;
          justify-content: space-between;

          .date,.time {
            font-family: Digital-7;
          }
          .week {
            font-size: 22px;
          }
          .user {
            font-size: 14px;
            font-family: "PingFang SC";
            display: flex;
            align-items: center;

            .return {
              width: 14px;
              height: 14px;
              margin-left: 11px;
              background-image: url("./img/return.png");
              background-size: 100% 100%;
              cursor: pointer;
            }

          }
        }
        .date-bottom {
          height: 6px;
          background-image: url("./img/date-bottom.png");
          background-size: 100% 100%;
        }
      }
    }

    .body_hn {
      height: calc(100vh - 98px);
      width: 100%;
    }
  }
</style>
