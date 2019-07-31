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
import AdminEmployee from './views/admin/Employee'
import AdminParkingBoy from './views/admin/ParkingBoy'
import AdminParkingLot from './views/admin/ParkingLot'
import AdminParkingLotDashboard from './views/admin/ParkingLotDashboard'
import AdminParkingOrder from './views/admin/ParkingOrder'
import Login from './views/Login'

Vue.use(Router)
Vue.prototype.PublicConstants = PublicConstants

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
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
      path: '/adminHome',
      name: '/adminHome',
      component: AdminHome,
      children: [
        { path: '/adminParkingLot', name: 'adminParkingLot', component: AdminParkingLot },
        { path: '/adminParkingBoy', name: 'adminParkingBoy', component: AdminParkingBoy },
        { path: '/adminEmployee', name: 'adminEmployee', component: AdminEmployee },
        { path: '/adminParkingLotDashboard', name: 'adminParkingLotDashboard', component: AdminParkingLotDashboard },
        { path: '/adminParkingOrder', name: 'adminParkingOrder', component: AdminParkingOrder }
      ],
      redirect: '/adminEmployee'
    }
  ]
})
