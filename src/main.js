import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";

import "./vendors/bootstrap.min.css";
import "./CSS/all.min.css";
import "./CSS/style.css";
const app = createApp(App);
app.use(store);
app.mount("#app");
