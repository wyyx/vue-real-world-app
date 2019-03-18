import { mutations } from './profile.mutations'
import { actions } from './profile.actions'
import { getters } from './profile.getters'

export const profile = {
  state: {
    profile: null
  },
  mutations,
  actions,
  getters
}
