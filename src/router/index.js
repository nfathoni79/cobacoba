import { createWebHistory, createRouter } from 'vue-router'
import Home from '../views/Home.vue'
import Before from '../views/Before.vue'
import After from '../views/After.vue'
import Tree from '../views/Tree.vue'
import Admin from '../views/Admin.vue'
import NotFound from '../views/NotFound.vue'

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
  {
    path: '/trees/:id',
    name: 'tree',
    component: Tree,
  },
  {
    path: '/admin/trees',
    name: 'admin',
    component: Admin,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router