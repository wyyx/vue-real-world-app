import { ArticleState } from './article.module'
import { Article } from '@/models/article.model'
import { ArticleQuery } from '@/models/article-query.model'

export const FETCH_USER_ARTICLES = 'FETCH_USER_ARTICLES'
export const FETCH_USER_ARTICLES_SUCCESS = 'FETCH_USER_ARTICLES_SUCCESS'
export const FETCH_USER_ARTICLES_FAIL = 'FETCH_USER_ARTICLES_FAIL'
export const FETCH_GLOBAL_ARTICLES = 'FETCH_GLOBAL_ARTICLES'
export const FETCH_GLOBAL_ARTICLES_SUCCESS = 'FETCH_GLOBAL_ARTICLES_SUCCESS'
export const FETCH_GLOBAL_ARTICLES_FAIL = 'FETCH_GLOBAL_ARTICLES_FAIL'
export const UPDATE_ARTICLE_QUERY = 'UPDATE_ARTICLE_QUERY'
export const FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS'
export const FETCH_TAGS_FAIL = 'FETCH_TAGS_FAIL'
export const UPDATE_QUERY_TAGS = 'UPDATE_QUERY_TAGS'
export const ADD_TAG = 'ADD_TAG'
export const REMOVE_TAG = 'REMOVE_TAG'

export const mutations = {
  [FETCH_USER_ARTICLES](state: ArticleState, articles) {
    state.userArticles = articles
    state.isLoading = true
  },
  [FETCH_USER_ARTICLES_SUCCESS](state: ArticleState, payload) {
    state.userArticles = payload.articles
    state.userArticlesCount = payload.articlesCount
    state.isLoading = false
  },
  [FETCH_USER_ARTICLES_FAIL](state: ArticleState) {
    state.errors.push('Load articles fail')
    state.isLoading = false
  },
  [FETCH_GLOBAL_ARTICLES](state: ArticleState, payload) {
    state.globalArticles = payload.articles
    state.globalArticlesCount = payload.articlesCount
    state.isLoading = true
  },
  [FETCH_GLOBAL_ARTICLES_SUCCESS](
    state: ArticleState,
    payload: { articles: Article[]; articlesCount: number }
  ) {
    state.globalArticles = payload.articles
    state.globalArticlesCount = payload.articlesCount
    state.isLoading = false
  },
  [FETCH_GLOBAL_ARTICLES_FAIL](state: ArticleState) {
    state.errors.push('Load articles fail')
    state.isLoading = false
  },
  [UPDATE_ARTICLE_QUERY](state: ArticleState, payload: Partial<ArticleQuery>) {
    state.articleQuery = { ...state.articleQuery, ...payload }
  },
  [UPDATE_QUERY_TAGS](state: ArticleState, payload: string[]) {
    state.articleQuery = { ...state.articleQuery, tags: payload }
  },
  [ADD_TAG](state: ArticleState, tag: string) {
    state.articleQuery = {
      ...state.articleQuery,
      tags: [...state.articleQuery.tags, tag]
    }
  },
  [REMOVE_TAG](state: ArticleState, tag: string) {
    state.articleQuery = {
      ...state.articleQuery,
      tags: state.articleQuery.tags.filter(t => t !== tag)
    }
  },
  [FETCH_TAGS_SUCCESS](state: ArticleState, payload: string[]) {
    state.tags = payload
  },
  [FETCH_TAGS_FAIL](state: ArticleState, payload: string[]) {}
}
