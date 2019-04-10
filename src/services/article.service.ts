import {
  Article,
  ArticlesResponse,
  ArticleResponse
} from '@/models/article.model'
import { http } from './http.service'
import { ArticleQuery } from '@/models/article-query.model'

export const articleService = {
  configParams(params: ArticleQuery) {
    // append tags
    const searchParams = new URLSearchParams()
    params.tags.forEach(tag => searchParams.append('tag', tag))

    // append others
    const others = { ...params }
    delete others.tags
    for (const key in others) {
      if (others.hasOwnProperty(key)) {
        // append avaliable params exclude 0 (offset: 0)
        if (others[key] || others[key] === 0) {
          searchParams.append(key, others[key])
        }
      }
    }

    return searchParams
  },
  getGlobalArticles(params: ArticleQuery) {
    const searchParams = this.configParams(params)

    return http.get('articles', {
      params: searchParams
    })
  },
  getUserArticles(params) {
    return http.get<ArticlesResponse>('articles/feed', {
      params
    })
  },
  getMyArticles(params: { username: string }) {
    return http.get<ArticlesResponse>('articles', {
      params: {
        author: params.username
      }
    })
  },
  getFavoriteArticles(params: { username: string }) {
    return http.get('articles', {
      params: {
        favorited: params.username
      }
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
  },
  favoriteArticle(slug: string) {
    return http.post<ArticleResponse>(`articles/${slug}/favorite`)
  },
  unfavoriteArticle(slug: string) {
    return http.delete(`articles/${slug}/favorite`)
  }
}
