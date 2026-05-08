<script setup>
import Menu from "./FormComponents/Menu.vue";
import Sections from "./FormComponents/Sections.vue";
import TextField from "../FormFields/TextField.vue";
</script>

<template>
  <div class="main-wrapper mx-auto p-10 basic-details">
    <header class="flex justify-between items-center">
      <h1 class="font-bold text-2xl">New Form</h1>
      <span>
        <span class="mr-4">
          <input type="checkbox" class="mr-2" />
          <label>Active</label>
        </span>
        <button
          class="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-5 rounded-xl cursor-pointer"
        >
          Save form
        </button>
      </span>
    </header>

    <div class="bg-white p-4 my-8 rounded-xl">
      <TextField name="formName" label="Form name" />

      <TextField
        type="textarea"
        name="description"
        label="Description (Optional)"
      />
    </div>

    <div class="grid grid-cols-10 gap-10">
      <Menu class="md:col-span-2" />
      <Sections class="col-span-5" />
      <!-- <Menu class="col-span-3" /> -->
    </div>
  </div>
</template>
