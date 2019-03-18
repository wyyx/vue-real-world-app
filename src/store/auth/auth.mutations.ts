import { AuthState } from './auth.module'
import { User } from '@/models/user.model'

export const ADD_ERROR = 'ADD_ERROR'
export const SET_ERROR = 'SET_ERROR'
export const CLEAR_ERROR = 'CLEAR_ERROR'
export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const REGISTER = 'REGISTER'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAIL = 'REGISTER_FAIL'
export const LOGOUT = 'LOGOUT'
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
export const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL'

export const mutations = {
  [ADD_ERROR](state: AuthState, error) {
    state.errors.push(error)
  },
  [SET_ERROR](state: AuthState, errors) {
    state.errors = errors
  },
  [CLEAR_ERROR](state: AuthState) {
    state.errors = []
  },
  [LOGIN](state: AuthState) {
    state.isLogging = true
  },
  [LOGIN_SUCCESS](state: AuthState, user: User) {
    state.isAuthenticated = true
    state.user = user
    state.errors = []
    state.isLogging = false
  },
  [LOGIN_FAIL](state: AuthState, user: User) {
    state.isLogging = false
    state.errors.push('Email or password is invalid')
  },
  [LOGOUT](state: AuthState) {
    state.isAuthenticated = false
    state.user = null
    state.errors = []
    state.isLogging = false
  },
  [REGISTER](state: AuthState) {
    state.isRegistering = true
  },
  [REGISTER_SUCCESS](state: AuthState, user: User) {
    state.isAuthenticated = true
    state.user = user
    state.errors = []
    state.isLogging = false
  },
  [REGISTER_FAIL](state: AuthState) {
    state.errors = ['Email has already been taken']
    state.isRegistering = false
  },
  [UPDATE_USER_SUCCESS](state: AuthState, user: User) {
    state.user = user
  },
  [UPDATE_USER_FAIL](state: AuthState, user: User) {
    state.errors.push('Update user fail')
  }
}
