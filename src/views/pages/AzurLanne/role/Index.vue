<template>
  <div class="role">
    <div class="sizer_body">
      <div class="screen">
        <div class="sizer" @click="showSizer = !showSizer">
          <img src="~/assets/img/arrow.png" v-show="showSizer" alt="">
          <img class="flip" src="~/assets/img/arrow.png" v-show="!showSizer" alt="">
          筛选
        </div>
        <el-input v-model="shipName" clearable placeholder="名称搜索" @input="getSizerShip" />
        <el-button type="primary">查询</el-button>
      </div>
      <div class="type_choice" v-show="showSizer">
        <xt-check-group type="类型" :type-list="option.type" v-model:value="type"></xt-check-group>
        <xt-check-group type="稀有度" :type-list="option.rarity" v-model:value="rarity"></xt-check-group>
        <xt-check-group type="阵营" :type-list="option.nationality" v-model:value="nationality"></xt-check-group>
      </div>
    </div>
    <div class="body">
      <div class="body_item" v-for="(val, i) in sizerShip" :key="val.painting">
        <div class="ship">
          <img :src="'/AzurLanne/shipIcon/' + val.painting + '.png'" loading="lazy" alt="">
          <span>{{val.name}}</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
  import moment from "moment";
  import option from '../json/option.json'
  import ship from '../json/ship.json'

  import {computed, onMounted, ref, watch} from "vue";
  import {useRoute} from "vue-router";

  const route = useRoute()
  onMounted(() => {
    getAllShip(ship)
  })

  let allShip:object[]
  const sizerShip = ref<any>([])
  const getAllShip = (data) => {
    const arr:object[] = []
    for (let t in data) {
      arr.push(data[t])
    }
    allShip = arr
    sizerShip.value = arr
  }

  const shipName = ref<string>('')
  const showSizer = ref<boolean>(false)
  const type = ref<any>([]) // 舰船类型
  const rarity = ref<any>([]) // 罕贵度
  const nationality = ref<any>([]) // 阵营

  watch([type, rarity, nationality], () => {
    getSizerShip()
  })

  // 获取筛选的船
  const getSizerShip = () => {
    let shipParent:object[]
    if(shipName.value) {
      const pattern = new RegExp(decodeURIComponent(shipName.value))
      const search = allShip.filter(t => {
        return pattern.test(t.name)
      })
      shipParent = search
    } else {
      shipParent = allShip
    }
    sizerShip.value = shipParent.filter(t => {
      return (!type.value.length || type.value.includes(t.type)) &&
             (!rarity.value.length || rarity.value.includes(t.rarity)) &&
             (!nationality.value.length || nationality.value.includes(t.nationality))
    })
  }
</script>

<style scoped lang="less">
  .role {
    height: 100%;
    margin-left: 30px;
    display: flex;
    flex-direction: column;

    .sizer_body {
      box-shadow: 5px 5px 5px #33333350;

      .screen {
        display: flex;
        justify-content: center;
        margin: 20px 0;

        .sizer {
          display: flex;
          align-items: center;
          height: 40px;
          padding: 0 16px;
          border-radius: 4px 0 0 4px;
          border: 1px solid #dcdfe6;
          border-right: 0;
          cursor: pointer;

          img {
            height: 18px;
            width: 18px;
          }
        }

        :deep(.el-input) {
          height: 40px;
          width: 60%;
          max-width: 400px;
          .el-input__inner {
            height: 40px;
            border-radius: 0;
            border: 1px solid #dcdfe6;
            padding-left: 16px;
          }
        }

        :deep(.el-button) {
          border-radius: 0 4px 4px 0;
          height: 40px;
        }
      }

      .type_choice {
        margin-bottom: 8px;
      }
    }

    .body {
      //flex: 1;
      overflow: auto;
      display: flex;
      flex-wrap: wrap;

      .body_item {
        width: 12.5%;
        height: 240px;
        padding: 15px 12px;

        .ship {
          width: 100%;
          height: 100%;
          position: relative;
          box-shadow: 0 0 12px rgba(0, 0, 0, .12);

          img {
            height: 100%;
            width: 100%;
            object-fit: contain;
          }

          span {
            position: absolute;
            left: 0;
            bottom: 5%;
            width: 100%;
            background-color: rgba(0,0,0,.5);
            color: #FFFFFF;
            text-align: center;
            font-size: 16px;
            padding-bottom: 3px;
          }

        }
      }
    }
  }

</style>
