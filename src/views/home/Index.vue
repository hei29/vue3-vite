<template>
  <div class="toy-home">
    <div class="find-list">
      <el-input v-model="inputValue" @keydown.enter="findDetails"></el-input>
      <el-button type="primary" @click="findDetails">查找</el-button>
    </div>
    <div class="content-A">
      <img src="" alt="">
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';

  onMounted(() => {

  })

  const inputValue = ref<any>()
  const showA = ref<boolean>(false)

  const findDetails = () =>{
    if (inputValue.value === 404) {
      showA.value = true
    } else showA.value = false
  }
</script>

<style scoped lang="less">
  .toy-home {

    .find-list {
      display: flex;
      justify-content: center;
      margin-top: 50px;

      :deep(.el-input) {
        width: 220px;
        height: 32px;

        .el-input_inner {
          height: 32px;
          line-height: 32px;
          padding: 0 10px;
        }
      }
      :deep(.el-button) {
        min-height: 32px;
        padding: 8px 20px;
      }
    }
  }
</style>
