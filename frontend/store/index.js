import { createStore } from "vuex";

import formBuilder from "./modules/formBuilder.js";
import alert from "./modules/alert.js";

const store = createStore({
  modules: {
    formBuilder,
    alert,
  },
});

export default store;
