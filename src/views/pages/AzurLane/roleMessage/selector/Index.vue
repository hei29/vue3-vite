<template>
  <el-card :header="name">
    <xt-button
        v-for="(value, key, index) of list"
        :style="{
           color: painting === key ? '#F78989' : '#606266'
        }"
        :key="index"
        @click="handlePainting(key)">{{ value.name }}</xt-button>
  </el-card>
</template>

<script setup lang="ts">
  import {defineProps, defineEmits} from 'vue'
  const props = defineProps({
    name: String,
    painting: String,
    list: Object
  })
  const emit = defineEmits(['update:painting'])

  const handlePainting = (val:string) => {
    emit('update:painting', val)
  }
</script>

<style scoped lang="less">
  .el-card {
    width: 20vw;
    position: absolute;
    left: 4%;
    top: 4%;
    opacity: .6;

    :deep(.el-card__header) {
      text-align: left;
    }

    :deep(.el-card__body) {
      max-height: 30vh;
      overflow-y: auto;

      &::-webkit-scrollbar {
        display: none;
      }

      .xt-button {
        width: 100%;
        margin-bottom: 12px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
</style>
