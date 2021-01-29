import { createWebHistory, createRouter } from 'vue-router'
import Login from '@/presentation/pages/login/login.vue'
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
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
