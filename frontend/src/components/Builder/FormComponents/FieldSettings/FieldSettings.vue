<script setup>
import SimpleFieldSettings from "./SimpleFieldSettings.vue";

defineProps({
  fieldType: { type: String, default: "text" },
});
</script>

<template>
  <div class="field-settings-card bg-slate-50 px-4 py-2">
    <header class="mb-2">
      <p class="font-bold">Field Settings</p>
    </header>

    <div class="field-settings-body">
      <SimpleFieldSettings fieldType="select" />
    </div>
  </div>
</template>
