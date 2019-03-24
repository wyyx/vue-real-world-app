import { router } from './router'
import store, { getGlobalPath } from '@/store'
import { errors } from '@/store/article/article.paths'
import { authModulePath } from '@/store/auth/auth.paths'

router.beforeEach((to, from, next) => {
  store.commit(getGlobalPath(authModulePath, errors), [])

  next()
})
