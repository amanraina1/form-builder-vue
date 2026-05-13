<script setup>
import { ref } from "vue";
const props = defineProps({
  name: { type: String, required: true },
  label: { type: String, required: true },
  value: { type: [String, Number], default: "" },
  onChange: { type: Function, required: true },
  options: { type: Array, required: true },
  description: { type: String, default: "" },
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

    <div class="flex gap-2">
      <div v-for="option in options">
        <input
          type="radio"
          :name="name"
          :id="option.name"
          :value="option.value"
          v-model="changedValue"
          @change="onChange(changedValue, name)"
          class="min-w-0 mr-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
        />
        <label>{{ option.label }}</label>
      </div>
    </div>

    <small class="text-gray-500" v-if="description"
      ><i class="fas fa-circle-info"></i> {{ description }}</small
    >
  </div>
</template>
