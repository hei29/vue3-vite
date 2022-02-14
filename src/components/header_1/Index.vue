<template>
  <div class="header_1"></div>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue';

  const props = defineProps({
    bgColor: {
      type: String,
      default: 'skyblue'
    },
    bgShadow: {
      type: String,
      default: '2px 2px 52px #009dc4 inset'
    }
  })
</script>

<style scoped lang="less">
  .header_1 {
    width: 100%;
    height: 80px;
    background-color: v-bind(bgColor);
    box-shadow: v-bind(bgShadow);
  }
</style>
