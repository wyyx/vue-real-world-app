import { AuthState } from './auth.module'

export const CURRENT_USER = 'CURRENT_USER'
export const IS_AUTHENTICATED = 'IS_AUTHENTICATED'
export const ERRORS = 'ERRORS'
export const USER_NAME = 'USER_NAME'
export const IS_LOGGING = 'IS_LOGGING'
export const IS_REGISTERING = 'IS_REGISTERING'

export const getters = {
  [CURRENT_USER](state: AuthState) {
    return state.user
  },
  [IS_AUTHENTICATED](state: AuthState) {
    return state.isAuthenticated
  },
  [ERRORS](state: AuthState) {
    return state.errors
  },
  [USER_NAME](state: AuthState) {
    return state.user && state.user.username
  },
  [IS_LOGGING](state: AuthState) {
    return state.isLogging
  },
  [IS_REGISTERING](state: AuthState) {
    return state.isRegistering
  }
}
