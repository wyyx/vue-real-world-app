import { User } from '@/models/user.model'
import { router } from '@/router/router'
import { authService } from '@/services/auth.service'
import { setOrUpdateHeader } from '@/services/http.service'
import { jwtService } from '@/services/jwt.service'
import {
  ADD_ERROR,
  LOGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS
} from './auth.mutations'

export const LOGIN_ACTION = 'LOGIN_ACTION'
export const LOGOUT_ACTION = 'LOGOUT_ACTION'
export const REGISTER_ACTION = 'REGISTER_ACTION'
export const CHECK_AUTH_ACTION = 'CHECK_AUTH_ACTION'
export const UPDATE_USER_ACTION = 'UPDATE_USER_ACTION'

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
        context.commit(LOGIN_FAIL)
      })
  },
  [LOGOUT_ACTION](context) {
    jwtService.destroyToken()
    context.commit(LOGOUT)
  },
  [REGISTER_ACTION](context, credentials) {
    context.commit(REGISTER)
    authService
      .register(credentials)
      .then(({ data }) => {
        context.commit(REGISTER_SUCCESS, data.user)
      })
      .then(() => router.push({ name: 'home' }))
      .catch(({ response }) => {
        context.commit(REGISTER_FAIL)
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
  [UPDATE_USER_ACTION](context, user: User) {
    authService
      .updateUser(user)
      .then(({ data }) => {
        context.commit(UPDATE_USER_SUCCESS, data.user)
        return data
      })
      .catch(err => {
        context.commit(UPDATE_USER_FAIL)
      })
  }
}
