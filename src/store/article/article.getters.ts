import { ArticleState } from './article.module'

export const USER_ARTICLES = 'USER_ARTICLES'
export const GLOBAL_ARTICLES = 'GLOBAL_ARTICLES'
export const IS_LOADING = 'IS_LOADING'
export const USER_ARTICLES_COUNT = 'USER_ARTICLES_COUNT'
export const GLOBAL_ARTICLES_COUNT = 'GLOBAL_ARTICLES_COUNT'
export const ARTICLE_QUERY = 'ARTICLE_QUERY'
export const TAGS = 'TAGS'
export const SELECTED_TAGS = 'SELECTED_TAGS'
export const AUTHORS = 'AUTHORS'

export const getters = {
  [USER_ARTICLES](state: ArticleState) {
    return state.userArticles
  },
  [GLOBAL_ARTICLES](state: ArticleState) {
    return state.globalArticles
  },
  [IS_LOADING](state: ArticleState) {
    return state.isLoading
  },
  [USER_ARTICLES_COUNT](state: ArticleState) {
    return state.userArticlesCount
  },
  [GLOBAL_ARTICLES_COUNT](state: ArticleState) {
    return state.globalArticlesCount
  },
  [ARTICLE_QUERY](state: ArticleState) {
    return state.articleQuery
  },
  [TAGS](state: ArticleState) {
    return state.tags
  },
  [AUTHORS](state: ArticleState) {
    //
  },
  [SELECTED_TAGS](state: ArticleState) {
    state.articleQuery.tags
  }
}
