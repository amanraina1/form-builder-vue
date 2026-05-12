<script setup>
defineProps({
  field: { type: Object, required: true },
});
import CheckboxField from "../FormFields/CheckboxField.vue";
import DateField from "../FormFields/DateField.vue";
import RadioField from "../FormFields/RadioField.vue";
import SelectField from "../FormFields/SelectField.vue";
import TextField from "../FormFields/TextField.vue";
</script>
<template>
  <!-- {{ field }} -->
  <TextField
    v-if="['textarea', 'text', 'number', 'email'].includes(field.dataType)"
    :type="field.dataType"
    :description="field.helpText"
    :name="field.name"
    :label="field.label"
    :placeholder="field.placeholder"
  />

  <DateField
    v-if="field.dataType === 'date'"
    :name="field.name"
    :description="field.helpText"
    :label="field.label"
  />

  <SelectField
    v-if="field.dataType === 'select'"
    :name="field.name"
    :label="field.label"
    :options="field.options"
  />
  <RadioField
    v-if="field.dataType === 'radio'"
    :name="field.name"
    :label="field.label"
    :value="field.value"
    :options="field.options"
  />

  <CheckboxField
    v-if="field.dataType === 'checkbox'"
    :name="field.name"
    :label="field.label"
    :value="field.value"
    :options="field.options"
  />
</template>

<!-- <RadioField
    :name="field.name"
    label="field.label"
    :value="field.value"
    :options="[
      { label: 'Hello', name: 'hello', value: 'hello' },
      { label: 'World', name: 'world', value: 'world' },
      { label: 'pop', name: 'pop', value: 'pop' },
      { label: 'oiu', name: 'oiu', value: 'oiu' },
    ]"
  /> -->
