<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import {reactive} from "vue"

// 父组件控制canvas的基本大小
const size = reactive({width: 480, height: 854})


const changeSize = ()=>{
  size.height = window.innerHeight
  size.width = window.innerWidth
  alert("test function")
}

</script>

<template>
  <div class="root">
  <!-- 这里一般要套router-views，做一个路由视图 -->
    <HelloWorld :size="size" />
    <button class="btn" @click="changeSize">don't click</button>
  </div>

</template>

<style lang="scss" scoped>
.root {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .btn {
    width: 100px;
    height: 40px;
  }
}
</style>
