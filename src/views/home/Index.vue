<template>
  <div class="toy-home">
    <div>{{objHome.time}}</div>
    <div>{{title}}</div>
    <button @click="changeTitle">change</button>
    <Test></Test>
  </div>
</template>

<script setup lang="ts">

  import Test from './test.vue'
  import { num, title, objHome } from '../../hooks/useHome'
  import { useTodoStore } from '../../store/index'

  import { onMounted } from 'vue';


  let store = useTodoStore()
  const changeTitle = () => {
    title.value = 'change'
    num.value++
    store.setName('lito')
    console.log(store.name)
  }

  // // 实例部分进行类型检查
  // interface DemoConstructor {
  //   gender: string|undefined;
  //   fn(num: number): void
  // }
  // // 静态部分检查
  // interface publicClass {
  //   new (x:string, y:string): void
  // }
  //
  // // 当一个类实现一个接口时，只对其实例部分进行类型检查
  // class Demo implements DemoConstructor {
  //   gender:string|undefined
  //   // name:string|undefined
  //   constructor(public name: string, gender: string) {
  //     this.gender = gender // this.gender 指上上面的gender
  //     // this.name = name
  //   }
  //   fn(num:number) {
  //     console.log(num)
  //   }
  // }
  // class DemoChild extends Demo{
  //
  // }
  // const userConstructor = (constructor: publicClass) => {
  //   const _name = 'xytao'
  //   const _gender = '男'
  //   return new constructor(_name, _gender)
  // }

  class Parent {
    x:string =  'x'
    private t:string = 'private'
    constructor(public y:string) {
    }
    get _t() { // 获取私有属性
      return this.t
    }
    set _t(newVal:string) { // 修改私有属性
      this.t = newVal
    }
    fn(c:number = 0) {
      console.log(`从${c}开始`)
    }
  }
  class Child extends Parent {
    child:string = 'child'
    constructor(public y:string) {
      super(y);
      this.child = 'c'
    }
    fn(e:number = 0) {
      console.log(`从${e}结束`)
      console.log(super._t) // 获取基类私有属性，受保护属性protected可以直接在派生类获取
      super.fn(e) // 可以通过super.fn 使用基类或该类的其他方法
    }
  }

  onMounted(() => {
    // const _demo = new DemoChild('xytao', '男')
    // const _demos = userConstructor(DemoChild)
    // console.log(_demo, _demos)

    const _child = new Child('y')
    _child.fn(2)
    _child._t = 'at'
    console.log(_child)
  })
</script>

<style scoped lang="less">
  .toy-home {
    width: 100vw;
  }
</style>
