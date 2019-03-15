import { http } from './api.service'

export const tagService = {
  get() {
    return http.get('tags')
  }
}
