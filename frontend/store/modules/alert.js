const state = {
  message: "",
  type: "", // "success" | "danger" | "info" | "warning"
};

const getters = {
  getAlertMessage: (state) => state.message,
  getAlertType: (state) => state.type,
};

const mutations = {
  setAlert(state, payload) {
    state.type = payload.type;
    state.message = payload.message;
  },

  unsetAlert(state, payload) {
    state.message = "";
    state.type = "";
  },
};

export default { state, getters, mutations };
