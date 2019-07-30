const mutations = {
  test (state, payload) {
  },
  getParkingLots (state, parkingLots) {
    state.parkingLots = parkingLots.data
  },
  getParkingBoys (state, parkingBoys) {
    state.parkingBoys = parkingBoys.data
  },
  freezeParkingBoy (state, index) {
    state.parkingBoys[index].status = 0
  },
  unFreezeParkingBoy (state, index) {
    state.parkingBoys[index].status = 1
  },
  getTags (state, tags) {
    state.AllTags = tags.data
  }
}

export default mutations
