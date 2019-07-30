import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/manager/Home'
import ParkingLot from './views/manager/ParkingLot'
import ParkingBoy from './views/manager/ParkingBoy'
import Employee from './views/manager/Employee'
import ParkingLotDashboard from './views/manager/ParkingLotDashboard'
import ParkingOrder from './views/manager/ParkingOrder'
import PublicConstants from './constants/public'
import AdminHome from './views/admin/Home'

Vue.use(Router)
Vue.prototype.PublicConstants = PublicConstants

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
    },
    {
      path: '/',
      name: '/adminHome',
      component: AdminHome,
      children: [
        { path: '/admin/parkingLot', name: 'parkingLotForAdmin', component: ParkingLot },
        { path: '/admin/parkingBoy', name: 'parkingBoyForAdmin', component: ParkingBoy },
        { path: '/admin/employee', name: 'employeeForAdmin', component: Employee },
        { path: '/admin/parkingLotDashboard', name: 'parkingLotDashboardForAdmin', component: ParkingLotDashboard },
        { path: '/admin/parkingOrder', name: 'parkingOrderForAdmin', component: ParkingOrder }
      ]
    }
  ]
})
