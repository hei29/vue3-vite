<template>
  <div class="main">
    <div class="ikon">
      <div class="ikon_item" v-for="(item, i) in cgList[current-1]" :key="'i'">
        <div class="cg_card_body">
          <div class="cg_img">
            <el-image
                :src="item"
                :preview-src-list="cgList[current-1]"
                :initial-index="i"
                lazy
                fit="cover">
              <template #placeholder>
                <div class="image-slot">Loading<span class="dot">...</span></div>
              </template>
            </el-image>
          </div>
        </div>
      </div>
    </div>
    <el-pagination
        background
        :page-size="40"
        :pager-count="11"
        layout="prev, pager, next"
        v-model:current-page="current"
        :total="total" />

  </div>
</template>

<script setup lang="ts">
  import cg from '../json/cg.json'
  import {onMounted, ref} from "vue";

  onMounted(() => {
    let group:string[] = []
    cg.map(t => {
      group.push('/AzurLanne/cg/' + t.split('/').pop())
      if(group.length === 40) {
        cgList.value.push(group)
        group = []
      }
    })
  })

  const current = ref<number>(1)
  const total = ref<number>(cg.length)
  const cgList = ref<any>([])
</script>

<style scoped lang="less">
    .main {
      height: 100%;
      overflow: auto;

      .ikon {
        width: 100%;
        padding: 20px 15px;
        display: flex;
        flex-wrap: wrap;

        .ikon_item {
          width: 25%;
          padding: 10px;

          .cg_card_body {
            height: 0;
            padding-bottom: 56.25%;
            width: 100%;
            position: relative;

            &:before {
              content: '';
              position: absolute;
              left: 0;
              z-index: -1;
              width: 100%;
              height: 100%;
              transform: rotate(-4deg);
              background: darkgrey;
            }

            .cg_img {
              position: absolute;
              width: 100%;
              height: 100%;
              border: 3px solid #fff;

              :deep(.el-image) {
                width: 100%;
                height: 100%;
                //object-fit: cover;
                //vertical-align: middle;

                .image-slot {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 100%;
                  height: 100%;
                  background: var(--el-fill-color-light);
                  color: var(--el-text-color-secondary);
                  font-size: 14px;

                  .dot {
                    animation: dot 2s infinite steps(3, start);
                    overflow: hidden;
                  }
                }
              }

            }
          }
        }
      }

      :deep(.el-pagination) {
        justify-content: center;
        margin-bottom: 30px;
      }
    }
</style>
