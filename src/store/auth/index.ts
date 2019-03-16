import { mutations } from './auth.mutations'
import { actions } from './auth.actions'
import { authGetters } from './auth.getters'
import { User } from '@/models/user.model'

export interface AuthState {
  errors: any[]
  user: User
  isAuthenticated: boolean
  isLogging: boolean
}

const initialState: AuthState = {
  errors: [],
  user: null,
  isAuthenticated: false,
  isLogging: false
}

export const auth = {
  state: initialState,
  mutations,
  actions,
  getters: authGetters
}
