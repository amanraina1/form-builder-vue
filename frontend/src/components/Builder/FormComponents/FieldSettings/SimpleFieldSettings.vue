<script setup>
import { computed, ref } from "vue";
import TextField from "../../../FormFields/TextField.vue";
import CheckboxField from "../../../FormFields/CheckboxField.vue";

import { useStore } from "vuex";
const store = useStore();

const props = defineProps({
  activeField: { type: Object, default: () => ({}) },
});

const fieldValues = computed(() => props.activeField);
const onChange = (value, name) => {
  store.commit("updateActiveField", { name, value });
};
const validationChange = (value, name) => {
  if (name === "min_validation") {
    onChange(
      { min: value, max: fieldValues.value.validation.max },
      "validation",
    );
  } else {
    onChange(
      { max: value, min: fieldValues.value.validation.min },
      "validation",
    );
  }
};

const addOption = () => {
  // we need to add validation so that user cannot have two entries with same value
  const option = {
    id: Math.random(),
    label: `Option ${fieldValues.value.options.length + 1}`,
    value: `option_${fieldValues.value.options.length + 1}`,
  };
  onChange([...fieldValues.value.options, option], "options");
};

const removeOption = (id) => {
  let allOptions = [...fieldValues.value.options];
  allOptions = allOptions.filter((option) => option.id !== id);
  onChange(allOptions, "options");
};

const optionChanges = (val, name) => {
  const id = +name.substring(6);
  let allOptions = [...fieldValues.value.options];
  const optionFind = allOptions.find((option) => option.id === id);
  if (name.includes("label")) {
    optionFind.label = val;
  } else {
    optionFind.value = val;
  }

  onChange(allOptions, "options");
};
</script>

<template>
  <div class="min-h-10">
    <template v-if="!Object.keys(activeField).length">
      <p class="text-gray-400">Select a field to edit its settings.</p>
    </template>

    <template v-else>
      <TextField
        name="label"
        label="Label"
        placeholder="Enter Label"
        :value="fieldValues?.label"
        :onChange="onChange"
      />

      <TextField
        name="name"
        label="Field name (key)"
        placeholder="e.g. first_name"
        description="Used as the data key. Letters, numbers and underscores only"
        :value="fieldValues?.name"
        :onChange="onChange"
      />

      <TextField
        v-if="!['checkbox', 'radio'].includes(fieldValues?.dataType)"
        name="placeholder"
        label="Placeholder"
        placeholder="Placeholder"
        :value="fieldValues?.placeholder"
        :onChange="onChange"
      />

      <TextField
        name="helpText"
        label="Help text"
        placeholder="e.g. Enter Name"
        :value="fieldValues?.helpText"
        :onChange="onChange"
      />

      <CheckboxField
        name="isRequired"
        label="Required field"
        class="mb-2"
        :value="fieldValues.isRequired"
        :onChange="onChange"
      />

      <template
        v-if="['text', 'textarea', 'number'].includes(fieldValues?.dataType)"
      >
        <TextField
          name="min_validation"
          label="Validation"
          type="number"
          placeholder="Min length"
          :value="fieldValues.validation.min"
          :onChange="validationChange"
        />
        <TextField
          name="max_validation"
          type="number"
          placeholder="Max length"
          :value="fieldValues.validation.max"
          :onChange="validationChange"
        />
      </template>

      <template
        v-if="
          ['radio', 'select', 'multiselect', 'checkbox'].includes(
            fieldValues?.dataType,
          )
        "
      >
        <label for="options" class="block font-bold text-sm/6 text-gray-900"
          >Options</label
        >

        <div
          v-for="option in fieldValues.options"
          :key="option.id"
          class="grid grid-cols-5 items-center gap-3"
          id="options"
        >
          <TextField
            :name="`label_${option.id}`"
            class="col-span-2"
            :placeholder="option.label"
            :value="option.label"
            :onChange="optionChanges"
          />
          <TextField
            :name="`value_${option.id}`"
            class="col-span-2"
            :placeholder="option.value"
            :value="option.value"
            :onChange="optionChanges"
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
    </template>
  </div>
</template>
