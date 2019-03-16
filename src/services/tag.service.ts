import { http } from './http.service'

export const tagService = {
  get() {
    return http.get('tags')
  }
}
