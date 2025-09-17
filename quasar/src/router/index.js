// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from 'boot/firebase' // Importação correta

const router = createRouter({
  routes,
  history: createWebHistory(),
})

let isAuthListenerReady = false

router.beforeEach(async (to, from, next) => {
  if (!isAuthListenerReady) {
    onAuthStateChanged(auth, () => {
      isAuthListenerReady = true
      next({ ...to, replace: true })
    })
    return
  }

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const isAuthenticated = !!auth.currentUser

  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
