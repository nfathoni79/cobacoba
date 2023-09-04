import { createWebHistory, createRouter } from 'vue-router'
import Home from '../views/Home.vue'
import Before from '../views/Before.vue'
import After from '../views/After.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/before',
    name: 'before',
    component: Before,
  },
  {
    path: '/after',
    name: 'after',
    component: After,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router