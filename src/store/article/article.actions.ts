import { articleService } from '@/services/article.service'
import { tagService } from '@/services/tag.service'
import { Article } from '@/models/article.model'
import {
  isLoading,
  articleQuery,
  tags,
  articles,
  articlesCount,
  isPending
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
// fetch my articles
export const fetchMyArticlesAction = 'fetchMyArticlesAction'
export const fetchMyArticlesSuccessAction = 'fetchMyArticlesSuccessAction'
export const fetchMyArticlesFailAction = 'fetchMyArticlesFailAction'
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
// update article
export const updateArticleAction = 'updateArticleAction'
export const updateArticleSuccessAction = 'updateArticleSuccessAction'
export const updateArticleFailAction = 'updateArticleFailAction'
// favorite article
export const favoriteArticleAction = 'favoriteArticleAction'
export const favoriteArticleASuccessction = 'favoriteArticleASuccessction'
export const unfavoriteArticleAction = 'unfavoriteArticleAction'
export const unfavoriteArticleSuccessAction = 'unfavoriteArticleSuccessAction'

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
  [fetchGlobalArticlesSuccessAction]({ dispatch, commit }, payload) {
    commit(articles, payload.articles)
    commit(articlesCount, payload.articlesCount)
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
  [fetchUserArticlesSuccessAction]({ dispatch, commit }, payload) {
    commit(articles, payload.articles)
    commit(articlesCount, payload.articlesCount)
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
  [fetchFavoriteArticlesSuccessAction]({ dispatch, commit }, payload) {
    commit(articles, payload.articles)
    commit(articlesCount, payload.articlesCount)
  },
  [fetchFavoriteArticlesFailAction]({ commit }) {},
  // fetch my articles
  [fetchMyArticlesAction]({ dispatch, commit }, params) {
    commit(isLoading, true)

    articleService
      .getMyArticles(params)
      .then(response => {
        dispatch(fetchMyArticlesSuccessAction, {
          articles: response.data.articles,
          articlesCount: response.data.articlesCount
        })
      })
      .catch(error => {
        dispatch(fetchMyArticlesFailAction)
      })
      .finally(() => commit(isLoading, false))
  },
  [fetchMyArticlesSuccessAction]({ dispatch, commit }, payload) {
    commit(articles, payload.articles)
    commit(articlesCount, payload.articlesCount)
  },
  [fetchMyArticlesFailAction]({ commit }) {},
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
  [createArticleAction]({ dispatch, commit }, article: Article) {
    commit(isPending, true)

    return new Promise((resolve, reject) => {
      articleService
        .create(article)
        .then(response => {
          dispatch(createArticleSuccessAction, response.data.article)
          resolve('success')
          commit(isPending, false)
        })
        .catch(error => {
          dispatch(createArticleFailAction)
          reject('fail')
        })
        .finally(() => commit(isPending, false))
    })
  },
  [createArticleSuccessAction]({ dispatch, commit }, payload) {},
  [createArticleFailAction]({ dispatch }) {},
  // update article
  [updateArticleAction]({ dispatch, commit }, article: Article) {
    commit(isPending, true)

    return new Promise((resolve, reject) => {
      articleService
        .update(article.slug, article)
        .then(response => {
          dispatch(updateArticleSuccessAction, response.data.article)
          resolve('success')
          commit(isPending, false)
        })
        .catch(error => {
          dispatch(updateArticleFailAction)
          reject('fail')
        })
        .finally(() => commit(isPending, false))
    })
  },
  [updateArticleSuccessAction]({ dispatch, commit }, payload) {},
  [updateArticleFailAction]({ dispatch }) {},
  // favorite article
  [favoriteArticleAction]({ dispatch }, slug: string) {
    articleService
      .favoriteArticle(slug)
      .then(response => {
        dispatch(favoriteArticleASuccessction, response.data.article)
      })
      .catch(error => {})
  },
  [favoriteArticleASuccessction]({ commit, getters }, article: Article) {
    const articleList: Article[] = getters[articles]
    const index = articleList.findIndex(a => a.slug === article.slug)

    if (index > -1) {
      // replacing with updated article
      articleList.splice(index, 1, article)
    }

    commit(articles, [...articleList])
  },
  // unfavorite article
  [unfavoriteArticleAction]({ dispatch }, slug: string) {
    articleService
      .unfavoriteArticle(slug)
      .then(response => {
        dispatch(unfavoriteArticleSuccessAction, response.data.article)
      })
      .catch(error => {})
  },
  [unfavoriteArticleSuccessAction]({ commit, getters }, article: Article) {
    const articleList: Article[] = getters[articles]
    const index = articleList.findIndex(a => a.slug === article.slug)

    if (index > -1) {
      // replacing with updated article
      articleList.splice(index, 1, article)
    }

    commit(articles, [...articleList])
  }
}
