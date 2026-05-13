<script setup>
import { ref } from "vue";
const props = defineProps({
  name: { type: String, required: true },
  label: { type: String, required: true },
  value: { type: Array, default: () => [] },
  onChange: { type: Function, default: () => {} },
  description: { type: String, default: "" },
  options: { type: Array, required: true },
});

const changedValue = ref(props.value);
</script>

<template>
  <div class="mb-3">
    <div>
      <label :for="name" class="block font-bold text-sm/6 text-gray-900">{{
        label
      }}</label>
      <div class="flex gap-2">
        <div v-for="option in options" class="mr-1">
          <input
            type="checkbox"
            v-model="changedValue"
            :value="option.value"
            @change="onChange(changedValue, name)"
            :name="name"
            :id="name"
            class="sm:text-sm/6 mr-1"
          />
          <span>{{ option.label }}</span>
        </div>
      </div>
    </div>
    <small class="text-gray-500" v-if="description"
      ><i class="fas fa-circle-info"></i> {{ description }}</small
    >
  </div>
</template>
