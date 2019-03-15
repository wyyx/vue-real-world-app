import { AuthState } from '.'

export const getters = {
  currentUser(state: AuthState) {
    return state.user
  },
  isAuthenticated(state: AuthState) {
    return state.isAuthenticated
  }
}
