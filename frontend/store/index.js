import { createStore } from "vuex";

import formBuilder from "./modules/formBuilder.js";
import formRender from "./modules/formRender.js";
import alert from "./modules/alert.js";

const store = createStore({
  modules: {
    formBuilder,
    formRender,
    alert,
  },
});

export default store;
