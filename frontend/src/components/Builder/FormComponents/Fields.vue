<script setup>
import { ref } from "vue";
import FESimpleFields from "./FEFields.vue/FESimpleFields.vue";

const props = defineProps({
  fieldData: { type: Object, required: true },
});
</script>
<template>
  <div class="main-div-form-builder cursor-move">
    <FESimpleFields :field-data="fieldData" />
  </div>
</template>
