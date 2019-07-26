import { test } from '../api/index'

const actions = {
  async test ({ commit }) {
    commit('test', await test())
  }
}

export default actions
