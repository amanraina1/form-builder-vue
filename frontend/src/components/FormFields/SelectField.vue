<script setup>
import { ref } from "vue";
const props = defineProps({
  name: { type: String, required: true },
  label: { type: String, required: true },
  value: { type: [String, Number], default: "" },
  onChange: { type: Function, required: true },
  options: { type: Array, required: true },
});

const changedValue = ref(props.value);
</script>

<template>
  <div class="mb-3">
    <label
      v-if="label"
      :for="name"
      class="block font-bold text-sm/6 text-gray-900"
      >{{ label }}</label
    >

    <div
      class="rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600"
    >
      <select
        :name="name"
        :id="id"
        :value="changedValue"
        v-model="changedValue"
        class="py-1.5 pr-3 pl-1 w-full text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
      >
        <option :disabled="true">Select option</option>
        <option v-for="option in options" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
    <small class="text-gray-500" v-if="description">{{ description }}</small>
  </div>
</template>
