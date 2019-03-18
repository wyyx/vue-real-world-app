import { Article, ArticlesResponse } from '@/models/article.model'
import { http } from './http.service'
import { ArticleQuery } from '@/models/article-query.model'

export const articleService = {
  getGlobalArticles(params: ArticleQuery) {
    // append tags
    const searchParams = new URLSearchParams()
    params.tags.forEach(tag => searchParams.append('tag', tag))

    // append others
    const others = { ...params, tag: params.tags }
    delete others.tags
    for (const key in others) {
      if (others.hasOwnProperty(key)) {
        searchParams.append(key, others[key])
      }
    }

    return http.get('articles', {
      params: searchParams
    })
  },
  getUserArticles(params) {
    return http.get<ArticlesResponse>('articles/feed', {
      params
    })
  },
  getArticleById(id: string) {
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
