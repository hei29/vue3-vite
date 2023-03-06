<template>
  <div class="pixi" ref="pixi"></div>
  <Selector
      :name="name"
      v-model:painting="painting"
      :list="paintingObj" />
</template>

<script setup lang="ts">
import Selector from './selector/Index.vue'
import ship from '../json/ship.json'
import skin from '../json/skin.json'
import {Application, Container, Texture, Rectangle, Sprite, Assets} from 'pixi.js'
import {onMounted, onUnmounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import { load } from '@/store/load'
import { elementResize } from '@/store/resize'

onMounted(async () => {
  // 创建舞台
  app = await new Application({
    autoDensity: true,
    resizeTo: document.querySelector('.pixi'),
    antialias: true
  })
  pixi.value?.appendChild(app.view)
  addBackground()
  // pixi舞台父容器大小变化后调整舞台的大小
  elementResize(pixi.value, () => {
    if(!pixi.value) return
    app.resize()
    backgroundContainer.width = app.screen.width
    backgroundContainer.height = app.screen.height
    paintingContainer?.position.set(app.screen.width / 2 - baseOffset[0] * baseScale, app.screen.height / 2 + baseOffset[1] * baseScale)
  })
})

onUnmounted(() => {
  app.destroy(true, true)
})
const route = useRoute()
const role:any = route.params.name

// 船的基本信息
const shipMsg = ship[role]

// 船的皮肤数据对象
const paintingObj = skin[role]
// 显示的皮肤
const name = ref<string>(paintingObj[role].name)
const painting = ref<string>(role)
watch(painting, (newVal, oldVal) => {
  handlePainting()
})

const pixi = ref<HTMLDivElement>()
let app:any
let paintingContainer:Container
let backgroundContainer:Container
let baseSize = [0, 0], baseOffset = [0, 0], baseScale = 1;

// 计算精灵图合集的中图块的位置
const composeSprite = (texture: Texture, mesh: string[]) => {
  let container: Container = new Container()
  let count = mesh.reduce((t, c) => t + (c[1] === 't' ? 1 : 0), 0)
  for (let i = 1; i <= count; i += 4) {
    let v0: number[] = mesh[i].split(' ').slice(1).map(e => Number(e));
    let v1: number[] = mesh[i + 2].split(' ').slice(1).map(e => Number(e));
    let vt0: number[] = mesh[i + count].split(' ').slice(1).map(e => Number(e));
    let vt1: number[] = mesh[i + count + 2].split(' ').slice(1).map(e => Number(e));
    vt0 = [Math.round(vt0[0] * texture.width), Math.round(vt0[1] * texture.height)]
    vt1 = [Math.round(vt1[0] * texture.width), Math.round(vt1[1] * texture.height)]
    let rectangle = new Rectangle(vt0[0], texture.height - vt1[1], vt1[0] - vt0[0], vt1[1] - vt0[1])
    let sprite = new Sprite(new Texture(texture.baseTexture, rectangle))
    sprite.scale.set(1, -1)
    sprite.position.set(-v0[0], v1[1])
    container.addChild(sprite)
  }
  return container
}

// 添加背景
const addBackground = () => {
  backgroundContainer?.destroy(true)
  backgroundContainer = new Container()
  const rarity = shipMsg.rarity
  Assets.add('bg', `/AzurLane/shipbackground/${rarity}.png`)
  Assets.load('bg').then(texture => {
    let sprite = new Sprite(texture)
    sprite.width = app.screen.width
    sprite.height = app.screen.height
    backgroundContainer.addChild(sprite)
    app.stage.addChild(backgroundContainer)
    handlePainting()
  })
}
// 切换皮肤
const handlePainting = () => {
  const file = painting.value
  paintingContainer?.destroy(true)
  paintingContainer = new Container()
  Assets.reset()
  Assets.add('json', `/AzurLane/painting/${file}/${file}.json`)
  Assets.load('json').then((data) => {
    const paintingJson: Object = data
    let container: Container
    baseSize = [0, 0]
    baseOffset = [0, 0]
    baseScale = 1;
    Object.keys(paintingJson).map((t, index) => {
      const { size, rawSize, pivot, position } = paintingJson[t]
      Assets.add(t, `/AzurLane/painting/${file}/${t}.png`)
      Assets.load(t).then(async (texture) => {
        const objData = await load(file, t + '-mesh.obj')
        if(paintingJson[t].raw === true) {
          container = new Container()
          let sprite = new Sprite(texture)
          sprite.position.set(0, sprite.height)
          sprite.scale.set(1, -1)
          container.addChild(sprite)
        } else {
          container = composeSprite(texture, objData.split('\r\n'))
        }
        container.scale.set(size[0] / rawSize[0], size[1] / rawSize[1])
        if (t === file) {
          baseSize = size
          baseOffset = [size[0] / 2 + position[0], size[1] / 2 + position[1]]
          baseScale = app.screen.height / paintingJson[t]['view'][1] * 0.8
        } else {
          container.position.set(baseSize[0] / 2 - size[0] * pivot[0] + position[0], baseSize[1] / 2 - size[1] * pivot[1] + position[1])
        }
        paintingContainer.addChild(container)
        // 设置container图层层级
        paintingContainer.setChildIndex(container, index)
        paintingContainer.scale.set(baseScale, -baseScale)
        paintingContainer.position.set(app.screen.width / 2 - baseOffset[0] * baseScale, app.screen.height / 2 + baseOffset[1] * baseScale)
        app.stage.addChild(paintingContainer)
      })
    })

  })
}

</script>

<style scoped lang="less">
  .pixi {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    z-index: -1;

    :deep(canvas) {
      height: 100vh;
      width: 100%;
    }
  }
</style>
