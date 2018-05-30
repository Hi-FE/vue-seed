import { MutationTree } from 'vuex'
import { RootState } from './index'
import * as TYPES from './types'

// root mutations
const mutations: MutationTree<RootState> = {
  [TYPES.SET_NAME] (state, name) {
    state.name = name
  }
}

export default mutations
