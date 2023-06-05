import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import eventBus from "./eventBus.js";

const app = createApp(App);

app.provide("eventBus", eventBus);
app.use(router);
app.mount("#app");
