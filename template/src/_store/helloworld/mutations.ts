import { Mutation, MutationTree } from 'vuex'
import State from './state'

export function setHelloWorld(state: State, hlw: string) {
  state.helloworld = hlw
}

export default <MutationTree<State>> {
  setHelloWorld
}
