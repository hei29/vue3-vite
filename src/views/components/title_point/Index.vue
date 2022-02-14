<template>
  <div class="title-point">
    <div class="point"></div>
    <div class="title-text">{{titleName}}</div>
    <div id="teleport-tem"></div>
  </div>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue';

  const props = defineProps({
    titleName: {
      type: String,
      default: ''
    }
  })
</script>

<style scoped lang="less">
  .title-point {
    display: flex;
    align-items: center;
    height: 26px;
    padding-left: 12px;

    .point {
      width: 6px;
      height: 6px;
      background-color: #42b983;
    }
    .title-text {
      margin-left: 5px;
      font-size: 18px;
    }
  }
</style>
