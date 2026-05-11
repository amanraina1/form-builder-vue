<script setup>
import Navbar from "./components/Mini/Navbar.vue";
</script>

<template>
  <main class="app-wrapper">
    <Navbar />

    <div class="main bg-gray-100 min-h-screen">
      <router-view></router-view>
    </div>
  </main>
</template>

<style>
.main-wrapper {
  max-width: 1280px;
}
</style>
