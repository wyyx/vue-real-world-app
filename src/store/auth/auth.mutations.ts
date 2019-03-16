import { AuthState } from '.'
import { User } from '@/models/user.model'

export const ADD_ERROR = 'add error mutation'
export const LOGIN = 'login mutation'
export const LOGIN_SUCCESS = 'login success mutation'
export const LOGIN_FAIL = 'login fail mutation'
export const LOGOUT = 'logout mutation'

export const mutations = {
  [ADD_ERROR](state: AuthState, error) {
    state.errors.push(error)
  },
  [LOGIN](state: AuthState) {
    state.isLogging = true
  },
  [LOGIN_SUCCESS](state: AuthState, user: User) {
    state.isAuthenticated = true
    state.user = user
    state.errors = []
    state.isLogging = false
  },
  [LOGIN_FAIL](state: AuthState, user: User) {
    state.isLogging = false
  },
  [LOGOUT](state: AuthState) {
    state.isAuthenticated = false
    state.user = null
    state.errors = []
    state.isLogging = false
  }
}
