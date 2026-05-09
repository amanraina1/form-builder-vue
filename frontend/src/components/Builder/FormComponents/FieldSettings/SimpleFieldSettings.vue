<script setup>
import Checkbox from "../../../FormFields/Checkbox.vue";
import TextField from "../../../FormFields/TextField.vue";

defineProps({
  fieldType: { type: String, default: "text" },
});
</script>

<template>
  <div>
    <TextField name="Label" label="Label" placeholder="Enter Label" />

    <TextField
      name="Field name"
      label="Field name (key)"
      placeholder="e.g. first_name"
      description="Used as the data key. Letters, numbers and underscores only"
    />

    <TextField
      name="placeholder"
      label="Placeholder"
      placeholder="Placeholder"
    />

    <TextField
      name="help_text"
      label="Help text"
      placeholder="e.g. Enter Name"
    />

    <Checkbox label="Required field" />

    <template v-if="['text', 'textarea', 'number'].includes(fieldType)">
      <TextField
        name="validation"
        label="Validation"
        type="number"
        placeholder="Min length"
      />
      <TextField name="validation" type="number" placeholder="Max length" />
    </template>
  </div>
</template>
