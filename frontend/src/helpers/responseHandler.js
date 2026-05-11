import store from "../../store";

export const successHandler = (message) => {
  store.commit("setAlert", { type: "success", message });
};
export const errorHandler = (message) => {
  store.commit("setAlert", { type: "danger", message });
};
