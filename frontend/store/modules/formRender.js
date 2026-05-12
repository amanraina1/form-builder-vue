const state = {
  formFields: [],
};

const getters = {
  getFormRenderFields: (state) => {
    return state.formFields;
  },
};

const mutations = {
  setFormRenderFields: (state, payload) => {
    state.formFields = payload;
    console.log(state.formFields);
  },
};

export default { state, getters, mutations };
