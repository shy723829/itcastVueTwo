// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/css/index.css'
import moment from 'moment'
import axios from 'axios'
axios.defaults.baseURL='http://localhost:8888/api/private/v1/'
Vue.prototype.axios=axios

Vue.config.productionTip = false
Vue.filter('fmdate',(value,fmString)=>{
  return moment(value).format(fmString)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
