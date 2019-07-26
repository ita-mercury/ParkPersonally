import axios from './config'

export const test = () => axios.get('orders')
