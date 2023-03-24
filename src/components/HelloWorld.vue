<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, reactive, watch  } from 'vue'
import useStore from "../pinia/useStore"
import * as Phaser from "phaser"
// 将各个核心功能以hooks的形式拆解
import {useCreate} from "../hooks/useCreate"
import {usePreload} from "../hooks/usePreload"
import { usePlane } from '../hooks/usePlane'

// 全局状态
const store = useStore()

// 获取dom和传参
const canvasDom: any = ref(null)

// 调用hooks
const Preload = usePreload()
const Create = useCreate()
const Plane = usePlane()

// 申明
let config: Phaser.Types.Core.GameConfig;
let game: Phaser.Game | any;




onMounted(() => {
  config = {
          // 选择渲染模式
          type: Phaser.AUTO,
          // canvas尺寸，动态调整
          scale: {
            mode: Phaser.Scale.RESIZE,
            width: "100%",
            height: "100%",
          },
          // 物理配置，碰撞和动作相关
          physics: {
              // 这里选择街机模式
              default: 'arcade',
              // 街机模式详细设置
              arcade: {
                // 加速度
                gravity: { y: 0, x: 0 },
                debug: false
              },
          },
          // 父节点
          parent: canvasDom.value,
          // 场景
          scene: {
              // 资源加载
              preload: Preload.preload,
              // 游戏对象
              create: Create.create,
              // 数据变化监听器
              update: Plane.plane,
          }
    };
    // 构造器, 绝对核心
    game = new Phaser.Game(config);
})

// 监听变换
watch(store.size, ()=>{
  game.scale.resize(store.size.width, store.size.height)
  game.scene.scenes[0].bg.setScale(store.size.height/ store.defaultSize.height);
  
  game.scene.scenes[0].player.setCollideWorldBounds(false)
  game.scene.scenes[0].enemyPlanes.children.iterate((children:any)=>{
    children.setCollideWorldBounds(false)
  })
})


onBeforeUnmount(()=>{
  // 注销canvas
  game.destroy(true);
})





</script>

<template>
  <div id="cs" :style="{width: store.size.width + 'px', height: store.size.height + 'px' }" ref="canvasDom"></div>
</template>

<style scoped lang="scss"></style>
