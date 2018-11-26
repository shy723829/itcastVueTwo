import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/users.vue'
Vue.use(Router)
Vue.use(ElementUI)
export default new Router({
  routes: [
    {
      name:'login',
      path:'/login',
      component:Login
    },{
      name:'home',
      path:'/home',
      component:Home,
      children:[{
        name:'users',
        path:'/users',
        component:Users
      }]
    }
  ]
})
