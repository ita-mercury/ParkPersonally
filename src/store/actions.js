import {getParkingLots, test} from '../api/index'

const actions = {
  async test ({ commit }) {
    commit('test', await test())
  },
  async getParkingLot ({ commit }, managerId) {
    commit('getParkingLots', await getParkingLots(managerId))
  }
}

export default actions
