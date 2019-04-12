import { actions } from './article.actions'
import { articleGetters } from './article.getters'
import { Article } from '@/models/article.model'
import { ArticleQuery } from '@/models/article-query.model'
import { make } from 'vuex-pathify'

export interface ArticleState {
  articles: Article[]
  articlesCount: 0
  errors: any[]
  isLoading: boolean
  articleQuery: ArticleQuery
  tags: string[]
  currentTags: string[]
  isPending: boolean
}

export const initialArticleState: ArticleState = {
  articles: [],
  articlesCount: 0,
  errors: [],
  isLoading: false,
  articleQuery: {
    offset: 0,
    limit: 10,
    tags: [],
    author: ''
  },
  tags: [],
  currentTags: [],
  isPending: false
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
