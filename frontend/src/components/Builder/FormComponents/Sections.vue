<script setup>
import { ref, computed } from "vue";
import draggable from "vuedraggable";
import Fields from "./Fields.vue";

defineProps({
  fieldsList: { type: Object, default: () => ({}) },
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
  <draggable v-bind="dragOptions" :list="fieldsList" class="min-h-100">
    <template #item="{ element, index }">
      <Fields :fieldData="element" :key="index" />
    </template>
  </draggable>
</template>

<style>
.ghost {
  border-radius: 20px;
  width: 50%;
}
</style>
