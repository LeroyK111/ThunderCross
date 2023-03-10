<script setup lang="ts">
import { ref } from 'vue'
import useStore from "../pinia/useStore"


const store = useStore()







</script>

<template>
  <h1>{{ store.count }}</h1>
  <h2>{{ store.double }}</h2>
  <button @click="()=>{store.add()}">click</button>
</template>

<style scoped>

</style>
