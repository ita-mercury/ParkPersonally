import axios from './config'

export const test = () => axios.get('orders')
export const getParkingLots = (managerId) => axios.get('/manager/' + managerId + '/parking-lots')
