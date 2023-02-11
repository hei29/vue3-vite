<template>
  <div class="AzurLanne">
    <SideBar :bar-list="barList"></SideBar>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
  import SideBar from '@/components/sideBar/Index.vue'
  // import {useRouter} from 'vue-router'
  // const router = useRouter()

  interface allObj {
    [key: string]:any
  }

  const barList:object[] = [
    {
      name: '图鉴',
      path: 'role'
    },
    {
      name: '插画',
      path: 'ikon'
    }
  ]
</script>

<style scoped lang="less">
  .AzurLanne {
    height: 100%;
    display: flex;
    overflow: hidden;
    //transform: skew(-8deg);

    .content {
      //margin-left: 30px;
      flex: 1;
      //overflow: auto;
    }

  }

</style>
