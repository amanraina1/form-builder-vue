<script setup>
import { ref, computed } from "vue";
import draggable from "vuedraggable";
import Fields from "./Fields.vue";

const dragOptions = computed(() => {
  return {
    animation: 200,
    group: "form-builder",
  };
});

const fieldsList = ref([]);
</script>

<template>
  <div class="main">
    <div class="field-sections h-screen bg-red-50">
      <draggable v-bind="dragOptions" :list="fieldsList">
        <template #item="{ element, index }">
          <div
            v-if="fieldsList.length == 0"
            class="flex justify-center items-center border border-dashed rounded-lg min-h-37.5"
          >
            <p class="text-gray-500">
              Drag a field from the left and drop here to add. Drag rows to
              reorder.
            </p>
          </div>
          <Fields v-else :fieldData="element" :key="index" />
        </template>
      </draggable>
    </div>
  </div>
</template>
