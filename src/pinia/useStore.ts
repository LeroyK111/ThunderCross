import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";

// 初始值
const defaultSize = { width: 480, height: 854 };
const ratio = 480 / 854;

// 直接组合式写法
export default defineStore("useStore", () => {
  const size = reactive({ width: 480, height: 854 });
  const score = ref(0)


  const changeSize = () => {
    size.height = window.innerHeight;
    size.width = Math.trunc(ratio * size.height);
  };
  const $reset = () => {
    Object.assign(size, defaultSize);
  };

  return { size, changeSize, $reset, defaultSize, score };
});
