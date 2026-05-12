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

    <div v-for="option in options" class="flex">
      <input
        type="radio"
        :name="name"
        :id="option.name"
        :value="option.value"
        v-model="changedValue"
        @input="onChange(changedValue, name)"
        class="min-w-0 mr-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
        :placeholder="placeholder"
      />
      <label>{{ option.label }}</label>
    </div>

    <!-- <small class="text-gray-500" v-if="description">{{ description }}</small> -->
  </div>
</template>
