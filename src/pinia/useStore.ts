import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";

// 直接组合式写法
export default defineStore("useStore", () => {
  const count = ref(0);

  const double = computed(() => count.value * 2);

  const add = () => {
    count.value++;
  };

  return { count, double, add };
});
