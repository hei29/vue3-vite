<template>
  <div class="toy-home">
    <el-row :gutter="20">
      <el-col :lg="8" :sm="12" :xs="24">
        <el-card @click="toPage('图鉴')">
          <div class="to_page">
            <h1><el-icon><Collection /></el-icon>{{$t('pages.home.role')}}</h1>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="8" :sm="12" :xs="24">
        <el-card @click="toPage('插画')">
          <div class="to_page">
            <h1><el-icon><PictureFilled /></el-icon>{{$t('pages.home.ikon')}}</h1>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="8" :sm="12" :xs="24">
        <el-card>
          <div class="net_chart">
            <NetWork :net-speed="netSpeed"></NetWork>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
<!--  <Html2Canvas></Html2Canvas>-->
</template>

<script setup lang="ts">
  // import Html2Canvas from '@/components/html2canvas/Index.vue'
  import NetWork from '@/components/network/Index.vue'
  import {onMounted, ref} from "vue";

  onMounted(() => {
    if (navigator.connection) {
      getNetwork()
      navigator.connection.addEventListener('change', () => {
        getNetwork()
      })
    }
  })

  let netMsg = ref({
    type: '',
    speed: 0,
    rtt: ''
  })
  let netSpeed = ref<number|null>()
  const getNetwork = () => {
    const { effectiveType: type, downlink: speed, rtt }:any = navigator.connection
    netMsg.value = {
      type,
      speed,
      rtt
    }
    netSpeed.value = speed
  }
</script>

<style scoped lang="less">
  .toy-home {
    height: 100%;
    padding: 20px;
    //overflow: hidden;

    :deep(.el-row) {

      .el-col {
        margin-bottom: 12px;
        position: relative;

        .el-card {
          height: 0;
          padding-bottom: 56.25%;
          cursor: pointer;

          .el-card__body {
            .to_page {
              display: flex;

              .el-icon {
                vertical-align: middle;
              }
            }

            .net_chart {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
            }
          }
        }

      }

    }

  }
</style>
