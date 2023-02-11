<template>
  <div class="xt-check-group">
    <xt-button
        type="primary"
        style="width: 84px"
        cursor="not-allowed">{{type}}</xt-button>
    <div class="list">
      <xt-button
          :type="value.includes(item[0])?'primary':'none'"
          v-for="(item,i) in typeList"
          @click="changeValue(item[0])"
          :key="i">{{item[1]}}</xt-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {defineProps} from 'vue'

  const props = defineProps({
    type: String,
    value: {
      type: Array,
      default: () => []
    },
    typeList: Array
  })

  const emit = defineEmits(['update:value'])

  const changeValue = (val) => {
    const arr = JSON.parse(JSON.stringify(props.value))
    if(arr.includes(val)) {
      arr.splice(arr.indexOf(val), 1)
    } else {
      arr.push(val)
    }
    emit('update:value', arr)
  }
</script>

<style scoped lang="less">
  .xt-check-group {
    display: flex;

    .list {
      margin-left: 40px;
      flex: 1;
      display: flex;
      flex-wrap: wrap;

      :deep(.xt-button) {
        margin: 0 12px 12px 0;
      }
    }
  }
</style>
