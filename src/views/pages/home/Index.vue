<template>
  <div class="toy-home">
    <div class="music_player">

    </div>
    <el-row :gutter="20">
      <el-col :lg="8" :sm="12" :xs="24">
        <el-card @click="toPage('图鉴')">
          <div class="to_page">
            <h1><el-icon><Collection /></el-icon>图鉴</h1>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="8" :sm="12" :xs="24">
        <el-card @click="toPage('插画')">
          <div class="to_page">
            <h1><el-icon><PictureFilled /></el-icon>插画</h1>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <Html2Canvas></Html2Canvas>
</template>

<script setup lang="ts">
  import Html2Canvas from '@/components/html2canvas/Index.vue'
</script>

<style scoped lang="less">
  .toy-home {
    height: 100%;
    padding: 20px;
    overflow: hidden;

    :deep(.el-row) {

      .el-col {
        margin-bottom: 12px;

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
          }
        }

      }

    }

    .music_player {

    }
  }
</style>
