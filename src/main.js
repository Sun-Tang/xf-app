import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./utils/vant";
import "lib-flexible/flexible";
import api from "@/api";

Vue.prototype.$api = api;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");