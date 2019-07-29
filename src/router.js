import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import ParkingLot from './views/ParkingLot'
import ParkingBoy from './views/ParkingBoy'
Vue.use(Router)

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
        { path: '/parkingBoy', name: 'parkingBoy', component: ParkingBoy }
      ]
    }
  ]
})
