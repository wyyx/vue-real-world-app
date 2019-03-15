import { http } from './api.service'
import { Comment } from '@/models/comment.model'

export const CommentsService = {
  get(articleId: string) {
    if (typeof articleId !== 'string') {
      throw new Error('article id required to fetch comments')
    }
    return http.get(`articles/${articleId}/comments`)
  },

  post(articleId: string, comment: Comment) {
    return http.post(`articles/${articleId}/comments`, {
      comment: { body: comment }
    })
  },

  destroy(slug, commentId) {
    return http.delete(`articles/${slug}/comments/${commentId}`)
  }
}
