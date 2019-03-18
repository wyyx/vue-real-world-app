import { router } from './router'
import { CLEAR_ERROR } from '@/store/auth/auth.mutations'
import store from '@/store'

router.beforeEach((to, from, next) => {
  store.commit(CLEAR_ERROR)

  next()
})
