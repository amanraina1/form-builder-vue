<script setup>
import Navbar from "./components/Mini/Navbar.vue";
import FormsList from "./components/FormsList.vue";
import FormBuilder from "./components/Builder/FormBuilder.vue";
</script>

<template>
  <main class="app-wrapper">
    <Navbar />

    <div class="main bg-gray-100 min-h-screen">
      <!-- <FormsList /> -->
      <FormBuilder />
    </div>
  </main>
</template>

<style>
.main-wrapper {
  max-width: 1280px;
}
</style>
