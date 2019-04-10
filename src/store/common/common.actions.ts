import { profileService } from '@/services/profile.service'
import { profile } from './common.paths'

export const fetchProfileAction = 'fetchProfileAction'
export const followAction = 'followAction'
export const unfollowAction = 'unfollowAction'

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
  },
  [followAction]({ commit }, username: string) {
    profileService
      .follow(username)
      .then(response => {
        commit(profile, response.data.profile)
      })
      .catch(error => {
        console.log('follow failed', error)
      })
  },
  [unfollowAction]({ commit }, username: string) {
    console.log('username', username)
    profileService
      .unfollow(username)
      .then(response => {
        commit(profile, response.data.profile)
      })
      .catch(error => {
        console.log('unfollow failed', error)
      })
  }
}
