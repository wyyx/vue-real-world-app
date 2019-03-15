import { AuthState } from '.'
import { User } from '@/models/user.model'
import { saveToken, destroyToken } from '@/services/jwt.service'

export const SET_ERROR = 'set error'
export const SET_AUTH = 'set auth'
export const PURGE_AUTH = 'purge auth'

export const mutations = {
  [SET_ERROR](state: AuthState, error) {
    state.errors = error
  },
  [SET_AUTH](state: AuthState, user: User) {
    state.isAuthenticated = true
    state.user = user
    state.errors = {}
    saveToken(state.user.token)
  },
  [PURGE_AUTH](state: AuthState) {
    state.isAuthenticated = false
    state.user = null
    state.errors = null
    destroyToken()
  }
}
