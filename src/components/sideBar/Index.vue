<template>
  <div class="bar_list">
    <router-link
         class="bar_item"
         v-for="(item,i) in barList"
         :to="item.path"
         active-class="active"
         :key="i">
<!--      <template v-if="item.icon">-->
<!--        <img :src="item.activeIcon" v-if="value===i" alt="">-->
<!--        <img :src="item.icon" v-else alt="">-->
<!--      </template>-->
      <span>{{item.name}}</span>
    </router-link>
  </div>
</template>

<script setup lang="ts">
  import {defineProps, ref} from 'vue'
  defineProps({
    barList: Array
  })

</script>

<style scoped lang="less">
  .bar_list {
    width: 220px;
    max-width: 20%;
    background: #4d5f75;

    .bar_item {
      width: 100%;
      height: 56px;
      padding: 0 16px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: #BFCDB9;
      text-decoration: none;

      &.active {
        background: #243445;
        color: #F78989;
      }

      img {
        margin-right: 12px;
      }
    }
  }
</style>
