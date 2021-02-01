import { createWebHistory, createRouter } from 'vue-router'
import { makeLogin } from '@/main/factories/pages'
import App from '@/main/App.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: App
  },
  {
    path: '/login',
    name: 'Login',
    component: makeLogin
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
