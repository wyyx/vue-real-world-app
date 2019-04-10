import { Article } from '@/models/article.model'
import { uniq } from 'lodash'
import { authors, articles } from './article.paths'

export const articleGetters = {
  [authors](state, getters) {
    const articleList: Article[] = getters[articles]
    return uniq(articleList.map(a => a.author.username))
    return []
  }
}
