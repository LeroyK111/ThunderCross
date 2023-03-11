<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, reactive, watch  } from 'vue'
import useStore from "../pinia/useStore"
import * as Phaser from "phaser"
// 将各个核心功能以hooks的形式拆解
import {useCreate} from "../hooks/useCreate"
import {usePreload} from "../hooks/usePreload"


// 全局状态
const store = useStore()

// 获取dom和传参
const canvasDom: any = ref(null)
const props = defineProps(["size"])

// 调用hooks
const Preload = usePreload()
const Create = useCreate()


// 申明
let config: Phaser.Types.Core.GameConfig;
let game: Phaser.Game;


onMounted(() => {
  config = {
          // 选择渲染模式
          type: Phaser.AUTO,
          // canvas尺寸
          width: props.size.width,
          height: props.size.height,
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
              update: Create.update
          }
    };
    // 构造器, 绝对核心
    game = new Phaser.Game(config);
})



function closeCanvas() {
  // 注销canvas
  game.destroy(true);
}



// 监听父组件传参
watch(()=>props.size, ()=>{
  closeCanvas()
  config = {...config, ...props.size}
  game = new Phaser.Game(config);
}, {deep: true})



onBeforeUnmount(()=>{
  closeCanvas()
})

</script>

<template>
  <div id="cs" class="cs" ref="canvasDom"></div>
</template>

<style scoped lang="scss">
.cs {
  display: flex;
  position: relative;
}
</style>
