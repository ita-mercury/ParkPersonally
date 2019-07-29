import axios from './config'

export const test = () => axios.get('orders')
export const initParkingBoy = (managerId) => axios.get('/parking-boys?managerId=' + managerId)
export const getParkingLots = (managerId) => axios.get('/manager/' + managerId + '/parking-lots')
