<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import axios from "axios";
import { getIdFromUrl } from "../../helpers/extralogics";

import { useRoute } from "vue-router";
const route = useRoute();

import { useStore } from "vuex";
const store = useStore();

import SelectField from "../FormFields/SelectField.vue";
import TextField from "../FormFields/TextField.vue";
import RadioField from "../FormFields/RadioField.vue";
import DateField from "../FormFields/DateField.vue";
import FieldRenderer from "./FieldRenderer.vue";
import { errorHandler } from "../../helpers/responseHandler";
import Loader from "../Mini/Loader.vue";

const loading = ref(false);
const formId = ref("");
const formName = ref("");
const formDesc = ref("");
const formFields = computed({
  get() {
    return store.getters.getFormRenderFields;
  },
  set(val) {
    store.commit("setFormRenderFields", val);
  },
});

const getInitialValues = async () => {
  formId.value = getIdFromUrl(route.path);

  try {
    loading.value = true;
    const res = await axios.get(`/api/forms/${formId.value}`);
    formName.value = res.data.data.name;
    formDesc.value = res.data.data.description;
    if (res.data && res.data.data && res.data.data.fields) {
      formFields.value = res.data.data.fields;
    }
  } catch (err) {
    errorHandler(err.message);
  } finally {
    loading.value = false;
  }
};

const destroyFormRendered = () => {
  store.commit("destroyFormRendered");
};
const formVal = ref("");

onMounted(getInitialValues);
onUnmounted(destroyFormRendered);
</script>
<template>
  <div class="main-wrapper mx-auto py-4 basic-details">
    <header class="flex justify-between items-center mb-3">
      <div>
        <h1 class="font-bold text-2xl">Render form</h1>
        <p class="text-gray-500/80">Pick a form to fill out and submit.</p>
      </div>
    </header>

    <div class="form-container shadow-lg rounded-lg overflow-hidden">
      <Loader v-if="loading" message="hello youuuu..." />
      <div class="card-header bg-gray-200 p-3">
        <h3 class="font-bold">{{ formName }}</h3>
        <small class="text-gray-700">{{ formDesc }}</small>
      </div>
      <div class="card-body p-3">
        <FieldRenderer
          v-for="(field, index) in formFields"
          :key="index"
          :field="field"
        />
      </div>
      <div class="card-footer bg-gray-200 p-3">
        <button
          class="mr-2 bg-transparent hover:bg-blue-500/20 text-blue-500 font-semibold py-1 px-4 border border-blue-500 rounded-xl transition-all cursor-pointer"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>
