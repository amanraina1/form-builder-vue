<script setup>
import { computed, ref, watch } from "vue";
import Menu from "./FormComponents/Menu.vue";
import Sections from "./FormComponents/Sections.vue";
import TextField from "../FormFields/TextField.vue";
import FieldSettings from "./FormComponents/FieldSettings/FieldSettings.vue";
import Checkbox from "../FormFields/Checkbox.vue";
import { useStore } from "vuex";
const store = useStore();

const fieldsList = ref([]);

const activeField = computed(() => store.getters.getActiveField);

// watch(fieldsList.value, (nv) => {
//   console.log(nv);
// });

// watch(activeField, (nv) => {
//   console.log(nv);
// });
</script>

<template>
  <div class="main-wrapper mx-auto py-4 basic-details">
    <header class="flex justify-between items-center">
      <h1 class="font-bold text-2xl">New Form</h1>
      <div class="flex items-center gap-4">
        <Checkbox label="Active" />
        <button
          class="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-5 rounded-xl cursor-pointer"
        >
          Save form
        </button>
      </div>
    </header>

    <div class="bg-white p-4 my-2 rounded-xl">
      <TextField name="formName" label="Form name" />

      <TextField
        type="textarea"
        name="description"
        label="Description (Optional)"
      />
    </div>

    <div class="grid grid-cols-10 gap-10">
      <Menu class="col-span-2" />

      <div class="min-h-100 col-span-5 px-4 bg-slate-50">
        <header class="mb-3 border-bottom border-b">
          <p class="font-bold px-4 py-2">Field Data</p>
        </header>
        <div
          v-if="fieldsList.length === 0"
          class="flex flex-col items-center border border-dashed rounded-lg opacity-50 px-2 py-2"
        >
          <img src="../../assets/drag.png" class="w-15 h-15" />
          <p>
            Drag an element from the left and drop it below. Drag rows to
            reorder
          </p>
        </div>
        <Sections :fieldsList="fieldsList" />
      </div>

      <FieldSettings :activeField="activeField" class="col-span-3" />
    </div>
  </div>
</template>
