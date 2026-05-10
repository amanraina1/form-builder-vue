<script setup>
import { ref } from "vue";
const props = defineProps({
  name: { type: String, required: true },
  label: { type: String, required: true },
  value: { type: Boolean, default: false },
  onChange: { type: Function, default: () => {} },
});

const changedValue = ref(props.value);
</script>

<template>
  <div class="flex gap-2">
    <input
      type="checkbox"
      :checked="changedValue"
      @input="onChange(changedValue, name)"
      :name="name"
      :id="name"
      class="sm:text-sm/6"
    />

    <label :for="name" class="font-bold text-sm/6 text-gray-900">{{
      label
    }}</label>
  </div>
</template>
