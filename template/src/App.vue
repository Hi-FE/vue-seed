<template>
  <div id="app">
    <img src="./_images/logo.png">
    <p class="helloword">{{ $store.state.helloworld.helloworld }}</p>
    <router-view/>
  </div>
</template>

{{#typescript}}
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  created() {
    this.$store.dispatch('setHelloWorld', 'hello world')
  }
}
</script>
{{else}}
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
{{/typescript}}

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
