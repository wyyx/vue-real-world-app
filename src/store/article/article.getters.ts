import { FeedType, Article } from '@/models/article.model'
import { uniq } from 'lodash'
import {
  authors,
  userArticles,
  globalArticles,
  favoriteArticles
} from './article.paths'

export const articleGetters = {
  [authors](state, getters) {
    return function(feedType: FeedType) {
      switch (feedType) {
        case FeedType.User:
          return uniq(
            getters[userArticles].map((a: Article) => a.author.username)
          )
        case FeedType.Global:
          return uniq(
            getters[globalArticles].map((a: Article) => a.author.username)
          )
        case FeedType.Favorite:
          return uniq(
            getters[favoriteArticles].map((a: Article) => a.author.username)
          )
        default:
          break
      }
    }
  }
}
