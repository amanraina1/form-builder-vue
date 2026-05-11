<script setup>
import { SpringSpinner } from "epic-spinners";
defineProps({
  message: { type: String, default: "Getting this ready for ya..." },
});
</script>
<template>
  <div class="overlay">
    <spring-spinner :animation-duration="3000" :size="60" color="#ff1d5e" />
    <p class="text-gray-400 font-bold">{{ message }}</p>
  </div>
</template>
<style scoped>
.overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  height: 100px;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  bottom: 0;
  right: 0;
  z-index: 1000;
}
</style>
