import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/error-detail/:errorType',
    name: 'ErrorDetail',
    component: () => import( '../views/ErrorDetail.vue')
  },
  {
    path: '/scenario-detail',
    name: 'ScenarioDetail',
    component: () => import( '../views/ScenarioDetail.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
