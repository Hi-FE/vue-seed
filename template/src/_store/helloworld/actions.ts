
import { ActionTree, ActionContext } from 'vuex'
import State from './state'

export function setHelloWorld(store: ActionContext<State, any>, hlw: string) {
  store.commit('setHelloWorld', hlw)
}

export default <ActionTree<State, any>> {
  setHelloWorld
}