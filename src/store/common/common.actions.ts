import { profileService } from '@/services/profile.service'
import { profile } from './common.paths'

export const fetchProfileAction = 'fetchProfileAction'

export const commonActions = {
  [fetchProfileAction]({ commit }, username: string) {
    profileService
      .fetchProfile(username)
      .then(response => {
        commit(profile, response.data.profile)
      })
      .catch(error => {
        console.log('fetch profile failed', error)
      })
  }
}
