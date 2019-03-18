import { mutations } from './article.mutations'
import { actions } from './article.actions'
import { getters } from './article.getters'
import { Article } from '@/models/article.model'
import { ArticleQuery } from '@/models/article-query.model'

export interface ArticleState {
  userArticles: Article[]
  globalArticles: Article[]
  userArticlesCount: number
  globalArticlesCount: number
  errors: any[]
  isLoading: boolean
  articleQuery: ArticleQuery
  tags: string[]
}

const initialState: ArticleState = {
  userArticles: [],
  globalArticles: [],
  errors: [],
  isLoading: false,
  userArticlesCount: 0,
  globalArticlesCount: 0,
  articleQuery: {
    offset: 0,
    limit: 10,
    tags: []
  },
  tags: []
}

export const article = {
  state: initialState,
  mutations,
  actions,
  getters
}
