import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import elementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
import VueQuillEditor from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import echarts  from "echarts";
Vue.prototype.$echarts = echarts;
Vue.use(VueQuillEditor);
Vue.prototype.$axios = axios;
Vue.use(elementUI);
Vue.config.productionTip = false;
Array.prototype.notEmpty = function() {
  var arr = [];
  this.map(function(val) {
    if (val !== "" && val !== undefined) {
      arr.push(val);
    }
  });
  return arr;
};
Date.prototype.filterTime = function(time) {
  let date = new Date(parseInt(time));
  return (
    date.getFullYear() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getDate() +
    "/" +
    date.getHours() +
    ":" +
    date.getMinutes()
  );
};
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
