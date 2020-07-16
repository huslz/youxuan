import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    keepAliveList: [],
    showLoading: true
  },
  mutations: {
    setKeepAliveList(state, list) {
      if (list) state.keepAliveList = [...list];
    },
    setLoadingStatus(state, status) {
      state.showLoading = status;
    }
  },
  actions: {},
  modules: {},
  getters: {
    keepAliveList: state => state.keepAliveList,
    showLoading: state => state.showLoading
  }
});
