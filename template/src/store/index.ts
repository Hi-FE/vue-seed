import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import rootActions from './actions'
import rootGetters from './getters'
import rootMutations from './mutations'

import helloworld from './modules/helloworld'

Vue.use(Vuex)

export interface RootState {
  name: string
}

const rootState: RootState = {
  name: ''
}

const debug = process.env.NODE_ENV === 'development'

const store = new Vuex.Store({
  state: rootState,
  actions: rootActions,
  getters: rootGetters,
  mutations: rootMutations,
  modules: {
    helloworld
  },
  strict: debug,
  plugins: debug ? [createLogger({ collapsed: true })] : []
})

if (module.hot) {
  module.hot.accept([
    './actions',
    './mutations',
    './modules/helloworld'
  ], () => {
    store.hotUpdate({
      actions: (require('./actions') as any).default,
      mutations: (require('./mutations') as any).default,
      modules: {
        helloworld: (require('./modules/helloworld') as any).default
      },
    })
  })
}

export default store
