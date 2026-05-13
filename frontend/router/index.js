import { createWebHistory, createRouter } from "vue-router";
import FormBuilder from "../src/components/Builder/FormBuilder.vue";
import FormsList from "../src/components/FormsList.vue";
import FormRenderer from "../src/components/Renderer/FormRenderer.vue";

const routes = [
  { path: "/", component: FormsList },
  { path: "/builder", component: FormBuilder },
  { path: "/builder/edit/:id", component: FormBuilder },
  { path: "/renderer/:id", component: FormRenderer },
  { path: "/renderer", redirect: "/" },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
