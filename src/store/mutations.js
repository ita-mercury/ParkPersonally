const mutations = {
  test (state, payload) {
  },
  getParkingLots (state, parkingLots) {
    state.parkingLots = parkingLots.data
  }
}

export default mutations
