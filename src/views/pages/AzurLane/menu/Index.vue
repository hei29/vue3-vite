<template>
  <el-menu
      :default-active="activePath"
      :collapse="hide"
      text-color="#BFCDB9"
      active-text-color="#F78989"
      background-color="#4d5f75"
      mode="vertical" router>
    <el-menu-item index="/pages/AzurLane/role">
      <el-icon><Management /></el-icon>
      <span>{{$t('pages.AzurLane.role')}}</span>
    </el-menu-item>
    <el-menu-item index="/pages/AzurLane/ikon">
      <el-icon><PictureFilled /></el-icon>
      <span>{{$t('pages.AzurLane.ikon')}}</span>
    </el-menu-item>
    <el-menu-item index="" @click="hide=!hide">
      <el-icon>
        <Expand v-if="hide" />
        <Fold v-else />
      </el-icon>
      <span>{{$t('pages.AzurLane.fold')}}</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">

import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";

const route = useRoute()
onMounted(() => {
  activePath.value = getActive()
})

const hide = ref<boolean>(false)

//
const activePath = ref<string>()
const getActive = ():string => {
  let activeList: string[]
  const routeList = route.path.split('/')
  if(routeList.length > 4) {
    activeList = routeList.splice(0, 4)
  } else {
    activeList = routeList
  }
  return activeList.join('/')
}

</script>

<style scoped lang="less">
  .el-menu {
    height: 100%;
    width: 15%;
    border: none;

    &.el-menu--collapse {
      width: 64px;
    }

    .el-menu-item.is-active {
      background: #243445;
    }
  }
</style>
