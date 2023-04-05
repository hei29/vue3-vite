<template>
  <el-button class="backBth" type="primary" @click="back">返回</el-button>
</template>

<script>
  export default {
    name: "XtBack",
    data() {
      return {
      }
    }
  }
</script>

<style scoped>
  .backBth {
    position: absolute;
    top: 20px;
    right: 22px;
    z-index: 999;
  }
</style>
