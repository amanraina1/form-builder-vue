<script setup>
import { ref } from "vue";

import axios from "axios";

const formsList = ref([]);

axios
  .get("/api/forms")
  .then((res) => {
    formsList.value = res.data.data;
  })
  .catch(() => {});
</script>

<template>
  <div class="main-wrapper p-10 mx-auto">
    <header class="flex justify-between items-center">
      <div>
        <h2 class="text-3xl font-bold">Forms</h2>
        <p class="text-gray-500">Create and manage forms</p>
      </div>
      <button
        class="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-5 rounded-xl cursor-pointer"
      >
        + New form
      </button>
    </header>

    <ul>
      <li
        v-for="form in formsList"
        class="bg-white p-4 rounded-xl mt-6 flex justify-between items-center"
      >
        <span class="flex flex-col gap-1 text-lg font-semibold">
          {{ form.name }}
          <span class="text-gray-500 flex gap-2 font-light">
            <span>{{ form.fields || 0 }} fields</span>•
            <span>{{ form.submissions || 0 }} Submissions</span>
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
            class="mr-2 bg-transparent hover:bg-red-500/10 text-red-500 font-semibold py-1 px-4 border border-red-500 rounded-xl transition-all cursor-pointer"
          >
            Delete
          </button>
        </span>
      </li>
    </ul>
  </div>
</template>
