<template>
  <div id="app">
    <img src="./_images/logo.png">
    <p class="helloword">{{ $store.state.helloworld.helloworld }}</p>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {}
  },
  created() {
    this.$store.dispatch('setHelloWorld', 'hello world')
  }
};
</script>

<style lang="stylus">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  .helloword { color: color }
}
</style>
