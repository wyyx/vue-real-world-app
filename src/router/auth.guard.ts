import store from '@/store'
import { isAuthenticated, authModulePath } from '@/store/auth/auth.paths'
import { router } from './router'

export function authGuard(to, from, next) {
  const isLoggedIn = store.getters[authModulePath + isAuthenticated]
  console.log('isLoggedIn', isLoggedIn)

  if (!isLoggedIn) {
    router.push({
      name: 'login',
      query: {
        targetUrl: to.path
      }
    })
  }

  next()
}
