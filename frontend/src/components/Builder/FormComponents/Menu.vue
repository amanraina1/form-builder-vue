<script setup>
import { ref } from "vue";
import draggable from "vuedraggable";
import { useStore } from "vuex";
const store = useStore();

const defaultId = ref("");

const FIELD_TYPES = ref([
  {
    id: 1,
    name: "single_line",
    dataType: "text",
    label: "Single Line",
    placeholder: "Single Line",
    icon: "fa-solid fa-font",
    isRequired: false,
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
    dataType: "textarea",
    label: "Multi Line",
    placeholder: "Multi Line",
    icon: "fa-solid fa-paragraph",
    isRequired: false,
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
    dataType: "number",
    label: "Number",
    placeholder: "Integer",
    icon: "fa-solid fa-hashtag",
    isRequired: false,
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
    dataType: "email",
    label: "Email",
    placeholder: "email@example.com",
    icon: "fa-solid fa-at",
    field_name: "",
    help_text: "",
    isRequired: false,
  },
  {
    id: 5,
    name: "date",
    dataType: "date",
    label: "Date",
    placeholder: "Date",
    icon: "fa-solid fa-calendar",
    field_name: "",
    help_text: "",
    isRequired: false,
  },
  {
    id: 6,
    name: "select",
    dataType: "select",
    label: "Select",
    placeholder: "Select ption",
    icon: "fa-solid fa-angle-down",
    field_name: "",
    help_text: "",
    isRequired: false,
    options: [
      { id: Math.random(), label: "Option 1", value: "option_1" },
      { id: Math.random(), label: "Option 2", value: "option_2" },
    ],
  },
  {
    id: 7,
    name: "multiselect",
    dataType: "multiselect",
    label: "Multi Select",
    placeholder: "Select options",
    icon: "fa-solid fa-align-center",
    field_name: "",
    help_text: "",
    isRequired: false,
    options: [
      { id: Math.random(), label: "Option 1", value: "option_1" },
      { id: Math.random(), label: "Option 2", value: "option_2" },
    ],
  },
  {
    id: 8,
    name: "checkbox",
    dataType: "checkbox",
    label: "Checkbox",
    placeholder: "",
    icon: "fa-solid fa-square-check",
    field_name: "",
    help_text: "",
    isRequired: false,
    options: [
      { id: Math.random(), label: "Option 1", value: "option_1" },
      { id: Math.random(), label: "Option 2", value: "option_2" },
    ],
  },
  {
    id: 9,
    name: "radio",
    dataType: "radio",
    label: "Radio",
    placeholder: "",
    icon: "fa-solid fa-circle-dot",
    field_name: "",
    help_text: "",
    isRequired: false,
    options: [
      { id: Math.random(), label: "Option 1", value: "option_1" },
      { id: Math.random(), label: "Option 2", value: "option_2" },
    ],
  },
]);

const clonedElement = (data) => {
  const cloned = JSON.parse(JSON.stringify(data));
  // this id needs to be be added in the cloned element, so that there should be a
  // differentiating factor when we select, other wise if id is same,
  // then it will not be able to select the specific field
  defaultId.value = Date.now();
  cloned.id = defaultId.value;
  return cloned;
};

const onDrop = (e) => {
  if (e.to !== e.from) {
    const itemId = e.item.__draggable_context.element.id;
    const findField = FIELD_TYPES.value.find((item) => item.id === itemId);
    // this id needs to be added also in the store, so that the object id identical in the store and field data
    findField.id = defaultId.value;
    store.commit("addActiveField", findField);
  }
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
      @end="onDrop"
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
