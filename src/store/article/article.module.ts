import { actions } from './article.actions'
import { articleGetters } from './article.getters'
import { Article } from '@/models/article.model'
import { ArticleQuery } from '@/models/article-query.model'
import { make } from 'vuex-pathify'

export interface ArticleState {
  userArticles: Article[]
  userArticlesCount: number
  globalArticles: Article[]
  globalArticlesCount: number
  favoriteArticles: []
  favoriteArticlesCount: number
  errors: any[]
  isLoading: boolean
  articleQuery: ArticleQuery
  tags: string[]
}

export const initialArticleState: ArticleState = {
  userArticles: [],
  userArticlesCount: 0,
  globalArticles: [],
  globalArticlesCount: 0,
  favoriteArticles: [],
  favoriteArticlesCount: 0,
  errors: [],
  isLoading: false,
  articleQuery: {
    offset: 0,
    limit: 10,
    tags: [],
    author: '',
    favorited: ''
  },
  tags: []
}

const autoMutations = make.mutations(initialArticleState)
const autoGetters = make.getters(initialArticleState)

export const article = {
  namespaced: true,
  state: initialArticleState,
  mutations: { ...autoMutations },
  actions,
  getters: { ...autoGetters, ...articleGetters }
}
