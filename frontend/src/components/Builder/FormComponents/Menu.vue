<script setup>
import { ref } from "vue";
import draggable from "vuedraggable";

const FIELD_TYPES = ref([
  {
    id: 1,
    name: "Text",
    type: "text",
    label: "Single Line",
    placeholder: "Single Line",
    icon: "fa-solid fa-font",
  },
  {
    id: 2,
    name: "Multi Line",
    type: "textarea",
    icon: "fa-solid fa-paragraph",
  },

  {
    id: 3,
    name: "Number",
    type: "number",
    icon: "fa-solid fa-hashtag",
  },
  {
    id: 4,
    name: "Email",
    type: "email",
    icon: "fa-solid fa-at",
  },
  {
    id: 5,
    name: "Date",
    type: "date",
    icon: "fa-solid fa-calendar",
  },
  {
    id: 6,
    name: "Select",
    type: "select",
    icon: "fa-solid fa-angle-down",
  },
  {
    id: 7,
    name: "Multi-Select",
    type: "multiselect",
    icon: "fa-solid fa-align-center",
  },
  {
    id: 8,
    name: "Checkbox",
    type: "checkbox",
    icon: "fa-solid fa-square-check",
  },
  {
    id: 9,
    name: "Radio",
    type: "radio",
    icon: "fa-solid fa-circle-dot",
  },
]);

const clonedElement = (data) => {
  const cloned = JSON.parse(JSON.stringify(data));
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
            <span class="text-xs">{{ element.name }}</span>
          </li>
        </ul>
      </template>
    </draggable>
  </div>
</template>
