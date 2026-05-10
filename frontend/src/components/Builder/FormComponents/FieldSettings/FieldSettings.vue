<script setup>
import SimpleFieldSettings from "./SimpleFieldSettings.vue";

defineProps({
  activeField: { type: Object, default: () => ({}) },
});
</script>

<template>
  <div class="field-settings-card bg-slate-50 px-4 py-2 max-h-max">
    <header class="mb-2">
      <p class="font-bold">Field Settings</p>
    </header>

    <div class="field-settings-body">
      <SimpleFieldSettings :activeField="activeField" />
    </div>
  </div>
</template>
