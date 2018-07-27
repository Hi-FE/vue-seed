import { GetterTree } from 'vuex'
import State from './state'

export function isHelloWorld (state: State): boolean {
  return state.helloworld === 'hello world'
}

export default <GetterTree<State, any>> {
  isHelloWorld
}