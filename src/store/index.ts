import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from './auth/auth.module'
import { profile } from './profile/profile.module'
import { article } from './article/article.module'
import { cloneDeep } from 'lodash'

Vue.use(Vuex)

export const RESET_STORE = 'reset_store'

export default new Vuex.Store({
  modules: {
    auth,
    profile,
    article
  },
  mutations: {
    [RESET_STORE](state: any) {
      const initialState = JSON.parse(localStorage.getItem('initialState'))

      // console.log('initialState', JSON.stringify(initialState))
      // console.log('before', JSON.stringify(state))
      Object.assign(state, initialState)
      // console.log('after', JSON.stringify(state))
      // console.log('after obj', state)
    }
  }
})
