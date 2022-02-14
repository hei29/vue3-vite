<template>
  <div class="not-found-page">
    <div class="tip-text">404 not found!!!</div>
  </div>
</template>

<script>
  export default {
    name: "Index"
  }
</script>

<style scoped lang="less">
  .not-found-page {
    width: 100vw;
    height: 100vh;
    position: relative;

    .tip-text {
      font-size: 30px;
      color: brown;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
