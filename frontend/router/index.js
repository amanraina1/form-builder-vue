import { createWebHistory, createRouter } from "vue-router";
import FormBuilder from "../src/components/Builder/FormBuilder.vue";
import FormsList from "../src/components/FormsList.vue";

const routes = [
  { path: "/", component: FormsList },
  { path: "/builder", component: FormBuilder },
  //   { path: "/renderer", component: FormRenderer },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
