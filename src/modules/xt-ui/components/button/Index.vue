<template>
  <button
      :style="{
          cursor: cursor,
          backgroundColor: bgcList[type],
          borderRadius: radius?'4px': '0'}"
      class="xt-button"
      :class="_class">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: "XtButton",
    props: {
      radius: {
        type: Boolean,
        default: true
      },
      type: {
        type: String,
        default: 'none'
      },
      size: {
        type: String,
        default: 'normal'
      },
      cursor: {
        type: String,
        default: 'pointer'
      }
    },
    computed: {
      _class() {
        const list = []
        if(this.size!=='normal') list.push(this.size)
        if(this.type!=='none') list.push('white')
        return list
      }
    },
    data() {
      return {
        bgcList: {
          none: '#FFFFFF',
          primary: '#409EFF',
          success: '#67C23A',
          info: '#909399',
          warning: '#E6A23C',
          error: '#F56C6C'
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .xt-button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    padding: 8px 20px;
    font-size: 14px;
    color: #606266;
    border: 1px solid #dcdfe6;
    white-space: nowrap;
  }

  .small {
    height: 32px;
    font-size: 12px;
  }
  .large {
    height: 48px;
    font-size: 16px;
  }
  .white {
    color: #FFFFFF
  }
</style>
