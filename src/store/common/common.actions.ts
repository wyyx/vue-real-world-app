import { profileService } from '@/services/profile.service'
import { profile } from './common.paths'
import { commentService } from '@/services/comment.service'

export const fetchProfileAction = 'fetchProfileAction'
export const followAction = 'followAction'
export const unfollowAction = 'unfollowAction'
export const postCommentAction = 'postCommentAction'
export const deleteCommentAction = 'deleteCommentAction'

export const commonActions = {
  [fetchProfileAction]({ commit }, username: string) {
    profileService
      .fetchProfile(username)
      .then(response => {
        commit(profile, response.data.profile)
        console.log('response.data.profile', response.data.profile)
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
  },
  [postCommentAction]({ commit }, payload: { slug: string; comment: string }) {
    return new Promise((resolve, reject) => {
      commentService
        .post(payload.slug, payload.comment)
        .then(response => {
          resolve()
        })
        .catch(error => {
          reject()
          console.log('post comment failed', error)
        })
    })
  },
  [deleteCommentAction](
    { commit },
    payload: { slug: string; commentId: string }
  ) {
    return new Promise((resolve, reject) => {
      commentService
        .delete(payload.slug, payload.commentId)
        .then(response => {
          resolve()
        })
        .catch(error => {
          reject()
          console.log('delete comment failed', error)
        })
    })
  }
}
