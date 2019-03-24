import { authActions } from './auth.actions'
import { authGetters } from './auth.getters'
import { User } from '@/models/user.model'
import { make } from 'vuex-pathify'

export interface AuthState {
  errors: string[]
  user: User
  isLogging: boolean
  isRegistering: boolean
}

const initialAuthState: AuthState = {
  errors: [],
  user: null,
  isLogging: false,
  isRegistering: false
}

const autoMutations = make.mutations(initialAuthState)
const autoGetters = make.getters(initialAuthState)

export const auth = {
  namespaced: true,
  state: initialAuthState,
  mutations: { ...autoMutations },
  actions: authActions,
  getters: { ...autoGetters, ...authGetters }
}
