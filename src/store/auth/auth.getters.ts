import { isAuthenticated, username } from './auth.paths'
import { AuthState } from './auth.module'

export const authGetters = {
  [isAuthenticated](state: AuthState, getters): boolean {
    return !!state.user
  },
  [username](state: AuthState, getters) {
    return state.user && state.user.username
  }
}
