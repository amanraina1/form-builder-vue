<script setup>
import { ref } from "vue";

const props = defineProps({
  fieldData: { type: Object, required: true },
});
</script>
<template>
  <div class="main-div-form-builder">
    <div
      v-if="fieldData.type === 'text'"
      class="flex input-field bg-slate-50 p-4 rounded-xl mb-4"
    >
      <label :for="fieldData.label" class="text-sm block text-gray-900">{{
        fieldData.label
      }}</label>
      <input
        :id="fieldData.name"
        :disabled="true"
        type="text"
        :name="fieldData.name"
        placeholder="Short text"
        class="block ml-4 rounded-sm grow py-1.5 pr-3 pl-1 text-base text-gray-900 outline-1 placeholder:text-gray-400 sm:text-sm/6"
      />
    </div>

    <div v-else class="flex input-field bg-slate-50 p-4 rounded-xl mb-4">
      <label for="price" class="block text-sm/6 font-medium text-gray-900"
        >Multi Line</label
      >
      <input
        :id="fieldData.name"
        :disabled="true"
        type="text"
        :name="fieldData.name"
        placeholder="Short text"
        class="block ml-4 rounded-sm grow py-1.5 pr-3 pl-1 text-base text-gray-900 outline-1 placeholder:text-gray-400 sm:text-sm/6"
      />
    </div>
  </div>
</template>
