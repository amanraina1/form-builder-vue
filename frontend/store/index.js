import { createStore } from "vuex";

import formBuilder from "./formBuilder";

const store = createStore({
  modules: {
    formBuilder,
  },
});

export default store;
