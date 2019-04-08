import Vue from 'vue'
import Vuex from 'vuex'
import pathify from './pathify'
import { auth } from './auth/auth.module'
import { common } from './common/common.module'
import { article } from './article/article.module'

Vue.use(Vuex)

export const resetStore = 'resetStore'

export default new Vuex.Store({
  plugins: [pathify.plugin],
  modules: {
    auth,
    common,
    article
  },
  mutations: {
    [resetStore](state: any) {
      const initialState = JSON.parse(localStorage.getItem('initialState'))
      Object.assign(state, initialState)
    }
  }
})

// get global path
export function getGlobalPath(modulePath: string, localPath: string) {
  return modulePath + localPath
}
