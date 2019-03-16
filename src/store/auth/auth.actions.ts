import { jwtService } from '@/services/jwt.service'
import { LOGIN_SUCCESS, ADD_ERROR, LOGOUT, LOGIN } from './auth.mutations'
import { http, setOrUpdateHeader } from '@/services/http.service'
import { authService } from '@/services/auth.service'
import { router } from '@/router'

export const LOGIN_ACTION = 'login action'
export const LOGOUT_ACTION = 'logout action'
export const REGISTER_ACTION = 'register action'
export const CHECK_AUTH_ACTION = 'check auth action'
export const UPDATE_USER_ACTION = 'update user action'

export const actions = {
  [LOGIN_ACTION](context, credentials) {
    context.commit(LOGIN)
    authService
      .login(credentials)
      .then(response => {
        jwtService.saveToken(response.data.user.token)
        setOrUpdateHeader()

        context.commit(LOGIN_SUCCESS, response.data.user)
      })
      .then(() => router.push({ name: 'home' }))
      .catch(error => {
        context.commit(ADD_ERROR, ['Email or password is invalid'])
      })
  },
  [LOGOUT_ACTION](context) {
    jwtService.destroyToken()
    context.commit(LOGOUT)
  },
  [REGISTER_ACTION](context, credentials) {
    return new Promise((resolve, reject) => {
      authService
        .login(credentials)
        .then(({ data }) => {
          context.commit(LOGIN_SUCCESS, data.user)
          resolve(data)
        })
        .catch(({ response }) => {
          context.commit(ADD_ERROR, response.data.errors)
          reject(response)
        })
    })
  },
  [CHECK_AUTH_ACTION](context) {
    if (jwtService.getToken()) {
      authService
        .checkAuth()
        .then(({ data }) => {
          context.commit(LOGIN_SUCCESS, data.user)
        })
        .catch(({ response }) => {
          context.commit(ADD_ERROR, response.data.errors)
        })
    } else {
      context.commit(LOGOUT)
    }
  },
  [UPDATE_USER_ACTION](context, payload) {
    const { email, username, password, image, bio } = payload

    const user = {
      email,
      username,
      password,
      bio,
      image
    }

    return http.put('user', user).then(({ data }) => {
      context.commit(LOGIN_SUCCESS, data.user)
      return data
    })
  }
}
