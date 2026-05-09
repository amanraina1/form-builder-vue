<script setup>
defineProps({
  placeholder: { type: String, default: "" },
  type: { type: String, default: "text" },
  name: { type: String, required: true },
  label: { type: String, required: true },
  description: { type: String, defualt: "" },
});
</script>

<template>
  <div class="mb-3">
    <label :for="name" class="block font-bold text-sm/6 text-gray-900">{{
      label
    }}</label>
    <div class="mt-1">
      <div
        class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600"
      >
        <input
          :type="type"
          :name="name"
          :id="name"
          class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          :placeholder="placeholder"
        />
      </div>
      <small class="text-gray-500" v-if="description">{{ description }}</small>
    </div>
  </div>
</template>
