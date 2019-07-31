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
  getTags (state, tags) {
    state.AllTags = tags.data
  },
  unFreezeParkingBoy (state, payload) {
    state.parkingBoys[payload.index].status = payload.status
  },
  createParkingLot (state, parkingLot) {
    state.parkingLots.push(parkingLot.data)
  }
}

export default mutations
