import jwtService from '@/services/jwt.service'
import { SET_AUTH, SET_ERROR, PURGE_AUTH } from './auth.mutations'
import { http } from '@/services/api.service'

export const LOGIN = 'login'
export const LOGOUT = 'logout'
export const REGISTER = 'register'
export const CHECK_AUTH = 'check auth'
export const UPDATE_USER = 'update user'

export const actions = {
  [LOGIN](context, credentials) {
    return new Promise(resolve => {
      http
        .post('users/login', { user: credentials })
        .then(({ data }) => {
          context.commit(SET_AUTH, data.user)
          resolve(data)
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors)
        })
    })
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH)
  },
  [REGISTER](context, credentials) {
    return new Promise((resolve, reject) => {
      http
        .post('users', { user: credentials })
        .then(({ data }) => {
          context.commit(SET_AUTH, data.user)
          resolve(data)
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors)
          reject(response)
        })
    })
  },
  [CHECK_AUTH](context) {
    if (jwtService.getToken()) {
      http
        .get('user')
        .then(({ data }) => {
          context.commit(SET_AUTH, data.user)
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors)
        })
    } else {
      context.commit(PURGE_AUTH)
    }
  },
  [UPDATE_USER](context, payload) {
    const { email, username, password, image, bio } = payload

    const user = {
      email,
      username,
      password,
      bio,
      image
    }

    return http.put('user', user).then(({ data }) => {
      context.commit(SET_AUTH, data.user)
      return data
    })
  }
}
