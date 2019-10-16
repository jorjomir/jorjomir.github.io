import Vue from 'vue'
import axios from 'axios'
import Vuelidate from 'vuelidate'

import App from './App.vue'
import VueRouter from 'vue-router'
import { routes } from './routes'
import { auth, admin } from '@/services/authService'
import 'bootstrap' 
import moment from 'moment'
import animate from 'animate.css'

import 'bootstrap/dist/css/bootstrap.min.css'

Vue.use(VueRouter)
Vue.use(axios)
Vue.use(Vuelidate)
Vue.use(animate)
//Vue.use(axiosPlugin)
Vue.config.productionTip = false
Vue.mixin(auth)
Vue.mixin(admin)

const base = axios.create({
  baseURL: 'http://localhost:8000'
})

Vue.prototype.$http = base

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('HH:mm D-MM-Y')
  }
})
const vueRouter = new VueRouter({
  mode: 'history',
  routes
  });
  
  new Vue({
  el: '#app',
  router: vueRouter,
  render: h => h(App),
  });
