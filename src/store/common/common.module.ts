import { commonActions } from './common.actions'
import { commonGetters } from './common.getters'
import { make } from 'vuex-pathify'
import { Profile } from '@/models/profile.model'

export interface CommonState {
  profile: Profile
}

export const initialCommonState: CommonState = {
  profile: { username: '', bio: '', following: false, image: '' }
}

const autoMutations = make.mutations(initialCommonState)
const autoGetters = make.getters(initialCommonState)

export const common = {
  namespaced: true,
  state: initialCommonState,
  actions: commonActions,
  mutations: { ...autoMutations },
  getters: { ...autoGetters, ...commonGetters }
}
