import { Article } from '@/models/article.model'
import { http } from './http.service'

export const articleService = {
  query(type, params) {
    return http.get('articles' + (type === 'feed' ? '/feed' : ''), {
      params
    })
  },
  get(id: string) {
    return http.get(`articles/${id}`)
  },
  create(article: Article) {
    return http.post('articles', { article })
  },
  update(id, article: Article) {
    return http.patch(`articles/${id}`, { article })
  },
  destroy(id: string) {
    return http.delete(`articles/${id}`)
  }
}
