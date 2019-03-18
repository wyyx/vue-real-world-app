import { http } from './http.service'
import { TagsResponse } from '@/models/tag.model'

export const tagService = {
  get() {
    return http.get<TagsResponse>('tags')
  }
}
