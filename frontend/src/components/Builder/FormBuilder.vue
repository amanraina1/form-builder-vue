<script setup>
import { computed, onMounted, onUnmounted, reactive, ref } from "vue";
import axios from "axios";
import Menu from "./FormComponents/Menu.vue";
import Sections from "./FormComponents/Sections.vue";
import FieldSettings from "./FormComponents/FieldSettings/FieldSettings.vue";
import TextField from "../FormFields/TextField.vue";
import CheckboxField from "../FormFields/CheckboxField.vue";
import Loader from "../Mini/Loader.vue";
import Alert from "../Mini/Alert.vue";
import { errorHandler, successHandler } from "../../helpers/responseHandler";
import { getIdFromUrl } from "../../helpers/extralogics";

import { useStore } from "vuex";
const store = useStore();

import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

const activeField = computed(() => store.getters.getActiveField);
const fieldsList = computed({
  get() {
    return store.getters.getFormFields;
  },
  set(value) {
    store.commit("updateFormDetails", value);
  },
});

const loading = ref(false);
const formId = ref("");
const loaderMsg = ref("Getting the form details for you... 👍🏻");
const form = reactive({
  name: "",
  description: "",
  isActive: true,
});

const onChange = (value, name) => {
  form[name] = value;
};

const saveFields = async () => {
  loaderMsg.value = formId.value
    ? "Updating your form. Yay !!!"
    : "Saving the new form...🔥";
  loading.value = true;
  try {
    const data = {
      ...form,
      fields: fieldsList.value,
    };
    const apiUrl = formId.value ? `/api/forms/${formId.value}` : "/api/forms";
    const res = await axios.post(apiUrl, data);
    successHandler(res.data.message);

    if (!formId.value) {
      // redirect, only in case of create page
      setTimeout(() => {
        destroyForm();
        router.push("/");
      }, 2000);
    } else {
      destroyForm();
      getInitialValues();
    }
  } catch (e) {
    errorHandler(e.message);
  } finally {
    loading.value = false;
  }
};

const destroyForm = () => {
  store.commit("destroyForm");
};

const getInitialValues = async () => {
  loaderMsg.value = "Getting the form details for you... 👍🏻";
  const id = getIdFromUrl(route.path);
  formId.value = id;
  try {
    loading.value = true;
    const res = await axios.get(`/api/forms/${formId.value}`);
    const { data } = res.data;
    form.name = data.name;
    form.description = data.description;
    form.isActive = data.isActive;
    if (data.fields) {
      fieldsList.value = data?.fields;
    }
  } catch (e) {
    errorHandler(e.message);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  const isEdit = route.path.includes("edit");

  if (isEdit) {
    getInitialValues();
  }
});

onUnmounted(destroyForm);
</script>

<template>
  <Loader v-if="loading" :message="loaderMsg" />
  <div class="main-wrapper mx-auto py-4 basic-details">
    <Alert />
    <header class="flex justify-between items-center">
      <div class="flex items-center">
        <router-link
          to="/"
          class="bg-slate-50 hover:bg-slate-100 font-light py-2 px-5 mr-2 rounded-xl cursor-pointer"
        >
          <i class="fas fa-arrow-left font-light"></i>
          Back
        </router-link>
        <h1 class="font-bold text-2xl">
          {{ formId ? "Edit form" : "New form" }}
        </h1>
      </div>

      <div class="flex items-center gap-4">
        <Checkbox
          name="isActive"
          :onChange="onChange"
          :value="form.isActive"
          label="Active"
        />
        <button
          @click="saveFields"
          class="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-5 rounded-xl cursor-pointer"
        >
          {{ formId ? "Update form" : "Save form" }}
        </button>
      </div>
    </header>

    <div class="bg-white p-4 my-2 rounded-xl">
      <TextField
        name="name"
        :value="form.name"
        :onChange="onChange"
        label="Form name"
      />

      <TextField
        type="textarea"
        :value="form.description"
        :onChange="onChange"
        name="description"
        label="Description (Optional)"
      />
    </div>

    <div class="grid grid-cols-10 gap-10">
      <Menu class="col-span-2" />

      <div class="min-h-100 col-span-5 px-4 bg-slate-50">
        <header class="mb-3 border-bottom border-b">
          <p class="font-bold px-4 py-2">Form fields</p>
        </header>
        <div
          v-if="fieldsList.length === 0"
          class="flex flex-col items-center border border-dashed rounded-lg opacity-50 px-2 py-2"
        >
          <img src="../../assets/drag.png" class="w-15 h-15" />
          <p>
            Drag an element from the left and drop it below. Drag rows to
            reorder
          </p>
        </div>
        <Sections :fieldsList="fieldsList" />
      </div>

      <FieldSettings :activeField="activeField" class="col-span-3" />
    </div>
  </div>
</template>

<!-- 
• highlight on hover in navbar
• back button in create form page
• implement delete functionality
• router functionality
• loader functionality in the whole app
• alert functionality
• on dropping a new field, it should automatically become active


• add common responseHandler for both backend and frontend
• make a new modal component and use it in various places as a confirmation modal like delete form in the form list page
• multiselect component is pending
• check checkbox also
• add sticky top in the menu bar in builder

-->
