import { articleService } from '@/services/article.service'
import { tagService } from '@/services/tag.service'
import { Article } from '@/models/article.model'
import {
  isLoading,
  globalArticles,
  globalArticlesCount,
  userArticles,
  userArticlesCount,
  favoriteArticles,
  favoriteArticlesCount,
  articleQuery,
  tags
} from './article.paths'

// fetch global articles
export const fetchGlobalArticlesAction = 'fetchGlobalArticlesAction'
export const fetchGlobalArticlesSuccessAction =
  'fetchGlobalArticlesSuccessAction'
export const fetchGlobalArticlesFailAction = 'fetchGlobalArticlesFailAction'
// fetch user articles
export const fetchUserArticlesAction = 'fetchUserArticlesAction'
export const fetchUserArticlesSuccessAction = 'fetchUserArticlesSuccessAction'
export const fetchUserArticlesFailAction = 'fetchUserArticlesFailAction'
// fetch favorite articles
export const fetchFavoriteArticlesAction = 'fetchFavoriteArticlesAction'
export const fetchFavoriteArticlesSuccessAction =
  'fetchFavoriteArticlesSuccessAction'
export const fetchFavoriteArticlesFailAction = 'fetchFavoriteArticlesFailAction'
// fetch tags
export const fetchTagsAction = 'fetchTagsAction'
export const fetchTagsSuccessAction = 'fetchTagsSuccessAction'
export const fetchTagsFailAction = 'fetchTagsFailAction'
// update article query
export const updateArticleQueryAction = 'updateArticleQueryAction'
// create article
export const createArticleAction = 'createArticleAction'
export const createArticleSuccessAction = 'createArticleSuccessAction'
export const createArticleFailAction = 'createArticleFailAction'

export const actions = {
  // fetch global articles
  [fetchGlobalArticlesAction]({ dispatch, commit }, params) {
    commit(isLoading, true)

    articleService
      .getGlobalArticles(params)
      .then(response => {
        dispatch(fetchGlobalArticlesSuccessAction, {
          articles: response.data.articles,
          articlesCount: response.data.articlesCount
        })
      })
      .catch(error => {
        dispatch(fetchGlobalArticlesFailAction)
      })
      .finally(() => commit(isLoading, false))
  },
  [fetchGlobalArticlesSuccessAction](
    { dispatch, commit },
    { articles, articlesCount }
  ) {
    commit(globalArticles, articles)
    commit(globalArticlesCount, articlesCount)
  },

  [fetchGlobalArticlesFailAction]({ dispatch, commit }) {},
  // fetch user articles
  [fetchUserArticlesAction]({ dispatch, commit }, params) {
    commit(isLoading, true)

    articleService
      .getUserArticles(params)
      .then(response => {
        dispatch(fetchUserArticlesSuccessAction, {
          articles: response.data.articles,
          articlesCount: response.data.articlesCount
        })
      })
      .catch(error => {
        dispatch(fetchUserArticlesFailAction)
      })
      .finally(() => commit(isLoading, false))
  },
  [fetchUserArticlesSuccessAction](
    { dispatch, commit },
    { articles, articlesCount }
  ) {
    commit(userArticles, articles)
    commit(userArticlesCount, articlesCount)
  },
  [fetchUserArticlesFailAction]({ commit }) {},
  // fetch favorite articles
  [fetchFavoriteArticlesAction]({ dispatch, commit }, params) {
    commit(isLoading, true)

    articleService
      .getFavoriteArticles(params)
      .then(response => {
        dispatch(fetchFavoriteArticlesSuccessAction, {
          articles: response.data.articles,
          articlesCount: response.data.articlesCount
        })
      })
      .catch(error => {
        dispatch(fetchFavoriteArticlesFailAction)
      })
      .finally(() => commit(isLoading, false))
  },
  [fetchFavoriteArticlesSuccessAction](
    { dispatch, commit },
    { articles, articlesCount }
  ) {
    commit(favoriteArticles, articles)
    commit(favoriteArticlesCount, articlesCount)
  },
  [fetchFavoriteArticlesFailAction]({ commit }) {},
  // fetch tags
  [fetchTagsAction]({ dispatch }) {
    tagService
      .get()
      .then(response => {
        dispatch(fetchTagsSuccessAction, response.data.tags)
      })
      .catch(error => {
        dispatch(fetchTagsFailAction)
      })
  },
  [fetchTagsSuccessAction]({ dispatch, commit }, payload) {
    commit(tags, payload)
  },
  [fetchTagsFailAction]({ dispatch }) {},
  [updateArticleQueryAction]({ dispatch, commit, getters }, payload) {
    commit(articleQuery, { ...getters[articleQuery], ...payload })
  },
  // create article
  [createArticleAction]({ dispatch }, article: Article) {
    console.log('article', article)
    articleService
      .create(article)
      .then(response => {
        dispatch(createArticleSuccessAction, response.data.article)
      })
      .catch(error => {
        dispatch(createArticleFailAction)
      })
  },
  [createArticleSuccessAction]({ dispatch, commit }, payload) {},
  [createArticleFailAction]({ dispatch }) {}
}
