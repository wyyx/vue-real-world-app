import { http } from './http.service'
import { CommentsResponse } from '@/models/comment.model'

export const commentService = {
  getComments(articleId: string) {
    if (typeof articleId !== 'string') {
      throw new Error('article id required to fetch comments')
    }
    return http.get<CommentsResponse>(`articles/${articleId}/comments`)
  },
  post(slug: string, comment: string) {
    return http.post(`articles/${slug}/comments`, {
      comment: { body: comment }
    })
  },
  destroy(slug, commentId) {
    return http.delete(`articles/${slug}/comments/${commentId}`)
  }
}
