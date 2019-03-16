import { http } from './http.service'

export const favoriteService = {
  add(slug) {
    return http.post(`articles/${slug}/favorite`)
  },
  remove(slug) {
    return http.delete(`articles/${slug}/favorite`)
  }
}
