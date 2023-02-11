<template>
  <div class="pages">
    <Header></Header>
    <div class="router-page">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/header/Index.vue'
</script>

<style scoped lang="less">
  .pages {
    height: 100%;

    .router-page {
      height: calc(100% - 3.5rem);
    }
  }
</style>
