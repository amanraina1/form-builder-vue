<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();

defineProps({
  fieldData: { type: Object, default: () => ({}) },
});

const addActiveField = (field) => {
  store.commit("addActiveField", field);
};

const removeField = (id) => {
  store.commit("removeField", id);
};

const activeField = computed(() => store.getters.getActiveField);
</script>

<template>
  <div>
    <div
      v-if="fieldData.type === 'text'"
      :class="{
        'shadow-2xl outline outline-blue-500':
          activeField?.id === fieldData?.id,
      }"
      class="p-1 outline-blue-400 grid grid-cols-10 items-center input-field bg-slate-50 rounded-xl"
    >
      <label
        @click="addActiveField(fieldData)"
        :for="fieldData.label"
        class="col-span-2 text-sm block text-gray-900"
        >{{ fieldData.label }}</label
      >
      <input
        @click="addActiveField(fieldData)"
        :id="fieldData.name"
        :disabled="true"
        type="text"
        :name="fieldData.name"
        placeholder="Short text"
        class="col-span-7 rounded-sm grow py-1.5 pr-3 pl-1 text-base text-gray-900 outline-1 placeholder:text-gray-400 sm:text-sm/6"
      />

      <button
        @click="removeField(fieldData.id)"
        class="border ml-1 h-7 w-7 rounded-lg text-red-500 border-red-200 hover:bg-red-100 cursor-pointer"
      >
        <i class="fas fa-trash text-xs"></i>
      </button>
    </div>

    <div
      v-else-if="fieldData.type === 'textarea'"
      :class="{
        'shadow-2xl outline outline-blue-500':
          activeField?.id === fieldData?.id,
      }"
      class="grid grid-cols-10 items-center input-field bg-slate-50 rounded-xl p-2"
    >
      <label
        @click="addActiveField(fieldData)"
        :for="fieldData.name"
        class="col-span-2 text-sm/6 font-medium text-gray-900"
        >Multi Line</label
      >
      <input
        @click="addActiveField(fieldData)"
        :id="fieldData.name"
        :disabled="true"
        type="text"
        :name="fieldData.name"
        placeholder="Short text"
        class="col-span-7 rounded-sm grow py-1.5 pr-3 pl-1 text-base text-gray-900 outline-1 placeholder:text-gray-400 sm:text-sm/6"
      />

      <button
        @click="removeField(fieldData.id)"
        class="border ml-1 h-7 w-7 rounded-lg text-red-500 border-red-200 hover:bg-red-100 cursor-pointer"
      >
        <i class="fas fa-trash text-xs"></i>
      </button>
    </div>

    <div
      v-else-if="fieldData.type === 'number'"
      :class="{
        'shadow-2xl outline outline-blue-500':
          activeField?.id === fieldData?.id,
      }"
      @click="addActiveField(fieldData)"
      class="grid grid-cols-10 items-center input-field bg-slate-50 rounded-xl p-2"
    >
      <label
        @click="addActiveField(fieldData)"
        :for="fieldData.name"
        class="col-span-2 text-sm/6 font-medium text-gray-900"
        >Number</label
      >
      <input
        @click="addActiveField(fieldData)"
        :id="fieldData.name"
        :disabled="true"
        type="text"
        :name="fieldData.name"
        placeholder="Integer"
        class="col-span-7 rounded-sm py-1.5 pr-3 pl-1 text-base text-gray-900 outline-1 placeholder:text-gray-400 sm:text-sm/6"
      />

      <button
        @click="removeField(fieldData.id)"
        class="border ml-1 h-7 w-7 rounded-lg text-red-500 border-red-200 hover:bg-red-100 cursor-pointer"
      >
        <i class="fas fa-trash text-xs"></i>
      </button>
    </div>

    <div
      v-else-if="fieldData.type === 'email'"
      :class="{
        'shadow-2xl outline outline-blue-500':
          activeField?.id === fieldData?.id,
      }"
      class="grid grid-cols-10 items-center input-field bg-slate-50 rounded-xl p-2"
    >
      <label
        @click="addActiveField(fieldData)"
        :for="fieldData.name"
        class="col-span-2 text-sm/6 font-medium text-gray-900"
        >Email</label
      >
      <input
        @click="addActiveField(fieldData)"
        :id="fieldData.name"
        :disabled="true"
        type="text"
        :name="fieldData.name"
        placeholder="email@example.com"
        class="col-span-7 rounded-sm py-1.5 pr-3 pl-1 text-base text-gray-900 outline-1 placeholder:text-gray-400 sm:text-sm/6"
      />

      <button
        @click="removeField(fieldData.id)"
        class="border ml-1 h-7 w-7 rounded-lg text-red-500 border-red-200 hover:bg-red-100 cursor-pointer"
      >
        <i class="fas fa-trash text-xs"></i>
      </button>
    </div>

    <div
      v-else-if="fieldData.type === 'date'"
      :class="{
        'shadow-2xl outline outline-blue-500':
          activeField?.id === fieldData?.id,
      }"
      class="grid grid-cols-10 items-center input-field bg-slate-50 rounded-xl mb-4"
    >
      <label
        @click="addActiveField(fieldData)"
        :for="fieldData.name"
        class="col-span-2 text-sm/6 font-medium text-gray-900"
        >Date</label
      >
      <input
        @click="addActiveField(fieldData)"
        :id="fieldData.name"
        :disabled="true"
        type="text"
        :name="fieldData.name"
        placeholder="Date"
        class="col-span-7 rounded-sm grow py-1.5 pr-3 pl-1 text-base text-gray-900 outline-1 placeholder:text-gray-400 sm:text-sm/6"
      />

      <button
        @click="removeField(fieldData.id)"
        class="border ml-1 h-7 w-7 rounded-lg text-red-500 border-red-200 hover:bg-red-100 cursor-pointer"
      >
        <i class="fas fa-trash text-xs"></i>
      </button>
    </div>

    <div
      v-else-if="fieldData.type === 'select'"
      :class="{
        'shadow-2xl outline outline-blue-500':
          activeField?.id === fieldData?.id,
      }"
      class="grid grid-cols-10 items-center input-field bg-slate-50 rounded-xl mb-4"
    >
      <label
        @click="addActiveField(fieldData)"
        :for="fieldData.name"
        class="col-span-2 text-sm/6 font-medium text-gray-900"
        >Select</label
      >
      <input
        @click="addActiveField(fieldData)"
        :id="fieldData.name"
        :disabled="true"
        type="text"
        :name="fieldData.name"
        placeholder="Select Option"
        class="col-span-7 rounded-sm grow py-1.5 pr-3 pl-1 text-base text-gray-900 outline-1 placeholder:text-gray-400 sm:text-sm/6"
      />
      <button
        @click="removeField(fieldData.id)"
        class="border ml-1 h-7 w-7 rounded-lg text-red-500 border-red-200 hover:bg-red-100 cursor-pointer"
      >
        <i class="fas fa-trash text-xs"></i>
      </button>
    </div>

    <div
      v-else-if="fieldData.type === 'multiselect'"
      :class="{
        'shadow-2xl outline outline-blue-500':
          activeField?.id === fieldData?.id,
      }"
      class="grid grid-cols-10 items-center input-field bg-slate-50 rounded-xl mb-4"
    >
      <label
        @click="addActiveField(fieldData)"
        :for="fieldData.name"
        class="col-span-2 text-sm/6 font-medium text-gray-900"
        >Multi Select</label
      >
      <input
        @click="addActiveField(fieldData)"
        :id="fieldData.name"
        :disabled="true"
        type="text"
        :name="fieldData.name"
        placeholder="Multi Select"
        class="col-span-7 rounded-sm grow py-1.5 pr-3 pl-1 text-base text-gray-900 outline-1 placeholder:text-gray-400 sm:text-sm/6"
      />
      <button
        @click="removeField(fieldData.id)"
        class="border ml-1 h-7 w-7 rounded-lg text-red-500 border-red-200 hover:bg-red-100 cursor-pointer"
      >
        <i class="fas fa-trash text-xs"></i>
      </button>
    </div>

    <div
      v-else-if="fieldData.type === 'radio'"
      :class="{
        'shadow-2xl outline outline-blue-500':
          activeField?.id === fieldData?.id,
      }"
      class="grid grid-cols-10 items-center input-field bg-slate-50 rounded-xl p-1 mb-1"
    >
      <label
        @click="addActiveField(fieldData)"
        :for="fieldData.name"
        class="col-span-2 text-sm/6 font-medium text-gray-900"
        >Radio</label
      >
      <div class="col-span-7" @click="addActiveField(fieldData)">
        <input
          :id="fieldData.name"
          type="radio"
          :name="fieldData.name"
          class="py-1.5 pr-3 pl-1 sm:text-sm/6"
        />
      </div>
      <button
        @click="removeField(fieldData.id)"
        class="border ml-1 h-7 w-7 rounded-lg text-red-500 border-red-200 hover:bg-red-100 cursor-pointer"
      >
        <i class="fas fa-trash text-xs"></i>
      </button>
    </div>

    <div
      v-else-if="fieldData.type === 'checkbox'"
      :class="{
        'shadow-2xl outline outline-blue-500':
          activeField?.id === fieldData?.id,
      }"
      class="grid grid-cols-10 items-center input-field bg-slate-50 rounded-xl p-1 mb-1"
    >
      <label
        @click="addActiveField(fieldData)"
        :for="fieldData.name"
        class="col-span-2 text-sm/6 font-medium text-gray-900"
        >Checkbox</label
      >
      <div class="col-span-7" @click="addActiveField(fieldData)">
        <input
          :id="fieldData.name"
          type="checkbox"
          :name="fieldData.name"
          class="py-1.5 pr-3 pl-1 sm:text-sm/6"
        />
      </div>
      <button
        @click="removeField(fieldData.id)"
        class="border ml-1 h-7 w-7 rounded-lg text-red-500 border-red-200 hover:bg-red-100 cursor-pointer"
      >
        <i class="fas fa-trash text-xs"></i>
      </button>
    </div>
  </div>
</template>
<style scoped>
input:disabled {
  background-color: rgba(0, 0, 0, 0.1);
  outline: 0;
  padding-inline: 10px;
}
</style>
