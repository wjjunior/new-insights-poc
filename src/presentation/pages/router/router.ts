import { createWebHistory, createRouter } from 'vue-router'
import { makeLogin } from '@/main/factories/pages'
import { store } from '@/presentation/store'
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
    component: makeLogin,
    meta: {
      allowAnonymous: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.allowAnonymous)) {
    if (store.getters.isAuthenticated) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
