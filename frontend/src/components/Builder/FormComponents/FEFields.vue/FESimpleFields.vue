<script setup>
import { useStore } from "vuex";
const store = useStore();

defineProps({
  fieldData: { type: Object, default: () => ({}) },
});

const addActiveField = (field) => {
  store.commit("addActiveField", field);
};
</script>

<template>
  <div
    v-if="fieldData.type === 'text'"
    @click="addActiveField(fieldData)"
    class="grid grid-cols-10 items-center input-field bg-slate-50 rounded-xl mb-4"
  >
    <label
      :for="fieldData.label"
      class="col-span-2 text-sm block text-gray-900"
      >{{ fieldData.label }}</label
    >
    <input
      :id="fieldData.name"
      :disabled="true"
      type="text"
      :name="fieldData.name"
      placeholder="Short text"
      class="col-span-8 rounded-sm grow py-1.5 pr-3 pl-1 text-base text-gray-900 outline-1 placeholder:text-gray-400 sm:text-sm/6"
    />
  </div>

  <div
    v-else-if="fieldData.type === 'textarea'"
    @click="addActiveField(fieldData)"
    class="grid grid-cols-10 items-center input-field bg-slate-50 rounded-xl mb-4"
  >
    <label
      :for="fieldData.name"
      class="col-span-2 text-sm/6 font-medium text-gray-900"
      >Multi Line</label
    >
    <input
      :id="fieldData.name"
      :disabled="true"
      type="text"
      :name="fieldData.name"
      placeholder="Short text"
      class="col-span-8 rounded-sm grow py-1.5 pr-3 pl-1 text-base text-gray-900 outline-1 placeholder:text-gray-400 sm:text-sm/6"
    />
  </div>

  <div
    v-else-if="fieldData.type === 'number'"
    @click="addActiveField(fieldData)"
    class="grid grid-cols-10 items-center input-field bg-slate-50 rounded-xl mb-4"
  >
    <label
      :for="fieldData.name"
      class="col-span-2 text-sm/6 font-medium text-gray-900"
      >Number</label
    >
    <input
      :id="fieldData.name"
      :disabled="true"
      type="text"
      :name="fieldData.name"
      placeholder="Integer"
      class="col-span-8 rounded-sm py-1.5 pr-3 pl-1 text-base text-gray-900 outline-1 placeholder:text-gray-400 sm:text-sm/6"
    />
  </div>

  <div
    v-else-if="fieldData.type === 'email'"
    @click="addActiveField(fieldData)"
    class="grid grid-cols-10 items-center input-field bg-slate-50 rounded-xl mb-4"
  >
    <label
      :for="fieldData.name"
      class="col-span-2 text-sm/6 font-medium text-gray-900"
      >Email</label
    >
    <input
      :id="fieldData.name"
      :disabled="true"
      type="text"
      :name="fieldData.name"
      placeholder="email@example.com"
      class="col-span-8 rounded-sm py-1.5 pr-3 pl-1 text-base text-gray-900 outline-1 placeholder:text-gray-400 sm:text-sm/6"
    />
  </div>

  <div
    v-else-if="fieldData.type === 'date'"
    @click="addActiveField(fieldData)"
    class="grid grid-cols-10 items-center input-field bg-slate-50 rounded-xl mb-4"
  >
    <label
      :for="fieldData.name"
      class="col-span-2 text-sm/6 font-medium text-gray-900"
      >Date</label
    >
    <input
      :id="fieldData.name"
      :disabled="true"
      type="text"
      :name="fieldData.name"
      placeholder="Date"
      class="col-span-8 rounded-sm grow py-1.5 pr-3 pl-1 text-base text-gray-900 outline-1 placeholder:text-gray-400 sm:text-sm/6"
    />
  </div>

  <div
    v-else-if="fieldData.type === 'select'"
    @click="addActiveField(fieldData)"
    class="grid grid-cols-10 items-center input-field bg-slate-50 rounded-xl mb-4"
  >
    <label
      :for="fieldData.name"
      class="col-span-2 text-sm/6 font-medium text-gray-900"
      >Select</label
    >
    <input
      :id="fieldData.name"
      :disabled="true"
      type="text"
      :name="fieldData.name"
      placeholder="Select Option"
      class="col-span-8 rounded-sm grow py-1.5 pr-3 pl-1 text-base text-gray-900 outline-1 placeholder:text-gray-400 sm:text-sm/6"
    />
  </div>

  <div
    v-else-if="fieldData.type === 'multiselect'"
    @click="addActiveField(fieldData)"
    class="grid grid-cols-10 items-center input-field bg-slate-50 rounded-xl mb-4"
  >
    <label
      :for="fieldData.name"
      class="col-span-2 text-sm/6 font-medium text-gray-900"
      >Multi Select</label
    >
    <input
      :id="fieldData.name"
      :disabled="true"
      type="text"
      :name="fieldData.name"
      placeholder="Multi Select"
      class="col-span-8 rounded-sm grow py-1.5 pr-3 pl-1 text-base text-gray-900 outline-1 placeholder:text-gray-400 sm:text-sm/6"
    />
  </div>

  <div
    v-else-if="fieldData.type === 'radio'"
    @click="addActiveField(fieldData)"
    class="grid grid-cols-10 items-center input-field bg-slate-50 rounded-xl mb-4"
  >
    <label
      :for="fieldData.name"
      class="col-span-2 text-sm/6 font-medium text-gray-900"
      >Radio</label
    >
    <div class="col-span-8">
      <input
        :id="fieldData.name"
        type="radio"
        :name="fieldData.name"
        class="py-1.5 pr-3 pl-1 sm:text-sm/6"
      />
    </div>
  </div>

  <div
    v-else-if="fieldData.type === 'checkbox'"
    @click="addActiveField(fieldData)"
    class="grid grid-cols-10 items-center input-field bg-slate-50 rounded-xl mb-4"
  >
    <label
      :for="fieldData.name"
      class="col-span-2 text-sm/6 font-medium text-gray-900"
      >Checkbox</label
    >
    <div class="col-span-8">
      <input
        :id="fieldData.name"
        type="checkbox"
        :name="fieldData.name"
        class="py-1.5 pr-3 pl-1 sm:text-sm/6"
      />
    </div>
  </div>
</template>
<style scoped>
input:disabled {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
