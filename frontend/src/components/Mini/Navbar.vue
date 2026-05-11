<script setup>
import { useRoute } from "vue-router";
const route = useRoute();

const isActive = (currentUrl) => {
  return route.path.includes(currentUrl);
};
</script>

<template>
  <nav class="flex bg-slate-10 p-2 gap-10">
    <h1 class="text-xl font-bold p-2">Form Builder</h1>

    <ul class="flex gap-6">
      <router-link to="/builder">
        <li
          class="p-2 hover:underline cursor-pointer"
          :class="{ 'bg-blue-100 rounded-lg': isActive('builder') }"
        >
          Builder
        </li>
      </router-link>
      <router-link to="/renderer">
        <li
          class="p-2 hover:underline cursor-pointer"
          :class="{ 'bg-blue-100 rounded-lg': isActive('renderer') }"
        >
          Renderer
        </li>
      </router-link>
    </ul>
  </nav>
</template>
