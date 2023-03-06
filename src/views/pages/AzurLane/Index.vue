<template>
  <div class="AzurLane">
    <Menu></Menu>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Menu from './menu/Index.vue'
</script>

<style scoped lang="less">
  .AzurLane {
    height: 100%;
    display: flex;
    //transform: skew(-8deg);

    .content {
      flex: 1;
      overflow: hidden;
      position: relative;
    }

  }

</style>
