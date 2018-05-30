import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { RootState } from '../index'

export interface HelloWorldState {
}

const init_state: HelloWorldState = {
}

const state: HelloWorldState = {
  ...init_state
}

const getters: GetterTree<HelloWorldState, RootState> = {}

const actions: ActionTree<HelloWorldState, RootState> = {}

const mutations: MutationTree<HelloWorldState> = {}

export default {
  state,
  getters,
  actions,
  mutations
}
