<script setup>
import { computed, watch } from "vue";
import { useStore } from "vuex";
const store = useStore();

const alertMessage = computed(() => store.getters.getAlertMessage);
const alertType = computed(() => store.getters.getAlertType);

const classname = computed(() => {
  return "alert-" + alertType.value;
});

const bgClass = computed(() => {
  return alertType.value === "success" ? "bg-green-200" : "bg-red-200";
});

const dismiss = () => {
  store.commit("unsetAlert");
};

const shallDisplay = computed(() => alertType.value !== "");

watch(alertMessage, (newValue, oldValue) => {
  if (newValue !== "") {
    setTimeout(dismiss, 4000);
  }
});
</script>

<template>
  <div
    :class="{ visible: shallDisplay, invisible: !shallDisplay }"
    class="alert-container mb-2"
  >
    <div :class="['alert  rounded-lg', bgClass]">
      <div class="flex items-center justify-between px-2 py-2">
        <div class="flex items-center gap-2 alert-message">
          <i
            v-if="classname === 'alert-success'"
            class="fas fa-check-circle"
          ></i>
          <i v-if="classname === 'alert-danger'" class="fas fa-warning"></i>
          <p>{{ alertMessage }}</p>
        </div>
        <div class="cursor-pointer" @click="dismiss">
          <i class="fas fa-x text-gray-500 hover:text-gray-900 text-sm"></i>
        </div>
      </div>
    </div>
  </div>
</template>
