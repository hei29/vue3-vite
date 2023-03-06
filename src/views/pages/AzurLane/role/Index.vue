<template>
  <div class="role">
    <div class="sizer_body">
      <div class="search">
        <div class="sizer" @click="showSizer = !showSizer">
          <img src="~/assets/img/arrow.png" v-show="showSizer" alt="">
          <img class="flip" src="~/assets/img/arrow.png" v-show="!showSizer" alt="">
          筛选
        </div>
        <el-input v-model="shipName" clearable placeholder="名称搜索" @input="getSizerShip" />
<!--        <el-button type="primary">查询</el-button>-->
      </div>
      <div class="type_choice" v-show="showSizer">
        <xt-check-group type="类型" :type-list="option.type" v-model:value="type"></xt-check-group>
        <xt-check-group type="稀有度" :type-list="option.rarity" v-model:value="rarity"></xt-check-group>
        <xt-check-group type="阵营" :type-list="option.nationality" v-model:value="nationality"></xt-check-group>
      </div>
    </div>
    <div class="body">
      <el-row>
        <el-col v-for="(val, i) in sizerShip" :xl="3" :lg="4" :md="6" :sm="8" :xs="12" :key="val.painting">
          <div class="ship" @click="findShip(val)">
            <img :src="'/AzurLane/shipIcon/' + val.painting + '.png'" loading="lazy" alt="">
            <span>{{val.name}}</span>
          </div>
        </el-col>
      </el-row>

    </div>
  </div>

</template>

<script setup lang="ts">
  import option from '../json/option.json'
  import ship from '../json/ship.json'

  import {onMounted, ref, watch} from "vue";
  import {useRoute, useRouter} from "vue-router";

  const route = useRoute()
  const router = useRouter()
  onMounted(() => {
    getAllShip(ship)
  })

  let allShip:Object[]
  const sizerShip = ref<any>([])
  const getAllShip = (data) => {
    const arr:Object[] = []
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
    let shipParent:Object[]
    if(shipName.value) {
      const pattern = new RegExp(decodeURIComponent(shipName.value))
      const search = allShip.filter((t:any) => {
        return pattern.test(t.name)
      })
      shipParent = search
    } else {
      shipParent = allShip
    }
    sizerShip.value = shipParent.filter((t:any) => {
      return (!type.value.length || type.value.includes(t.type)) &&
             (!rarity.value.length || rarity.value.includes(t.rarity)) &&
             (!nationality.value.length || nationality.value.includes(t.nationality))
    })
  }

  // 查看详情
  interface Ship {
    name: string,
    [key: string]: any
  }
  const findShip = (val: Ship) => {
    // 使用params传参时,必须使用name进行跳转,params传递的参数会在刷新后消失,其中如果使用路由变量会保存下来
    router.push({
      name: '角色信息',
      params: {
        name: val.painting
      }
    })
  }
</script>

<style scoped lang="less">
  .role {
    height: 100%;
    margin-left: 1.5%;
    display: flex;
    flex-direction: column;

    .sizer_body {
      box-shadow: 5px 5px 5px #33333350;

      .search {
        display: flex;
        justify-content: center;
        margin: 20px 0;

        .sizer {
          white-space: nowrap;
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
        max-height: 300px;
        overflow: auto;
      }
    }

    .body {
      overflow: auto;
      display: flex;
      flex-wrap: wrap;

      :deep(.el-row) {
        width: 100%;

        .el-col {
          padding: 15px 12px;

          .ship {
            width: 100%;
            height: 0;
            padding-bottom: 132%;
            position: relative;
            box-shadow: 0 0 12px rgba(0, 0, 0, .12);

            img {
              position: absolute;
              left: 0;
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
  }

</style>
