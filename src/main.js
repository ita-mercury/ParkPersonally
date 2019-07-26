import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'
import store from './store/index'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'

import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false

Vue.use(iView)
Vue.use(VueAxios, axios)

new Vue({
  store,
  axios,
  router: router,
  render: h => h(App)
}).$mount('#app')
