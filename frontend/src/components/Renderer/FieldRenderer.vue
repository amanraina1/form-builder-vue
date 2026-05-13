<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();

const props = defineProps({
  field: { type: Object, required: true },
});
import CheckboxField from "../FormFields/CheckboxField.vue";
import DateField from "../FormFields/DateField.vue";
import RadioField from "../FormFields/RadioField.vue";
import SelectField from "../FormFields/SelectField.vue";
import TextField from "../FormFields/TextField.vue";

const fieldValues = computed(() => store.getters.getFieldValues);

const onChange = (value, name) => {
  const fieldData = {
    name: props.field.name,
    value,
  };
  store.commit("setFieldValues", fieldData);
};
</script>
<template>
  <TextField
    v-if="['textarea', 'text', 'number', 'email'].includes(field.dataType)"
    :type="field.dataType"
    :description="field.helpText"
    :name="field.name"
    :label="field.label"
    :value="fieldValues[field.name] || ''"
    :onChange="onChange"
    :placeholder="field.placeholder"
  />

  <DateField
    v-if="field.dataType === 'date'"
    :name="field.name"
    :value="fieldValues[field.name] || ''"
    :onChange="onChange"
    :description="field.helpText"
    :label="field.label"
  />

  <SelectField
    v-if="field.dataType === 'select'"
    :name="field.name"
    :value="fieldValues[field.name] || ''"
    :onChange="onChange"
    :description="field.helpText"
    :label="field.label"
    :options="field.options"
  />
  <RadioField
    v-if="field.dataType === 'radio'"
    :name="field.name"
    :value="fieldValues[field.name] || ''"
    :onChange="onChange"
    :description="field.helpText"
    :label="field.label"
    :options="field.options"
  />

  <CheckboxField
    v-if="field.dataType === 'checkbox'"
    :name="field.name"
    :value="fieldValues[field.name] || []"
    :onChange="onChange"
    :description="field.helpText"
    :label="field.label"
    :options="field.options"
  />
</template>
