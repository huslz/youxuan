<template>
  <div id="app">
    <loading v-if="showLoading"></loading>
    <router-view />
  </div>
</template>
<script>
import loading from "./components/loading";
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  watch: {
  },
  created() {
    document.body.removeChild(document.getElementById("load-container"));
  },
  components: {
    loading
  },
  computed: {
    ...mapGetters(["showLoading"])
  }
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html {
  height: 100%;
  overflow: hidden;
}
body {
  height: 100%;
  overflow: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
