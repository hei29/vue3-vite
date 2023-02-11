<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
const fn = () => {

}
</script>

<style lang="less">
  @import "./assets/fontStyle/font.css";
  @import "./global.less";

  body {
    margin: 0;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100vh;
    box-sizing: border-box;
  }
</style>
