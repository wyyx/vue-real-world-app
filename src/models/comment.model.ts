import { Author } from './article.model'

export interface CommentsResponse {
  comments: Comment[]
}

export interface Comment {
  id: number
  createdAt: string
  updatedAt: string
  body: string
  author: Author
}
