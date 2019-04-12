import { User } from '@/models/user.model'
import { router } from '@/router/router'
import { authService } from '@/services/auth.service'
import { setOrUpdateHeader } from '@/services/http.service'
import { jwtService } from '@/services/jwt.service'
import {
  isLogging,
  user,
  authErrors,
  isRegistering,
  isPending
} from './auth.paths'

export const loginAction = 'loginAction'
export const loginSuccessAction = 'loginSuccessAction'
export const loginFailAction = 'loginFailAction'
export const logoutAction = 'logoutAction'
export const registerAction = 'registerAction'
export const registerSuccessAction = 'registerSuccessAction'
export const registerFailAction = 'registerFailAction'
export const checkAuthAction = 'checkAuthAction'
export const updateUserAction = 'updateUserAction'
export const updateUserSuccessAction = 'updateUserSuccessAction'
export const updateUserFailAction = 'updateUserFailAction'

export const authActions = {
  // login
  [loginAction]({ dispatch, commit }, credentials) {
    commit(isLogging, true)

    return new Promise((resolve, reject) => {
      authService
        .login(credentials)
        .then(response => {
          jwtService.saveToken(response.data.user.token)
          setOrUpdateHeader()

          dispatch(loginSuccessAction, response.data.user)
          resolve()
        })
        .catch(error => {
          dispatch(loginFailAction)

          reject()
        })
        .finally(() => commit(isLogging, false))
    })
  },
  [loginSuccessAction]({ dispatch, commit }, payload) {
    commit(user, payload)
    commit(authErrors, [])
  },
  [loginFailAction]({ dispatch, commit }) {
    commit(authErrors, ['Email or password is not wrong'])
  },
  // logout
  [logoutAction]({ dispatch, commit }) {
    jwtService.destroyToken()
    commit(user, null)
  },
  // register
  [registerAction]({ dispatch, commit }, credentials) {
    commit(isRegistering, true)
    authService
      .register(credentials)
      .then(({ data }) => {
        dispatch(registerSuccessAction, data.user)
      })
      .then(() => router.push({ name: 'home' }))
      .catch(({ response }) => {
        dispatch(registerFailAction)
      })
      .finally(() => commit(isRegistering, false))
  },
  [registerSuccessAction]({ dispatch, commit }, credentials) {
    commit(isRegistering, true)
    authService
      .register(credentials)
      .then(({ data }) => {
        dispatch(registerSuccessAction, data.user)
      })
      .then(() => router.push({ name: 'home' }))
      .catch(({ response }) => {
        dispatch(registerFailAction)
      })
      .finally(() => commit(isRegistering, false))
  },
  [registerFailAction]({ dispatch, commit }) {
    commit(authErrors, ['Email has been taken'])
  },
  // check auth
  [checkAuthAction]({ dispatch, commit }) {
    if (jwtService.getToken()) {
      authService
        .checkAuth()
        .then(({ data }) => {
          dispatch(loginSuccessAction, data.user)
        })
        .catch(({ response }) => {
          dispatch(loginFailAction)
        })
    } else {
      dispatch(logoutAction)
    }
  },
  // update user
  [updateUserAction]({ dispatch, commit }, user: User) {
    commit(isPending, true)

    return new Promise((resolve, reject) => {
      authService
        .updateUser(user)
        .then(({ data }) => {
          dispatch(updateUserSuccessAction, data.user)
          resolve()
        })
        .catch(err => {
          dispatch(updateUserFailAction)
          reject()
        })
        .finally(() => commit(isPending, false))
    })
  },
  [updateUserSuccessAction]({ dispatch, commit }, payload) {
    commit(user, payload)
  },
  [updateUserFailAction]({ dispatch, commit }) {}
}
