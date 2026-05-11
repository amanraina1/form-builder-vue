<script setup>
import { SpringSpinner } from "epic-spinners";

defineProps({
  message: {
    type: String,
    default: "Getting this ready for ya...",
  },
});
</script>

<template>
  <div class="overlay">
    <div class="loader-card">
      <spring-spinner :animation-duration="3000" :size="60" color="#ff1d5e" />

      <p class="message">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(6px);
  z-index: 1000;
}

.loader-card {
  width: 360px;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 24px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

.message {
  text-align: center;
  color: #64748b;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.6;
  max-width: 300px;
}
</style>
