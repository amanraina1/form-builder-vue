<script setup>
defineProps({
  name: { type: String, required: true },
  label: { type: String, required: true },
});
</script>

<template>
  <div class="mb-2 flex gap-2">
    <input type="checkbox" :name="name" :id="name" class="sm:text-sm/6" />

    <label :for="name" class="font-bold text-sm/6 text-gray-900">{{
      label
    }}</label>
  </div>
</template>
