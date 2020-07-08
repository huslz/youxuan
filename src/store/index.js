import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    keepAliveList: []
  },
  mutations: {
    setKeepAliveList(state, list) {
      if (list) state.keepAliveList = [...list];
    }
  },
  actions: {

  },
  modules: {},
  getters: {
    keepAliveList: state => state.keepAliveList
  }
});
