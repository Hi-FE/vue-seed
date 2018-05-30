import { ActionTree } from 'vuex'
import { RootState } from './index'
import * as TYPES from './types'

const actions: ActionTree<RootState, any> = {
  setName ({ state, commit }, name) {
    commit(TYPES.SET_NAME, name)
  }
}

export default actions
