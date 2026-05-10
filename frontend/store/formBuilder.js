const state = {
  formFields: [],
  activeField: {},
};

const getters = {
  getFormFields(state) {
    return state.formFields;
  },
  getActiveField(state) {
    return state.activeField;
  },
};

const mutations = {
  updateFormDetails(state, data) {
    state.formFields = data;
  },
  addActiveField(state, data) {
    state.activeField = data;
  },
};

export default { state, getters, mutations };
