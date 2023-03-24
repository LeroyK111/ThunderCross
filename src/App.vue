<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import {ref} from "vue"
import useStore from './pinia/useStore';


// 全局状态
const store = useStore()




// 根组件状态
const btnSwitch = ref(true)

// 按钮触发
const changeSize = ()=>{
  // 改变全局状态值
  if (btnSwitch.value) {
    store.changeSize();
  } else {    
    // 恢复初始值
    store.$reset();
  }
  btnSwitch.value = !btnSwitch.value
}




</script>

<template>
  <div class="root">
  <!-- 这里一般要套router-views，做一个路由视图 -->
    <HelloWorld/>
    <button class="btn" @click="changeSize">{{ btnSwitch? "coverPage" : "defaultPage"}}</button>
  </div>
</template>

<style lang="scss">
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
