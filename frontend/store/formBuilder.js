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
  removeField(state, id) {
    state.formFields = state.formFields.filter((field) => field.id !== id);

    // if the field we are removing is active, then we set null to active field
    if (state.activeField?.id === id) {
      state.activeField = {};
    }
  },
};

export default { state, getters, mutations };
