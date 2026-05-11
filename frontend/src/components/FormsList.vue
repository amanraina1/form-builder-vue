<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Loader from "./Mini/Loader.vue";
import { useStore } from "vuex";
import Alert from "./Mini/Alert.vue";
const store = useStore();

const formsList = ref([]);
const loading = ref(false);
const message = ref("Fetching the forms...🚀");

const getForms = async () => {
  message.value = "Fetching the forms...🚀";
  loading.value = true;
  try {
    const res = await axios.get("/api/forms");
    formsList.value = res.data.data;
  } catch (e) {
    store.commit("setAlert", { type: "danger", message: e.message });
  } finally {
    loading.value = false;
  }
};

const deleteForm = async (id) => {
  message.value = "Deleting the form... 👀";
  loading.value = true;
  try {
    await axios.delete(`/api/forms/${id}`);
    setTimeout(getForms, 1500);
  } catch (e) {
    store.commit("setAlert", { type: "danger", message: e.message });
  } finally {
    loading.value = false;
  }
};

onMounted(getForms);
</script>

<template>
  <div class="main-wrapper px-10 py-3 mx-auto">
    <Alert />
    <header class="flex justify-between items-center">
      <div>
        <h2 class="text-3xl font-bold">Forms</h2>
        <p class="text-gray-500">Create and manage forms</p>
      </div>
      <router-link to="/builder">
        <button
          :disabled="loading"
          class="bg-blue-700 hover:bg-blue-900 text-white disabled:bg-blue-200 disabled:cursor-not-allowed font-bold py-2 px-5 rounded-xl cursor-pointer"
        >
          + New form
        </button>
      </router-link>
    </header>

    <Loader :message="message" v-if="loading" />

    <ul v-else>
      <li
        v-for="form in formsList"
        class="bg-white p-4 rounded-xl mt-6 flex justify-between items-center"
      >
        <span class="flex flex-col gap-1 text-lg font-semibold">
          {{ form.name }}
          <span class="text-gray-500 flex gap-2 font-light">
            <span>{{ form.fieldsCount || 0 }} fields</span>•
            <span>{{ form.submissionsCount || 0 }} Submissions</span>
          </span>
        </span>
        <span>
          <button
            class="mr-2 bg-transparent hover:bg-gray-500/10 text-gray-500 font-semibold py-1 px-4 border border-gray-500 rounded-xl transition-all cursor-pointer"
          >
            Edit
          </button>
          <button
            class="mr-2 bg-transparent hover:bg-gray-500/10 text-gray-500 font-semibold py-1 px-4 border border-gray-500 rounded-xl transition-all cursor-pointer"
          >
            Open
          </button>
          <button
            @click="deleteForm(form.id)"
            class="mr-2 bg-transparent hover:bg-red-500/10 text-red-500 font-semibold py-1 px-4 border border-red-500 rounded-xl transition-all cursor-pointer"
          >
            Delete
          </button>
        </span>
      </li>
    </ul>
  </div>
</template>
