<script setup>
import { ref } from "vue";
import Checkbox from "../../../FormFields/Checkbox.vue";
import TextField from "../../../FormFields/TextField.vue";

defineProps({
  fieldType: { type: String, default: "text" },
});

const options = ref([
  { id: Math.random(), label: "Option 1", value: "option_1" },
  { id: Math.random(), label: "Option 2", value: "option_2" },
]);

const addOption = () => {
  const option = {
    id: Math.random(),
    label: `Option ${options.value.length + 1}`,
    value: `option_${options.value.length + 1}`,
  };
  options.value.push(option);
};

const removeOption = (id) => {
  options.value = options.value.filter((option) => option.id !== id);
};
</script>

<template>
  <div>
    <TextField name="Label" label="Label" placeholder="Enter Label" />

    <TextField
      name="Field name"
      label="Field name (key)"
      placeholder="e.g. first_name"
      description="Used as the data key. Letters, numbers and underscores only"
    />

    <TextField
      name="placeholder"
      label="Placeholder"
      placeholder="Placeholder"
    />

    <TextField
      name="help_text"
      label="Help text"
      placeholder="e.g. Enter Name"
    />

    <Checkbox label="Required field" />

    <template v-if="['text', 'textarea', 'number'].includes(fieldType)">
      <TextField
        name="validation"
        label="Validation"
        type="number"
        placeholder="Min length"
      />
      <TextField name="validation" type="number" placeholder="Max length" />
    </template>

    <template
      v-if="['radio', 'select', 'multiselect', 'checkbox'].includes(fieldType)"
    >
      <label for="options" class="block font-bold text-sm/6 text-gray-900"
        >Options</label
      >

      <div
        v-for="option in options"
        class="grid grid-cols-5 items-center gap-3"
        id="options"
      >
        <TextField
          :name="option.label"
          class="col-span-2"
          :placeholder="option.label"
          :value="option.label"
        />
        <TextField
          :name="option.value"
          class="col-span-2"
          :placeholder="option.value"
          :value="option.value"
        />
        <button
          @click="removeOption(option.id)"
          class="border mb-3 h-7 w-10 rounded-lg text-red-500 border-red-200 hover:bg-red-100 cursor-pointer"
        >
          x
        </button>
      </div>
      <button
        @click="addOption"
        class="bg-transparent text-xs px-2 py-1 hover:bg-gray-200 cursor-pointer text-gray-700 hover:text-gray-700 border border-gray-500 hover:border-transparent rounded-xl"
      >
        + Add option
      </button>
    </template>
  </div>
</template>
