import { jwtService } from '@/services/jwt.service'
import { SET_AUTH, SET_ERROR, PURGE_AUTH } from './auth.mutations'
import { http, setOrUpdateHeader } from '@/services/http.service'
import { authService } from '@/services/auth.service'
import { router } from '@/router'

export const LOGIN = 'login'
export const LOGOUT = 'logout'
export const REGISTER = 'register'
export const CHECK_AUTH = 'check auth'
export const UPDATE_USER = 'update user'

export const actions = {
  [LOGIN](context, credentials) {
    authService
      .login(credentials)
      .then(response => {
        jwtService.saveToken(response.data.user.token)
        setOrUpdateHeader()

        context.commit(SET_AUTH, response.data.user)
      })
      .then(() => router.push({ name: 'home' }))
      .catch(error => {
        context.commit(SET_ERROR, ['Email or password is invalid'])
      })
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH)
  },
  [REGISTER](context, credentials) {
    return new Promise((resolve, reject) => {
      authService
        .login(credentials)
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
      authService
        .checkAuth()
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
