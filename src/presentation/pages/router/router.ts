import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'
import { makeLogin, makeHome } from '@/main/factories/pages'
import { store } from '@/presentation/store'
import { GetterTypes } from '@/presentation/store/modules'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: makeHome,
    meta: { requiresAuth: true }
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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters[GetterTypes.isAuthenticated as string]) {
      next()
      return
    }

    next('/login')
  } else {
    next()
  }
})

export default router
