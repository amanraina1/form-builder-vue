const state = {
  formFields: [],
  fieldValues: {},
};

const getters = {
  getFormRenderFields: (state) => {
    return state.formFields;
  },

  getFieldValues: (state) => {
    return state.fieldValues;
  },
};

const mutations = {
  setFormRenderFields: (state, payload) => {
    state.formFields = payload;
  },

  setFieldValues: (state, payload) => {
    const { name, value } = payload;
    state.fieldValues[name] = value;
  },
  destroyFormRendered: (state, payload) => {
    state.formFields = [];
    state.fieldValues = {};
  },
};

export default { state, getters, mutations };
