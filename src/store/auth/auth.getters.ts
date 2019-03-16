import { AuthState } from '.'

export const currentUser = 'currentUser'
export const isAuthenticated = 'isAuthenticated'
export const errors = 'errors'
export const userName = 'userName'
export const isLogging = 'isLogging'

export const authGetters = {
  [currentUser](state: AuthState) {
    return state.user
  },
  [isAuthenticated](state: AuthState) {
    return state.isAuthenticated
  },
  [errors](state: AuthState) {
    return state.errors
  },
  [userName](state: AuthState) {
    return state.user && state.user.username
  },
  [isLogging](state: AuthState) {
    return state.isLogging
  }
}
