import { articleService } from '@/services/article.service'
import {
  FETCH_USER_ARTICLES_SUCCESS,
  FETCH_USER_ARTICLES_FAIL,
  FETCH_GLOBAL_ARTICLES_SUCCESS,
  FETCH_GLOBAL_ARTICLES_FAIL,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_FAIL
} from './article.mutations'
import { tagService } from '@/services/tag.service'

export const FETCH_GLOBAL_ARTICLES_ACTION = 'FETCH_GLOBAL_ARTICLES_ACTION'
export const FETCH_USER_ARTICLES_ACTION = 'FETCH_USER_ARTICLES_ACTION'
export const FETCH_TAGS_ACTION = 'FETCH_TAGS_ACTION'

export const actions = {
  [FETCH_USER_ARTICLES_ACTION]({ commit }, params) {
    articleService
      .getUserArticles(params)
      .then(response => {
        commit(FETCH_USER_ARTICLES_SUCCESS, {
          articles: response.data.articles,
          articlesCount: response.data.articlesCount
        })
      })
      .catch(error => {
        commit(FETCH_USER_ARTICLES_FAIL)
      })
  },
  [FETCH_GLOBAL_ARTICLES_ACTION]({ commit }, params) {
    articleService
      .getGlobalArticles(params)
      .then(response => {
        commit(FETCH_GLOBAL_ARTICLES_SUCCESS, {
          articles: response.data.articles,
          articlesCount: response.data.articlesCount
        })
      })
      .catch(error => {
        commit(FETCH_GLOBAL_ARTICLES_FAIL)
      })
  },
  [FETCH_TAGS_ACTION]({ commit }, params) {
    tagService
      .get()
      .then(response => {
        commit(FETCH_TAGS_SUCCESS, response.data.tags)
      })
      .catch(error => {
        commit(FETCH_TAGS_FAIL)
      })
  }
}
