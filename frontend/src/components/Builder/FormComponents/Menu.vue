<script setup>
import { ref } from "vue";
import draggable from "vuedraggable";

const FIELD_TYPES = ref([
  {
    id: 1,
    name: "single_line",
    type: "text",
    label: "Single Line",
    placeholder: "Single Line",
    icon: "fa-solid fa-font",
    required: false,
    help_text: "",
    field_name: "",
    validation: {
      min: 1,
      max: 20,
    },
  },
  {
    id: 2,
    name: "multi_line",
    type: "textarea",
    label: "Multi Line",
    placeholder: "Multi Line",
    icon: "fa-solid fa-paragraph",
    required: false,
    help_text: "",
    field_name: "",
    validation: {
      min: 1,
      max: 20,
    },
  },

  {
    id: 3,
    name: "number",
    type: "number",
    label: "Number",
    placeholder: "Number",
    icon: "fa-solid fa-hashtag",
    required: false,
    help_text: "",
    field_name: "",
    validation: {
      min: 1,
      max: 20,
    },
  },
  {
    id: 4,
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "email@example.com",
    icon: "fa-solid fa-at",
    field_name: "",
    help_text: "",
    required: false,
  },
  {
    id: 5,
    name: "date",
    type: "date",
    label: "Date",
    placeholder: "Date",
    icon: "fa-solid fa-calendar",
    field_name: "",
    help_text: "",
    required: false,
  },
  {
    id: 6,
    name: "select",
    type: "select",
    label: "Select",
    placeholder: "Select ption",
    icon: "fa-solid fa-angle-down",
    field_name: "",
    help_text: "",
    required: false,
    options: [
      { id: Math.random(), label: "Option 1", value: "option_1" },
      { id: Math.random(), label: "Option 2", value: "option_2" },
    ],
  },
  {
    id: 7,
    name: "multiselect",
    type: "multiselect",
    label: "Multi Select",
    placeholder: "Select options",
    icon: "fa-solid fa-align-center",
    field_name: "",
    help_text: "",
    required: false,
    options: [
      { id: Math.random(), label: "Option 1", value: "option_1" },
      { id: Math.random(), label: "Option 2", value: "option_2" },
    ],
  },
  {
    id: 8,
    name: "checkbox",
    type: "checkbox",
    label: "Checkbox",
    placeholder: "",
    icon: "fa-solid fa-square-check",
    field_name: "",
    help_text: "",
    required: false,
    options: [
      { id: Math.random(), label: "Option 1", value: "option_1" },
      { id: Math.random(), label: "Option 2", value: "option_2" },
    ],
  },
  {
    id: 9,
    name: "radio",
    type: "radio",
    label: "Radio",
    placeholder: "",
    icon: "fa-solid fa-circle-dot",
    field_name: "",
    help_text: "",
    required: false,
    options: [
      { id: Math.random(), label: "Option 1", value: "option_1" },
      { id: Math.random(), label: "Option 2", value: "option_2" },
    ],
  },
]);

const clonedElement = (data) => {
  const cloned = JSON.parse(JSON.stringify(data));
  cloned.id = Date.now();
  return cloned;
};
</script>

<template>
  <div class="bg-slate-50 p-4 rounded-lg max-h-max">
    <header class="mb-3">
      <p class="font-bold">Add fields</p>
    </header>

    <draggable
      class="drag-list"
      :list="FIELD_TYPES"
      itemKey="id"
      :sort="false"
      :clone="clonedElement"
      :group="{ name: 'form-builder', pull: 'clone', put: false }"
    >
      <template #item="{ element }">
        <ul class="cursor-move">
          <li
            class="flex items-center gap-3 my-3 border border-dashed rounded-lg py-2 px-4 hover:text-indigo-600"
          >
            <i class="text-xs" :class="element.icon"></i>
            <span class="text-xs">{{ element.label }}</span>
          </li>
        </ul>
      </template>
    </draggable>
  </div>
</template>
