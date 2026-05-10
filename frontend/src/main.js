import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import axios from "axios";
import store from "../store";

axios.defaults.baseURL = "http://localhost:4000";

const app = createApp(App);
app.use(store);
app.mount("#app");
