import axios from './config'

export const test = () => axios.get('orders')
export const initParkingBoy = (managerId) => axios.get('parking-boys?managerId=' + managerId)
