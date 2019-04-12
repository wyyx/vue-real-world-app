import { authActions } from './auth.actions'
import { authGetters } from './auth.getters'
import { User } from '@/models/user.model'
import { make } from 'vuex-pathify'

export interface AuthState {
  authErrors: string[]
  user: User
  isLogging: boolean
  isRegistering: boolean
  isPending: boolean
}

const initialAuthState: AuthState = {
  authErrors: [],
  user: {
    id: null,
    email: '',
    username: '',
    bio: '',
    image: '',
    token: ''
  },
  isLogging: false,
  isRegistering: false,
  isPending: false
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
