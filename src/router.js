import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import ParkingLot from './views/ParkingLot'
import ParkingBoy from './views/ParkingBoy'
import Employee from './views/Employee'
import ParkingLotDashboard from './views/ParkingLotDashboard'
import ParkingOrder from './views/ParkingOrder'
import PublicContants from './constants/public'

Vue.use(Router)
Vue.prototype.PublicContants = PublicContants

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        { path: '/parkingLot', name: 'parkingLot', component: ParkingLot },
        { path: '/parkingBoy', name: 'parkingBoy', component: ParkingBoy },
        { path: '/employee', name: 'employee', component: Employee },
        { path: '/parkingLotDashboard', name: 'parkingLotDashboard', component: ParkingLotDashboard },
        { path: '/parkingOrder', name: 'parkingOrder', component: ParkingOrder }
      ]
    }
  ]
})
