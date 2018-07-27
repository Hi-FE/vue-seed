import Vue from 'vue'
import Vuex from 'vuex'
import helloworld from './helloworld'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    helloworld
  }
});

export default store
