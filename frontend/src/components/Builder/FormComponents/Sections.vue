<script setup>
import { ref, computed } from "vue";
import draggable from "vuedraggable";
import Fields from "./Fields.vue";

const props = defineProps({
  fieldsList: { type: Object, default: () => [] },
});

const originalList = computed(() => {
  return props.fieldsList;
});

const dragOptions = computed(() => {
  return {
    animation: 200,
    group: "form-builder",
    ghostClass: "ghost",
  };
});
</script>

<template>
  <draggable
    v-bind="dragOptions"
    :list="originalList"
    class="min-h-100"
    item-key="id"
  >
    <template #item="{ element, index }">
      <Fields :fieldData="element" :key="index" />
    </template>
  </draggable>
</template>

<style>
.ghost {
  border-radius: 20px;
  width: 50%;
  opacity: 0.5;
}
</style>
