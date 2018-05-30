<template>
  <div id="app">
    <h3 v-if="ready">Welcome use <span v-text="app_name"></span> template</h3>
    <router-view />
  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { Action, State } from 'vuex-class'

@Component({})
export default class App extends Vue {
  ready = false

  @State(state => state.name) app_name

  @Action('setName') actionSetName

  created () {
    this.actionSetName('Typescript')
    this.ready = true
  }
}
</script>

<style lang="stylus">
@import './styles/core';

body {
  font-family: PingFangSC-Regular, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", SimSun, sans-serif;
}

#app {
  text-align: center;
  color: #2c3e50;
  font-size: 24px;
  height: 100vh;
  flex-center(column);
  color: _main;

  h3 {
    margin-bottom: 20px;
  }
}
</style>
